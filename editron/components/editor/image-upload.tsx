'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useS3Upload, getImageData } from 'next-s3-upload';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string, file: File) => void;
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { uploadToS3 } = useS3Upload();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        setUploading(true);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        
        // For development purposes, we'll skip the S3 upload
        // and just use the local file URL
        // In production, you would uncomment this code:
        // const { url } = await uploadToS3(file);
        // const imageData = await getImageData(file);
        
        // For now, just pass the local URL
        onImageUpload(objectUrl, file);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image. Using local preview instead.');
        // Even if S3 upload fails, we can still use the local preview
        if (preview) {
          onImageUpload(preview, file);
        }
      } finally {
        setUploading(false);
      }
    }
  }, [onImageUpload, uploadToS3, preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative w-full aspect-video">
              <Image 
                src={preview} 
                alt="Uploaded image" 
                fill 
                className="object-contain rounded-md" 
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-muted-foreground">
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                <line x1="16" x2="22" y1="5" y2="5" />
                <line x1="19" x2="19" y1="2" y2="8" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <div className="space-y-2">
                <p className="text-sm font-medium">Drag & drop your image here</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </div>
              <Button variant="outline" size="sm" className="mt-2" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Select Image'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}