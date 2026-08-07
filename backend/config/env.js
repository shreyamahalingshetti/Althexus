import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};

if (!env.MONGODB_URI) {
  console.error('CRITICAL ERROR: MONGODB_URI environment variable is missing.');
}
if (!env.JWT_SECRET) {
  console.error('CRITICAL ERROR: JWT_SECRET environment variable is missing.');
}
