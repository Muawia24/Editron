# Editron - AI Image Editor

Editron is an AI-powered image editing application that allows users to edit images using natural language prompts, similar to [EasyEdit.io](https://www.easyedit.io/).

## Features

- Image upload functionality
- Example images to get started quickly
- Predefined example prompts
- AI-powered image editing using Gemini
- Before/after comparison view

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Gemini API key for AI image processing

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:

```
GEMINI_API_KEY=your-api-key-here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages
- `/components` - React components
  - `/components/editor` - Image editor components
  - `/components/ui` - UI components from shadcn/ui
- `/lib` - Utility functions and configuration
- `/public` - Static assets
  - `/public/examples` - Example images

## Adding Example Images

Replace the placeholder files in `/public/examples/` with actual images named:
- landscape.jpg
- portrait.jpg
- city.jpg
- food.jpg

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS 4
- shadcn/ui components
- AI SDK with Gemini integration
- react-dropzone for file uploads

## Future Enhancements

- Implement actual Gemini API integration for image processing
- Add more example images and prompts
- Add image download functionality
- Add history of edits
- Implement user authentication
