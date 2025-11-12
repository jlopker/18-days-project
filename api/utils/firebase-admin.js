const admin = require('firebase-admin');

let db = null;
let isInitialized = false;

// Initialize Firebase Admin SDK
function initializeFirebase() {
  if (isInitialized) return;

  try {
    if (!admin.apps.length) {
      // Use environment variables for Firebase configuration
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString())
        : null;

      if (!serviceAccountKey) {
        console.warn('Firebase service account key not configured. Using fallback mode.');
        isInitialized = true;
        return;
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://18-days-project.firebaseio.com'
      });
    }

    db = admin.firestore();
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
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
    initializeFirebase();

    if (!db) {
      console.log('Firebase not initialized, using default content');
      return DEFAULT_CONTENT;
    }

    const doc = await db.collection('site_config').doc('content').get();
    if (doc.exists) {
      return doc.data();
    }
    return DEFAULT_CONTENT;
  } catch (error) {
    console.error('Error fetching content from Firestore:', error);
    return DEFAULT_CONTENT;
  }
}

// Save content to Firestore
async function saveContent(content) {
  try {
    initializeFirebase();

    if (!db) {
      throw new Error('Firebase not initialized and no fallback storage available');
    }

    await db.collection('site_config').doc('content').set(content, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving content to Firestore:', error);
    throw error;
  }
}

module.exports = { getContent, saveContent, DEFAULT_CONTENT };
