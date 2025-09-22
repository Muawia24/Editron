'use client';

import { useState, useTransition, useRef, useMemo, useEffect } from 'react';
import { ImageUpload } from './image-upload';
import { ImageProcessor } from './image-processor';
import { ExamplePrompts } from './example-prompts';
import { ExampleImages } from './example-images';
import Image, { getImageProps } from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAdjustedDimensions } from '@/lib/get-adjusted-dimentions';


// Helper to slugify the prompt for filenames
function slugifyPrompt(prompt?: string): string {
  if (!prompt) return "image";
  // Take first 8 words, join with dashes, remove non-alphanum, limit to 40 chars
  const words = prompt.split(/\s+/).slice(0, 8);
  let slug = words.join("-").toLowerCase();
  slug = slug.replace(/[^a-z0-9\-]/g, "");
  if (slug.length > 40) slug = slug.slice(0, 40);
  return slug || "image";
}

export function Editor() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [images, setImages] = useState<{ url: string; version: number, prompt?: string }[]>([]);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [s3ImageUrl, setS3ImageUrl] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<
    | "black-forest-labs/FLUX.1-kontext-dev"
    | "black-forest-labs/FLUX.1-kontext-pro"
  >("black-forest-labs/FLUX.1-kontext-dev");
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const activeImage = useMemo(
    () => images.find((img) => img.url === activeImageUrl),
    [images, activeImageUrl ],
  );
 
  const adjustImageDimentions = getAdjustedDimensions(
    imageData.width,
    imageData.height,
  );

  useEffect(() => {
    function handleNewSession() {
      setImages([]);
      setActiveImageUrl(null);
    }
    window.addEventListener('new-image-session', handleNewSession);
    return () => {
      window.removeEventListener('new-image-session', handleNewSession);
    }
  }, [])

  async function handleDownload() {
    if (!activeImage) return;
    const imageProps = getImageProps({
      src: activeImage.url,
      alt: "Generated Image",
      height: imageData.height,
      width: imageData.width,
      quality: 100,
    });
    // Fetch the image
    const response = await fetch(imageProps.props.src);
    const blob = await response.blob();
    const extension = blob.type.includes("jpeg")
      ? "jpg"
      : blob.type.includes("png")
        ? "png"
        : blob.type.includes("webp")
          ? "webp"
          : "bin";
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const slug = slugifyPrompt(activeImage.prompt);
    link.download = `v${activeImage.version}-${slug}.${extension}`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  
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
              <ImageUpload onUpload={({ url, width, height }) => {
                setImageData({ width, height });
                setImages([{ url, version: 0 }]);
                setActiveImageUrl(url);

              }} />
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
            s3ImageUrl={s3ImageUrl} 
            onProcessingComplete={(resultImage) => {
              console.log('Processing complete:', resultImage);
            }} 
          />
        </div>
      </div>
    </div>
  );
}