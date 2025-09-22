'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExampleImage {
  id: string;
  title: string;
  src: string;
  alt: string;
}

const EXAMPLE_IMAGES: ExampleImage[] = [
  {
    id: 'image-1',
    title: 'Mountain Landscape',
    src: '/examples/landscape.jpg',
    alt: 'Mountain landscape'
  },
  {
    id: 'image-2',
    title: 'Portrait',
    src: '/examples/portrait.jpg',
    alt: 'Portrait photo'
  },
  {
    id: 'image-3',
    title: 'City Street',
    src: '/examples/city.jpg',
    alt: 'City street'
  },
  {
    id: 'image-4',
    title: 'Food',
    src: '/examples/food.jpg',
    alt: 'Food photo'
  },
];

interface ExampleImagesProps {
  onSelectImage: (imageSrc: string) => void;
}

export function ExampleImages({ onSelectImage }: ExampleImagesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Images</CardTitle>
        <CardDescription>Select an image to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EXAMPLE_IMAGES.map((image) => (
            <div 
              key={image.id} 
              className="relative aspect-square overflow-hidden rounded-md cursor-pointer border hover:border-primary transition-colors"
              onClick={() => onSelectImage(image.src)}
            >
              <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent z-10">
                <span className="text-xs font-medium text-white">{image.title}</span>
              </div>
              <div className="relative w-full h-full">
                {/* Note: These images don't exist yet, we'll need to add them */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <span className="text-xs text-muted-foreground">Image placeholder</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}