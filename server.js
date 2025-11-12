const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

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

// Save content endpoint
app.post('/api/admin/save-content', verifyAdmin, (req, res) => {
  try {
    const { heroTitle, heroSubtitle, heroButtonText, announcementText, announcementButtonText } = req.body;

    // Update Hero.js
    let heroContent = fs.readFileSync(path.join(__dirname, 'src/components/Hero.js'), 'utf-8');
    heroContent = heroContent.replace(
      /<h2 className="hero-title">.*?<\/h2>/s,
      `<h2 className="hero-title">${heroTitle}</h2>`
    );
    heroContent = heroContent.replace(
      /<p className="hero-subtitle">.*?<\/p>/s,
      `<p className="hero-subtitle">${heroSubtitle}</p>`
    );
    heroContent = heroContent.replace(
      />Cocoon Edition — December 1</,
      `>${heroButtonText}<`
    );
    fs.writeFileSync(path.join(__dirname, 'src/components/Hero.js'), heroContent);

    // Update AnnouncementBar.js
    let announcementContent = fs.readFileSync(path.join(__dirname, 'src/components/AnnouncementBar.js'), 'utf-8');
    announcementContent = announcementContent.replace(
      /"We're back!.*?Cocoon Edition starts.*?2025"/,
      `"${announcementText}"`
    );
    announcementContent = announcementContent.replace(
      />Learn more</,
      `>${announcementButtonText}<`
    );
    fs.writeFileSync(path.join(__dirname, 'src/components/AnnouncementBar.js'), announcementContent);

    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Admin API running on port ${PORT}`);
});
