
/**
 * Seed Script for Standardized Screening Assessment (Based on AQ-10)
 * Adds a new 'screening' level assessment
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Assessment from '../models/Assessment.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const screeningAssessment = {
    level: 'screening',
    title: 'Standardized Autism Screening (AQ-10)',
    description: 'Official AQ-10 (Autism Spectrum Quotient) based screening for early detection. Answer based on observation.',
    questions: [
        {
            id: 'aq10_q1',
            category: 'Social Interaction',
            question: 'Does the child notice small sounds when others do not?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [1, 1, 0, 0] // 1 indicates autism trait
        },
        {
            id: 'aq10_q2',
            category: 'Attention to Detail',
            question: 'Does the child focus more on the whole picture rather than small details?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [0, 0, 1, 1] // Reverse scoring: Disagreement indicates trait
        },
        {
            id: 'aq10_q3',
            category: 'Attention Switching',
            question: 'Is it easy for the child to do more than one thing at once?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [0, 0, 1, 1]
        },
        {
            id: 'aq10_q4',
            category: 'Communication',
            question: 'If there is an interruption, can the child switch back to what they were doing quickly?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [0, 0, 1, 1]
        },
        {
            id: 'aq10_q5',
            category: 'Social Interaction',
            question: 'Does the child find it easy to "read between the lines" when someone is talking?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [0, 0, 1, 1]
        },
        {
            id: 'aq10_q6',
            category: 'Social Interaction',
            question: 'Does the child know how to tell if someone listening to them is getting bored?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [0, 0, 1, 1]
        },
        {
            id: 'aq10_q7',
            category: 'Communication',
            question: 'Does the child find it difficult to understand characters\' intentions in stories?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [1, 1, 0, 0]
        },
        {
            id: 'aq10_q8',
            category: 'Imagination',
            question: 'Does the child enjoy collecting information about categories of things (e.g., types of cars, birds)?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [1, 1, 0, 0]
        },
        {
            id: 'aq10_q9',
            category: 'Social Interaction',
            question: 'Does the child find it easy to work out what someone is thinking or feeling just by looking at their face?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [0, 0, 1, 1]
        },
        {
            id: 'aq10_q10',
            category: 'Communication',
            question: 'Does the child find it difficult to work out people\'s intentions?',
            options: ['Definitely Agreed', 'Slightly Agreed', 'Slightly Disagreed', 'Definitely Disagreed'],
            scores: [1, 1, 0, 0]
        }
    ],
    isActive: true
};

async function seedScreening() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Find admin user
        const adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            console.log('❌ No admin user found. Run create-admin first.');
            process.exit(1);
        }

        // Check if screening already exists
        const existing = await Assessment.findOne({ level: 'screening' });
        if (existing) {
            console.log('⚠️  Screening assessment already exists. Updating...');
            await Assessment.updateOne({ level: 'screening' }, { ...screeningAssessment, updatedBy: adminUser._id });
            console.log('✅ Updated existing screening assessment.');
        } else {
            console.log('📝 Creating new screening assessment...');
            await Assessment.create({
                ...screeningAssessment,
                createdBy: adminUser._id,
                updatedBy: adminUser._id
            });
            console.log('✅ Created new screening assessment.');
        }

        console.log('✨ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding screening:', error);
        process.exit(1);
    }
}

seedScreening();
