const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== '18days') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { heroTitle, heroSubtitle, heroButtonText, announcementText, announcementButtonText } = req.body;

    // On Vercel, we can't modify the source files (read-only filesystem)
    // Instead, return a message that changes are saved in localStorage
    // In production, you would use a database like Firebase or MongoDB
    return res.status(200).json({
      success: true,
      message: 'Changes saved to browser localStorage. Note: On Vercel, changes are stored locally in your browser and will reset on page refresh. To persist changes permanently, they would need to be stored in a database. For now, changes made via the admin panel are saved to your browser storage only.'
    });
  } catch (error) {
    console.error('Error saving content:', error);
    return res.status(500).json({ error: 'Failed to save content' });
  }
}
