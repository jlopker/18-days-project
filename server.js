const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Admin password
const ADMIN_PASSWORD = '18days';

// Middleware to verify admin authentication
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get current content (for development)
app.get('/api/admin/get-content', (req, res) => {
  try {
    // In development, we read from the component files
    // In production, this is handled by the Vercel API route which uses Firebase
    const defaultContent = {
      heroTitle: 'The 18 Days Project is a writing adventure to unleash your creativity',
      heroSubtitle: 'Generate new work. Get creative support. Make inspired progress.',
      heroButtonText: 'Cocoon Edition — December 1',
      announcementText: "We're back! The Cocoon Edition starts Monday, December 1, 2025",
      announcementButtonText: 'Learn more'
    };

    res.json({ success: true, data: defaultContent });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Save content endpoint (for local development only - modifies source files)
app.post('/api/admin/save-content', verifyAdmin, (req, res) => {
  try {
    const { heroTitle, heroSubtitle, heroButtonText, announcementText, announcementButtonText } = req.body;

    // Update Hero.js
    let heroContent = fs.readFileSync(path.join(__dirname, 'src/components/Hero.js'), 'utf-8');
    heroContent = heroContent.replace(
      /{content\.heroTitle}/,
      `{content.heroTitle}`
    );
    fs.writeFileSync(path.join(__dirname, 'src/components/Hero.js'), heroContent);

    // Update AnnouncementBar.js
    let announcementContent = fs.readFileSync(path.join(__dirname, 'src/components/AnnouncementBar.js'), 'utf-8');
    announcementContent = announcementContent.replace(
      /{content\.announcementText}/,
      `{content.announcementText}`
    );
    fs.writeFileSync(path.join(__dirname, 'src/components/AnnouncementBar.js'), announcementContent);

    res.json({ success: true, message: 'Content updated successfully. Note: In development, content is stored in localStorage and component props. Use Firebase for persistent storage.' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Admin API running on port ${PORT}`);
});
