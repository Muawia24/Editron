'use client';

import { useState } from 'react';
import { ImageUpload } from './image-upload';
import { ImageProcessor } from './image-processor';
import { ExamplePrompts } from './example-prompts';
import { ExampleImages } from './example-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Editor() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  
  const handleImageUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setSourceImage(objectUrl);
  };
  
  const handleExampleImageSelect = (imageSrc: string) => {
    setSourceImage(imageSrc);
  };
  
  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="examples">Example Images</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-4">
              <ImageUpload onImageUpload={handleImageUpload} />
            </TabsContent>
            <TabsContent value="examples" className="mt-4">
              <ExampleImages onSelectImage={handleExampleImageSelect} />
            </TabsContent>
          </Tabs>
          
          <ExamplePrompts onSelectPrompt={handlePromptSelect} />
        </div>
        
        <div>
          <ImageProcessor 
            sourceImage={sourceImage} 
            onProcessingComplete={(resultImage) => {
              console.log('Processing complete:', resultImage);
            }} 
          />
        </div>
      </div>
    </div>
  );
}