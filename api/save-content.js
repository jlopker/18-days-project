const { getContent, saveContent } = require('./utils/firebase-admin');

export default async function handler(req, res) {
  // Handle GET requests - retrieve current content
  if (req.method === 'GET') {
    try {
      const content = await getContent();
      return res.status(200).json({
        success: true,
        data: content
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      return res.status(200).json({
        success: true,
        data: { /* default content will be returned by getContent on error */ },
        warning: 'Using default content - Firebase may not be configured'
      });
    }
  }

  // Handle POST requests - save content
  if (req.method === 'POST') {
    // Verify admin authentication
    const token = req.headers.authorization?.split(' ')[1];
    if (token !== '18days') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { heroTitle, heroSubtitle, heroButtonText, announcementText, announcementButtonText } = req.body;

      if (!heroTitle || !heroSubtitle || !heroButtonText || !announcementText || !announcementButtonText) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const content = {
        heroTitle,
        heroSubtitle,
        heroButtonText,
        announcementText,
        announcementButtonText,
        updatedAt: new Date().toISOString()
      };

      await saveContent(content);

      return res.status(200).json({
        success: true,
        message: 'Changes saved successfully!',
        data: content
      });
    } catch (error) {
      console.error('Error saving content:', error);
      return res.status(500).json({
        error: 'Failed to save content',
        details: error.message,
        note: 'Make sure FIREBASE_SERVICE_ACCOUNT_KEY environment variable is set on Vercel'
      });
    }
  }

  // Other methods not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
