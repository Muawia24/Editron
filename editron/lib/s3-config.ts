import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.S3_UPLOAD_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY || '',
    secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
  },
  endpoint: process.env.S3_UPLOAD_ENDPOINT,
  useAccelerateEndpoint: process.env.S3_UPLOAD_USE_ACCELERATE_ENDPOINT === 'true',
});

export { s3Client };