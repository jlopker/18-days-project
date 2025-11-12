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
      return res.status(500).json({ error: 'Failed to fetch content' });
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
        message: 'Changes saved to Firestore database and will persist on Vercel!',
        data: content
      });
    } catch (error) {
      console.error('Error saving content:', error);
      return res.status(500).json({ error: 'Failed to save content' });
    }
  }

  // Other methods not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
