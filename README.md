# Editron - AI Image Editor

Editron is an AI-powered image editing application that allows users to edit images using natural language prompts, similar to [EasyEdit.io](https://www.easyedit.io/).

## Features

- Image upload functionality
- Example images to get started quickly
- Predefined example prompts
- AI-powered image editing using Together AI
- Before/after comparison view

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Together AI API key for AI image processing

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Together AI API key and S3 configuration:

```
# Together AI Configuration
TOGETHER_API_KEY=your_together_api_key

# S3 Upload Configuration
S3_UPLOAD_KEY=your_access_key_id
S3_UPLOAD_SECRET=your_secret_access_key
S3_UPLOAD_BUCKET=your_bucket_name
S3_UPLOAD_REGION=your_region

# Optional configurations
S3_UPLOAD_ENDPOINT=
S3_UPLOAD_USE_ACCELERATE_ENDPOINT=false
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
- Together AI for image processing
- react-dropzone for file uploads
- next-s3-upload for S3 image storage

## Future Enhancements

- Enhance Together AI integration with more advanced image processing capabilities
- Add more example images and prompts
- Add image download functionality
- Add history of edits
- Implement user authentication
