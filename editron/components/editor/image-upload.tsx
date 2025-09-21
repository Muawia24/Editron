'use client';

import { useState, useCallback, useRef, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useS3Upload, getImageData } from 'next-s3-upload';
import { toast } from 'sonner';


export function ImageUpload({ 
  onUpload,
}:{
  onUpload: ({
    url,
    width,
    height,
  }: {
    url: string;
    width: number;
    height: number;
  }) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] =  useState<string | null>(null);
  const { uploadToS3 } = useS3Upload();

  const handleUpload = useCallback(
    async (file: File) => {
      setPreview(URL.createObjectURL(file));
      startTransition(async () => {
        const [result, data] = await Promise.all([
          uploadToS3(file),
          getImageData(file),
        ]);
        console.log(result.url);
        console.log(data);

      onUpload({
        url: result.url,
        width: data.width ?? 1024,
        height: data.height ?? 768,
      });
    })
  }, [onUpload, uploadToS3]);

   const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    onDropAccepted: (files) => {
      if (files[0]) handleUpload(files[0]);
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDrop: () => setIsDragging(false),
  });


  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}
        >
          <input {...getInputProps()} ref={fileInputRef} />
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
              <Button variant="outline" size="sm" className="mt-2" disabled={pending}>
                {pending ? 'Uploading...' : 'Select Image'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}