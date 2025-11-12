import React, { useState, useContext } from 'react';
import './AnnouncementBar.css';
import { ContentContext } from '../context/ContentContext';

function AnnouncementBar({ onOpenModal }) {
  const [isVisible, setIsVisible] = useState(true);
  const { content } = useContext(ContentContext);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span className="announcement-icon">📢</span>
        <div className="announcement-text">
          {content.announcementText}{' '}
          <button className="announcement-link" onClick={onOpenModal}>
            {content.announcementButtonText}
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
