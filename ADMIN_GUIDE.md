# Admin Panel Guide

## Access the Admin Panel

1. Go to `/admin` on your website
2. Login with password: `18days`
3. You can set your own custom password on first login

## Editing Content in Real-Time

The admin panel allows you to edit the following content:

### Hero Section
- **Hero Title**: Main heading on the home page
- **Hero Subtitle**: Subheading below the title
- **Hero Button Text**: Text on the main CTA button

### Announcement Bar
- **Announcement Text**: Text shown in the top announcement bar
- **Announcement Button Text**: Text on the announcement bar button

## Saving Changes to the Live Site

### Option 1: Frontend-Only (Browser Storage - Current)
- Changes are saved to your browser's local storage
- Only visible on your local copy
- Perfect for testing and preview

### Option 2: Full Backend Integration (Recommended for Production)

To save changes permanently to the actual website files:

#### Setup

1. Install Express.js:
```bash
npm install express
```

2. Run the admin backend server:
```bash
node server.js
```

The API will be available at `http://localhost:3001/api/admin/save-content`

3. In the Admin Panel, click "Save Changes to Live Site"
4. Changes will be written directly to the component files
5. Commit and push the changes to GitHub to deploy them

#### How It Works

The backend server:
- Accepts POST requests to `/api/admin/save-content`
- Verifies the admin password via Bearer token
- Updates the React component files directly
- Changes are immediately reflected on the live site

#### Security

- The admin password is required for all changes
- Changes are logged in git for version control
- All modifications go through GitHub/Vercel deployment

## Password Management

- Default password: `18days`
- First login creates a custom password
- Password is stored in browser local storage
- To reset: Clear browser localStorage or use browser DevTools

## Making Changes Permanent

After editing content in the admin panel:

1. Click "Save Changes to Live Site"
2. Changes are written to component files
3. Run: `git add . && git commit -m "Update site content via admin panel"`
4. Run: `git push origin main`
5. Vercel automatically deploys the changes

## Resetting to Defaults

Click "Reset to Default" to restore original content for all fields.

## Notes

- Changes are auto-saved to browser as you type
- Page refresh may be needed to see updates
- Backend API is optional - works without it
- For production use, secure the admin password
