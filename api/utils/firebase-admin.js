const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // Use environment variables for Firebase configuration
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString())
    : null;

  if (!serviceAccountKey) {
    console.warn('Firebase service account key not configured. Using default emulator/development mode.');
  }

  if (serviceAccountKey) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://18-days-project.firebaseio.com'
    });
  }
}

const db = admin.firestore();

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
    if (!db) return DEFAULT_CONTENT;

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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    await db.collection('site_config').doc('content').set(content, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving content to Firestore:', error);
    throw error;
  }
}

module.exports = { getContent, saveContent, DEFAULT_CONTENT };
