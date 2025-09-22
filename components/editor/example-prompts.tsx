'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExamplePrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'style' | 'background' | 'object' | 'color';
}

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    id: 'prompt-1',
    title: 'Change Background',
    prompt: 'Change the background to a beautiful beach sunset',
    category: 'background'
  },
  {
    id: 'prompt-2',
    title: 'Cartoon Style',
    prompt: 'Convert this image to a cartoon style',
    category: 'style'
  },
  {
    id: 'prompt-3',
    title: 'Add Object',
    prompt: 'Add a cute dog to the right side of the image',
    category: 'object'
  },
  {
    id: 'prompt-4',
    title: 'Change Colors',
    prompt: 'Make the colors more vibrant and saturated',
    category: 'color'
  },
  {
    id: 'prompt-5',
    title: 'Watercolor Style',
    prompt: 'Convert this image to a watercolor painting style',
    category: 'style'
  },
  {
    id: 'prompt-6',
    title: 'Mountain Background',
    prompt: 'Change the background to snow-capped mountains',
    category: 'background'
  },
];

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function ExamplePrompts({ onSelectPrompt }: ExamplePromptsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Prompts</CardTitle>
        <CardDescription>Select a prompt to get started quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXAMPLE_PROMPTS.map((example) => (
            <Button
              key={example.id}
              variant="outline"
              className="h-auto justify-start p-3 text-left"
              onClick={() => onSelectPrompt(example.prompt)}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-medium">{example.title}</span>
                <span className="text-xs text-muted-foreground truncate max-w-full">
                  {example.prompt}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}