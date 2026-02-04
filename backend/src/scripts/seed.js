import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Task } from '../models/Task.js';

dotenv.config();

const seedData = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/primetrade-auth';
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Task.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create demo users
        const demoUser = await User.create({
            name: 'Demo User',
            email: 'demo@example.com',
            password: 'demo123',
        });

        const testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'test123',
        });

        console.log('👤 Created demo users');

        // Create demo tasks for demo user
        await Task.create([
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive README and API documentation',
                status: 'in-progress',
                priority: 'high',
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                user: demoUser._id,
            },
            {
                title: 'Review pull requests',
                description: 'Review and merge pending PRs from team members',
                status: 'todo',
                priority: 'medium',
                user: demoUser._id,
            },
            {
                title: 'Deploy to production',
                description: 'Deploy the application to production environment',
                status: 'todo',
                priority: 'high',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                user: demoUser._id,
            },
            {
                title: 'Fix responsive design issues',
                description: 'Address mobile layout issues on dashboard',
                status: 'completed',
                priority: 'medium',
                user: demoUser._id,
            },
        ]);

        console.log('✅ Created demo tasks');

        console.log('\n📝 Demo Credentials:');
        console.log('Email: demo@example.com');
        console.log('Password: demo123');
        console.log('\nEmail: test@example.com');
        console.log('Password: test123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();
