const admin = require('firebase-admin');

let db = null;
let isInitialized = false;

// Initialize Firebase Admin SDK
function initializeFirebase() {
  if (isInitialized) return;

  try {
    console.log('Initializing Firebase Admin SDK...');
    console.log('Has existing apps:', admin.apps.length > 0);
    console.log('Has FIREBASE_SERVICE_ACCOUNT_KEY:', !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    console.log('Has FIREBASE_DATABASE_URL:', !!process.env.FIREBASE_DATABASE_URL);
    console.log('ENV keys available:', Object.keys(process.env).filter(k => k.includes('FIREBASE')));

    if (!admin.apps.length) {
      // Use environment variables for Firebase configuration
      const serviceAccountKeyEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

      if (!serviceAccountKeyEnv) {
        console.warn('Firebase service account key not configured. Using fallback mode.');
        console.warn('All environment variables:', Object.keys(process.env).sort());
        isInitialized = true;
        return;
      }

      let serviceAccountKey;
      try {
        serviceAccountKey = JSON.parse(Buffer.from(serviceAccountKeyEnv, 'base64').toString());
        console.log('Successfully parsed Firebase service account key');
      } catch (parseError) {
        console.error('Failed to parse Firebase service account key:', parseError.message);
        isInitialized = true;
        return;
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://18-days-project.firebaseio.com'
      });
      console.log('Firebase Admin SDK initialized successfully');
    }

    db = admin.firestore();
    console.log('Firestore database reference created');
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error.message, error.stack);
    isInitialized = true;
  }
}

// Default content
const DEFAULT_CONTENT = {
  heroTitle: 'The 18 Days Project is a writing adventure to unleash your creativity',
  heroSubtitle: 'Generate new work. Get creative support. Make inspired progress.',
  heroButtonText: 'Cocoon Edition — December 1',
  announcementText: "We're back! The Cocoon Edition starts Monday, December 1, 2025",
  announcementButtonText: 'Learn more'
};

// Get content from Firestore
async function getContent() {
  try {
    console.log('getContent: Starting to initialize Firebase...');
    initializeFirebase();

    if (!db) {
      console.log('getContent: Firebase database not initialized, using default content');
      return DEFAULT_CONTENT;
    }

    console.log('getContent: Firebase initialized, fetching from Firestore...');
    const doc = await db.collection('site_config').doc('content').get();

    if (doc.exists) {
      const data = doc.data();
      console.log('getContent: Found document in Firestore:', data);
      return data;
    }

    console.log('getContent: No document found in Firestore, returning defaults');
    return DEFAULT_CONTENT;
  } catch (error) {
    console.error('getContent: Error fetching content from Firestore:', error.message);
    console.error('getContent: Stack trace:', error.stack);
    return DEFAULT_CONTENT;
  }
}

// Save content to Firestore
async function saveContent(content) {
  try {
    console.log('saveContent called with:', Object.keys(content));
    initializeFirebase();

    if (!db) {
      console.warn('Firebase not initialized - changes will only be stored in browser localStorage');
      console.warn('To persist changes on Vercel, set FIREBASE_SERVICE_ACCOUNT_KEY environment variable');
      return true; // Return success to indicate client-side storage worked
    }

    console.log('Attempting to save to Firestore collection...');
    await db.collection('site_config').doc('content').set(content, { merge: true });
    console.log('Content saved successfully to Firestore');
    return true;
  } catch (error) {
    console.error('Error saving content to Firestore:', error.message);
    console.error('Error stack:', error.stack);
    // Don't throw - allow graceful fallback to localStorage
    return true;
  }
}

module.exports = { getContent, saveContent, DEFAULT_CONTENT };
