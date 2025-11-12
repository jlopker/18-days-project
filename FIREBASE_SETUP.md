# Firebase Setup for Persistent Admin Changes on Vercel

This guide explains how to set up Firebase Firestore as the persistent database backend for admin panel changes on Vercel.

## Overview

The admin panel now supports two modes:

1. **Local Development**: Changes are saved via the local Express server (`server.js`) and stored in browser localStorage
2. **Vercel Production**: Changes are saved to Firebase Firestore and persist across all deployments

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Create a new project (or use an existing one)

### 2. Enable Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Start in **Test Mode** (or configure security rules - see below)
4. Choose a region close to your users
5. Click **Enable**

### 3. Create Service Account Key

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Go to **Service Accounts** tab
3. Click **Generate New Private Key**
4. A JSON file will download - keep this safe and secret!

### 4. Prepare Environment Variable

1. Open the downloaded JSON file
2. Run this command to convert it to base64:
   ```bash
   cat /path/to/your/service-account-key.json | base64 | tr -d '\n'
   ```
3. Copy the output (the very long base64 string)

### 5. Set Up Vercel Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add two new environment variables:

   **Variable 1:**
   - Name: `FIREBASE_SERVICE_ACCOUNT_KEY`
   - Value: Paste the base64 string from step 4
   - Environments: **Production**

   **Variable 2:**
   - Name: `FIREBASE_DATABASE_URL`
   - Value: `https://your-project-id.firebaseio.com` (replace with your actual project ID)
   - Environments: **Production**

5. Click **Save**
6. Redeploy your app on Vercel for changes to take effect

### 6. Configure Firebase Security Rules (Recommended)

For test mode, anyone can read/write your database. Configure proper rules:

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /site_config/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null &&
                      request.headers['authorization'] == 'Bearer 18days';
    }
  }
}
```

⚠️ **Note:** This is a basic rule. For production, implement proper authentication instead of hardcoding passwords.

## Local Development

For local development, Firebase is optional:

1. Copy `.env.example` to `.env.local`
2. Leave `FIREBASE_SERVICE_ACCOUNT_KEY` and `FIREBASE_DATABASE_URL` empty or commented out
3. Run `npm start` (React) and `node server.js` (backend) in separate terminals
4. Admin changes will be saved to localStorage

## Testing the Setup

### On Vercel:

1. Go to your Vercel deployment: `https://your-domain.com/admin`
2. Log in with password `18days`
3. Edit any content field
4. Click "Save Changes to Live Site"
5. You should see: "✓ Changes saved to Firestore! They are now persistent on Vercel and will appear immediately."
6. Refresh the page - changes should persist!

### Locally:

1. Run `npm start` and `node server.js` in separate terminals
2. Go to `localhost:3000/admin`
3. Log in with password `18days`
4. Edit content and click "Save Changes to Live Site"
5. Changes are saved to the local Express server

## How It Works

### Component Architecture

```
App.js (wraps with ContentProvider)
  ├── ContentContext (fetches from /api/save-content on page load)
  ├── Hero (uses context for dynamic title, subtitle, button)
  ├── AnnouncementBar (uses context for dynamic announcement text)
  └── Admin (loads/saves content via API)
```

### Data Flow

**Reading Data:**
1. ContentProvider loads on app startup
2. Fetches from `/api/save-content` (GET)
3. On Vercel: Returns data from Firebase Firestore
4. Locally: Returns default content
5. Components subscribe to ContentContext and display dynamic content

**Writing Data:**
1. Admin panel receives password
2. Sends POST to `/api/save-content` with auth token
3. On Vercel: Saves to Firebase Firestore
4. Locally: Would modify component files (deprecated approach)
5. Changes persist in database

## Troubleshooting

### "Changes saved" but don't appear

- Make sure environment variables are set in Vercel
- Check Vercel logs: `vercel logs your-project`
- Verify Firebase Database URL is correct
- Check that Firestore has the data: Firebase Console → Firestore → site_config collection

### Firebase not initializing

- Verify the base64 string is correct (no extra spaces)
- Check that `FIREBASE_SERVICE_ACCOUNT_KEY` starts with `eyJ...`
- Verify `FIREBASE_DATABASE_URL` matches your Firebase project

### "Unauthorized" error

- Check that password is correct (default: `18days`)
- Verify Firebase security rules allow the request

### Need to Reset All Data?

In Firebase Console:
1. Go to **Firestore Database**
2. Select the `site_config` collection
3. Delete the `content` document
4. On next admin save, new defaults will be created

## Security Notes

⚠️ **Important for Production:**

1. **Don't hardcode passwords** - Use proper authentication
2. **Use environment variables** - Never commit credentials
3. **Enable security rules** - Don't use Test Mode in production
4. **Rotate service account keys** regularly
5. **Monitor Firebase usage** - Watch for unauthorized access

## More Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
