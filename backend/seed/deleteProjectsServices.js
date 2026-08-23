import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Check if projects collection exists and drop it
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (collectionNames.includes('projects')) {
      await db.dropCollection('projects');
      console.log('Dropped projects collection');
    } else {
      console.log('projects collection does not exist');
    }
    
    if (collectionNames.includes('services')) {
      await db.dropCollection('services');
      console.log('Dropped services collection');
    } else {
      console.log('services collection does not exist');
    }
    
    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
