import React, { useState } from 'react';
import './AnnouncementBar.css';

function AnnouncementBar({ onOpenModal }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span className="announcement-icon">📢</span>
        <div className="announcement-text">
          <strong>We're back!</strong> The Cocoon Edition starts Monday, December 1, 2025.{' '}
          <button className="announcement-link" onClick={onOpenModal}>
            Learn more
          </button>
        </div>
        <button className="announcement-close" onClick={handleClose} aria-label="Close announcement">
          ✕
        </button>
      </div>
    </div>
  );
}

export default AnnouncementBar;
