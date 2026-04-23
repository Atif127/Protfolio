import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2] || 'admin@portfolio.com';
    const password = process.argv[3] || 'admin123';

    const exists = await User.findOne({ email });
    if (exists) {
      console.log(`Admin user already exists: ${email}`);
      process.exit(0);
    }

    await User.create({ email, password });
    console.log(`Admin user created successfully:`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log('\nYou can now log in at http://localhost:3000/login');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();

