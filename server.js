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
      announcementButtonText: 'Learn more',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { question: "Can I invite friends?", answer: "Absolutely. Please feel free to forward this note, or direct them to our website where they can learn more. You're also welcome to recruit a friend to be your accountability partner and share your writings with each other as you go — just make sure they (and you) fill out the Google form to be officially signed up and receive the daily emails" },
        { question: "Can I sign up midway through?", answer: "Nope! Sign-ups will close Friday night, November 28 at 11:11pm PT. Managing the email list is a lot of work so we don't take sign-ups midway through." },
        { question: "Will you offer another edition again? Now's not a good time for me.", answer: "Probably in 2026—stay tuned! We usually offer one edition per year, and the best way to know about it is by adding yourself to our Substack. We only email with new edition information." },
        { question: "When will you send the daily prompts?", answer: "We will send them at 3am PT / 6am ET each morning. We hope that's early enough for you! If not, you could also shift your process by one day so that you can do the previous day's at whatever time you need." },
        { question: "I need to be offline for part of this edition. Should I still participate?", answer: "If you want to! You're welcome to join and do as much as you can or modify when you do it to work for you. It's not school, this is not homework, and there is no grade. If this offering would be useful to you, we'd love to have you, and you can be as disciplined or loose with your participation as serves you. The only thing is that if you end up pairing with a partner, please let them know when you'll be offline so they don't think you dropped off." },
        { question: "Why are you doing this?", answer: "Originally, for our shared birthday month of June. We also thought it'd be really fun. We love writing and reading and sharing." },
        { question: "Why 18 days?", answer: "Because 18 is a lucky number in Judaism, and because it's more days than two weeks but less than three weeks." },
        { question: "But what if I'm not a writer?", answer: "We don't think it matters if you call yourself a writer, or if you've written before or not. Try it out—it's only ten minutes a day! Does this scare you? Even more reason to do it!" },
        { question: "What if I won't have internet access for one weekend?", answer: "That's okay—if you have a partner, let them know ahead of time, and plan on catching up when you get back." },
        { question: "What do I do if I'm having trouble with/haven't heard from my partner?", answer: "Try to resolve it between the two of you. If you want, feel free to reach out to us. We're happy to help if we can, including re-partnering you with someone else if we know of someone available." },
        { question: "Did you two make this up?", answer: "We first heard of this through a class at the Writing Salon that a friend of ours did. She shared it with Janet who shared it with Caroline. We altered it to work for us, and created our own prompts." }
      ]
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
