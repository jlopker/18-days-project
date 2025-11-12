import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [editableContent, setEditableContent] = useState({
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
  });

  // Load saved content on mount
  useEffect(() => {
    const loadContent = async () => {
      // Try to load from API first (Firebase on production, file system in development)
      try {
        const isDevelopment = window.location.hostname === 'localhost';
        const apiUrl = isDevelopment
          ? 'http://localhost:3001/api/admin/get-content'
          : '/api/save-content';

        const response = await fetch(apiUrl);
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setEditableContent(result.data);
          }
        }
      } catch (error) {
        console.log('Failed to load from API, checking localStorage...');
      }

      // Fall back to localStorage if available
      const savedContent = localStorage.getItem('18daysAdminContent');
      if (savedContent) {
        setEditableContent(JSON.parse(savedContent));
      }
    };

    loadContent();

    // Load password from localStorage
    const savedPassword = localStorage.getItem('18daysAdminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === password || passwordInput === '18days') {
      setIsAuthenticated(true);
      if (!password) {
        localStorage.setItem('18daysAdminPassword', passwordInput);
        setPassword(passwordInput);
      }
      setPasswordInput('');
    } else {
      alert('Incorrect password');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleContentChange = (field, value) => {
    const updatedContent = { ...editableContent, [field]: value };
    setEditableContent(updatedContent);
    localStorage.setItem('18daysAdminContent', JSON.stringify(updatedContent));
  };

  const handleSaveToSite = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Determine API endpoint based on environment
      const isDevelopment = window.location.hostname === 'localhost';
      const apiUrl = isDevelopment
        ? 'http://localhost:3001/api/admin/save-content'
        : '/api/save-content';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(editableContent)
      });

      if (response.ok) {
        await response.json();

        // Refresh content globally so other pages see the updates
        if (typeof window !== 'undefined' && window.__refreshContent) {
          console.log('Admin: Triggering global content refresh...');
          await window.__refreshContent();
          console.log('Admin: Content refreshed');
        }

        if (isDevelopment) {
          setSaveMessage('✓ Changes saved to the live site! They will be visible after a page refresh.');
        } else {
          setSaveMessage('✓ Changes saved to Firestore! They are now persistent on Vercel and will appear immediately.');
        }
        setTimeout(() => setSaveMessage(''), 5000);
      } else if (response.status === 401) {
        setSaveMessage('✗ Unauthorized. Invalid password.');
      } else {
        setSaveMessage('✗ Error saving changes. Please try again.');
      }
    } catch (error) {
      const isDevelopment = window.location.hostname === 'localhost';
      if (isDevelopment) {
        setSaveMessage('✗ Backend server not running. Please run "node server.js" in another terminal on port 3001.');
      } else {
        setSaveMessage('✗ Connection error. Changes are saved to your browser only.');
      }
    }

    setIsSaving(false);
  };

  const handleFAQChange = (index, field, value) => {
    const updatedFAQs = [...editableContent.faqs];
    updatedFAQs[index] = { ...updatedFAQs[index], [field]: value };
    const updatedContent = { ...editableContent, faqs: updatedFAQs };
    setEditableContent(updatedContent);
    localStorage.setItem('18daysAdminContent', JSON.stringify(updatedContent));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes to default values?')) {
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
      setEditableContent(defaultContent);
      localStorage.setItem('18daysAdminContent', JSON.stringify(defaultContent));
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="admin-section">
        <div className="admin-container">
          <div className="admin-login">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="admin-content">
          <div className="admin-section-group">
            <h2>Hero Section</h2>
            
            <div className="admin-field">
              <label>Hero Title</label>
              <textarea
                value={editableContent.heroTitle}
                onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                rows={3}
              />
              <small>This is the main heading on the home page</small>
            </div>

            <div className="admin-field">
              <label>Hero Subtitle</label>
              <textarea
                value={editableContent.heroSubtitle}
                onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
                rows={2}
              />
              <small>Subheading below the title</small>
            </div>

            <div className="admin-field">
              <label>Hero Button Text</label>
              <input
                type="text"
                value={editableContent.heroButtonText}
                onChange={(e) => handleContentChange('heroButtonText', e.target.value)}
              />
              <small>Text on the main CTA button</small>
            </div>
          </div>

          <div className="admin-section-group">
            <h2>Announcement Bar</h2>

            <div className="admin-field">
              <label>Announcement Text</label>
              <textarea
                value={editableContent.announcementText}
                onChange={(e) => handleContentChange('announcementText', e.target.value)}
                rows={2}
              />
              <small>Text shown in the top announcement bar</small>
            </div>

            <div className="admin-field">
              <label>Announcement Button Text</label>
              <input
                type="text"
                value={editableContent.announcementButtonText}
                onChange={(e) => handleContentChange('announcementButtonText', e.target.value)}
              />
              <small>Text on the announcement bar button</small>
            </div>
          </div>

          <div className="admin-section-group">
            <h2>FAQ Section</h2>

            <div className="admin-field">
              <label>FAQ Section Title</label>
              <input
                type="text"
                value={editableContent.faqTitle}
                onChange={(e) => handleContentChange('faqTitle', e.target.value)}
              />
              <small>Main heading for the FAQ section</small>
            </div>

            <div className="admin-field">
              <label>FAQ Items</label>
              <small>Edit each FAQ question and answer below:</small>
              <div className="faq-items-editor">
                {editableContent.faqs && editableContent.faqs.map((faq, index) => (
                  <div key={index} className="faq-item-editor">
                    <div className="admin-field">
                      <label>Question {index + 1}</label>
                      <textarea
                        value={faq.question}
                        onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="admin-field">
                      <label>Answer {index + 1}</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-actions">
            <button onClick={handleSaveToSite} className="save-site-btn" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes to Live Site'}
            </button>
            <button onClick={handleReset} className="reset-btn">Reset to Default</button>
          </div>

          {saveMessage && (
            <div className={`admin-message ${saveMessage.includes('✓') ? 'success' : 'error'}`}>
              {saveMessage}
            </div>
          )}

          <div className="admin-info">
            <p><strong>Note:</strong> Changes are automatically saved to your browser as you type.</p>
            {window.location.hostname === 'localhost' ? (
              <p>Click "Save Changes to Live Site" to deploy them to the actual website. Changes will require a page refresh to appear. (Local development mode)</p>
            ) : (
              <p><em>On Vercel:</em> Click "Save Changes to Live Site" to persist your changes to Firestore database. Changes will be permanent and visible across all users and deployments.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
