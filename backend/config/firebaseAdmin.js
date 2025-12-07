/**
 * Firebase Admin SDK Configuration
 * 
 * Initializes Firebase Admin for server-side operations
 * Used for verifying Firebase ID tokens from phone authentication
 * 
 * IMPORTANT: You need to download your service account key from Firebase Console
 * 1. Go to Firebase Console -> Project Settings -> Service Accounts
 * 2. Click "Generate New Private Key"
 * 3. Save the JSON file as 'serviceAccountKey.json' in the config folder
 * 4. Add serviceAccountKey.json to .gitignore to keep it secure
 */

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let firebaseApp;

try {
  // Try to load service account key from file
  const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  // Initialize Firebase Admin
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'autismart-fe54c'
  });

  console.log('✓ Firebase Admin initialized successfully');
} catch (error) {
  // Fallback: Try to initialize from environment variables
  console.warn('⚠ Could not load serviceAccountKey.json, trying environment variables...');
  
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE || 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID || 'autismart-fe54c',
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
      token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    };

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'autismart-fe54c'
    });

    console.log('✓ Firebase Admin initialized from environment variables');
  } catch (envError) {
    console.error('✗ Firebase Admin initialization failed:', envError.message);
    console.error('Please ensure you have either:');
    console.error('1. serviceAccountKey.json in the config folder, OR');
    console.error('2. Firebase credentials in environment variables');
  }
}

// Export Firebase Admin Auth
export const firebaseAuth = firebaseApp ? admin.auth() : null;
export default firebaseApp;
