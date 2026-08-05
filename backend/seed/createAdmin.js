import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const email = env.SEED_ADMIN_EMAIL;
    const password = env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('ERROR: SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be defined in the environment.');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`Admin account with email "${email}" already exists.`);
      process.exit(0);
    }

    // Create new admin document
    const admin = new Admin({
      email,
      password, // Handled automatically by Admin model pre-save hook
    });

    await admin.save();
    console.log(`Admin account with email "${email}" created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
