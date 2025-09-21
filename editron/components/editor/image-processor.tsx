'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateImage } from '@/lib/actions';

interface ImageProcessorProps {
  sourceImage: string | null;
  s3ImageUrl: string | null;
  onProcessingComplete?: (resultImage: string) => void;
}

export function ImageProcessor({ sourceImage, s3ImageUrl, onProcessingComplete }: ImageProcessorProps) {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  
  // Process image using Gemini API
  const processImage = async () => {
    if (!s3ImageUrl || !prompt) return;
    
    setIsProcessing(true);
    
    try {
      // In a real implementation, we would use the Gemini API here
      // with the s3ImageUrl and prompt
      console.log('Processing image with URL:', s3ImageUrl);
      console.log('Using prompt:', prompt);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // For now, just return the source image as a placeholder
        setResultImage(sourceImage);
        setIsProcessing(false);
        
        if (onProcessingComplete) {
          onProcessingComplete(sourceImage || '');
        }
      }, 2000);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Describe the edit you want to make..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isProcessing}
            />
            <Button 
              onClick={processImage} 
              disabled={!sourceImage || !prompt || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Edit Image'}
            </Button>
          </div>
          
          {sourceImage && resultImage && (
            <Tabs defaultValue="before" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="before">Before</TabsTrigger>
                <TabsTrigger value="after">After</TabsTrigger>
              </TabsList>
              <TabsContent value="before" className="mt-4">
                <div className="relative w-full aspect-video">
                  <Image 
                    src={sourceImage} 
                    alt="Original image" 
                    fill 
                    className="object-contain rounded-md" 
                  />
                </div>
              </TabsContent>
              <TabsContent value="after" className="mt-4">
                <div className="relative w-full aspect-video">
                  <Image 
                    src={resultImage} 
                    alt="Edited image" 
                    fill 
                    className="object-contain rounded-md" 
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  );
}