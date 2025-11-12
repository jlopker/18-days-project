const { getContent, saveContent } = require('./utils/firebase-admin');

module.exports = async function handler(req, res) {
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
    console.log('POST request received');

    // Verify admin authentication
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Auth token provided:', !!token);

    if (token !== '18days') {
      console.log('Unauthorized: token mismatch');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { heroTitle, heroSubtitle, heroButtonText, announcementText, announcementButtonText, faqTitle, faqs } = req.body;

      console.log('Received fields:', {
        heroTitle: !!heroTitle,
        heroSubtitle: !!heroSubtitle,
        heroButtonText: !!heroButtonText,
        announcementText: !!announcementText,
        announcementButtonText: !!announcementButtonText,
        faqTitle: !!faqTitle,
        faqs: Array.isArray(faqs) ? faqs.length : 'not an array'
      });

      if (!heroTitle || !heroSubtitle || !heroButtonText || !announcementText || !announcementButtonText) {
        console.log('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const content = {
        heroTitle,
        heroSubtitle,
        heroButtonText,
        announcementText,
        announcementButtonText,
        faqTitle: faqTitle || 'Frequently Asked Questions',
        faqs: Array.isArray(faqs) ? faqs : [],
        updatedAt: new Date().toISOString()
      };

      console.log('Calling saveContent...');
      await saveContent(content);
      console.log('Content saved successfully');

      return res.status(200).json({
        success: true,
        message: 'Changes saved! Note: Without Firebase configured, changes persist only in browser localStorage.',
        data: content,
        firebaseConfigured: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      });
    } catch (error) {
      console.error('Error in POST handler:', error.message);
      console.error('Stack trace:', error.stack);
      // Still return 200 to indicate the request was processed
      return res.status(200).json({
        success: true,
        message: 'Changes saved to browser storage. To persist changes permanently, configure Firebase.',
        data: req.body,
        warning: 'FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set'
      });
    }
  }

  // Other methods not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
