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
    console.log('FIREBASE_DATABASE_URL value:', process.env.FIREBASE_DATABASE_URL);
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
        console.log('Service account project_id:', serviceAccountKey.project_id);
      } catch (parseError) {
        console.error('Failed to parse Firebase service account key:', parseError.message);
        isInitialized = true;
        return;
      }

      // Firestore uses the project_id from the service account key
      // We don't need databaseURL for Firestore
      console.log('Initializing Firebase Admin SDK with credential only (Firestore)');

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey)
      });

      console.log('✓ Firebase Admin SDK initialized successfully');
      console.log('Project ID:', serviceAccountKey.project_id);
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
  announcementButtonText: 'Learn more',
  faqTitle: 'Frequently Asked Questions',
  faqs: [
    {
      question: "Can I invite friends?",
      answer: "Absolutely. Please feel free to forward this note, or direct them to our website where they can learn more. You're also welcome to recruit a friend to be your accountability partner and share your writings with each other as you go — just make sure they (and you) fill out the Google form to be officially signed up and receive the daily emails"
    },
    {
      question: "Can I sign up midway through?",
      answer: "Nope! Sign-ups will close Friday night, November 28 at 11:11pm PT. Managing the email list is a lot of work so we don't take sign-ups midway through."
    },
    {
      question: "Will you offer another edition again? Now's not a good time for me.",
      answer: "Probably in 2026—stay tuned! We usually offer one edition per year, and the best way to know about it is by adding yourself to our Substack. We only email with new edition information."
    },
    {
      question: "When will you send the daily prompts?",
      answer: "We will send them at 3am PT / 6am ET each morning. We hope that's early enough for you! If not, you could also shift your process by one day so that you can do the previous day's at whatever time you need."
    },
    {
      question: "I need to be offline for part of this edition. Should I still participate?",
      answer: "If you want to! You're welcome to join and do as much as you can or modify when you do it to work for you. It's not school, this is not homework, and there is no grade. If this offering would be useful to you, we'd love to have you, and you can be as disciplined or loose with your participation as serves you. The only thing is that if you end up pairing with a partner, please let them know when you'll be offline so they don't think you dropped off."
    },
    {
      question: "Why are you doing this?",
      answer: "Originally, for our shared birthday month of June. We also thought it'd be really fun. We love writing and reading and sharing."
    },
    {
      question: "Why 18 days?",
      answer: "Because 18 is a lucky number in Judaism, and because it's more days than two weeks but less than three weeks."
    },
    {
      question: "But what if I'm not a writer?",
      answer: "We don't think it matters if you call yourself a writer, or if you've written before or not. Try it out—it's only ten minutes a day! Does this scare you? Even more reason to do it!"
    },
    {
      question: "What if I won't have internet access for one weekend?",
      answer: "That's okay—if you have a partner, let them know ahead of time, and plan on catching up when you get back."
    },
    {
      question: "What do I do if I'm having trouble with/haven't heard from my partner?",
      answer: "Try to resolve it between the two of you. If you want, feel free to reach out to us. We're happy to help if we can, including re-partnering you with someone else if we know of someone available."
    },
    {
      question: "Did you two make this up?",
      answer: "We first heard of this through a class at the Writing Salon that a friend of ours did. She shared it with Janet who shared it with Caroline. We altered it to work for us, and created our own prompts."
    }
  ]
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

    console.log('Database initialized, attempting to save to Firestore...');
    console.log('Collection: site_config, Document: content');
    console.log('Content keys:', Object.keys(content));

    await db.collection('site_config').doc('content').set(content, { merge: true });
    console.log('✓ Content saved successfully to Firestore');
    return true;
  } catch (error) {
    console.error('✗ Error saving content to Firestore:', error.message);
    console.error('Error code:', error.code);
    console.error('Error details:', error.details);

    // Check if it's a NOT_FOUND error
    if (error.code === 5 || error.message.includes('NOT_FOUND')) {
      console.error('Database not found. Try:');
      console.error('1. Check Firebase Console that Firestore database exists');
      console.error('2. Verify FIREBASE_DATABASE_URL is correct');
      console.error('3. Make sure Firestore API is enabled');
    }

    // Don't throw - allow graceful fallback to localStorage
    console.log('Falling back to localStorage. Changes saved locally.');
    return true;
  }
}

module.exports = { getContent, saveContent, DEFAULT_CONTENT };
