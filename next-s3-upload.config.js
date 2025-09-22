/** @type {import('next-s3-upload').S3Config} */
module.exports = {
  // Optional: Define a custom key for the uploaded file
  key(req, filename) {
    return `uploads/${Date.now()}-${filename}`;
  },
};