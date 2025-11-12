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
    announcementButtonText: 'Learn more'
  });

  // Load saved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('18daysAdminContent');
    if (savedContent) {
      setEditableContent(JSON.parse(savedContent));
    }
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
      const response = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(editableContent)
      });

      if (response.ok) {
        setSaveMessage('✓ Changes saved to the live site! They will be visible after a page refresh.');
        setTimeout(() => setSaveMessage(''), 4000);
      } else if (response.status === 401) {
        setSaveMessage('✗ Unauthorized. Invalid password.');
      } else {
        setSaveMessage('✗ Error saving changes. Please try again.');
      }
    } catch (error) {
      setSaveMessage('✗ Unable to connect to server. Make sure the backend is running.');
    }

    setIsSaving(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes to default values?')) {
      const defaultContent = {
        heroTitle: 'The 18 Days Project is a writing adventure to unleash your creativity',
        heroSubtitle: 'Generate new work. Get creative support. Make inspired progress.',
        heroButtonText: 'Cocoon Edition — December 1',
        announcementText: "We're back! The Cocoon Edition starts Monday, December 1, 2025",
        announcementButtonText: 'Learn more'
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
            <p><strong>Note:</strong> Changes are automatically saved to your browser as you type. Click "Save Changes to Live Site" to deploy them to the actual website. Changes will require a page refresh to appear.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
