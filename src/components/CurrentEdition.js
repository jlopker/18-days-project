import React from 'react';
import './CurrentEdition.css';

function CurrentEdition({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
          <h2 className="modal-title">We're back!</h2>
          <div className="edition-details">
            <p className="edition-description">
              We will be running the <strong>Cocoon Edition</strong> starting <strong>Monday, December 1, 2025</strong>.{' '}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe-5tHCxkWQy1DagvYUqOBuvnqUlIq_UhPdj7z5hxJiSAe1HA/viewform" target="_blank" rel="noopener noreferrer" className="signup-link">
                Sign up here
              </a>
            </p>
            <p className="edition-description">
              The 18 Days Project brings writers together for an 18-day virtual writing adventure. Whether you're looking to overcome writer's block, find community, or simply dedicate time to your writing, we're here to support you.
            </p>
            <p className="substack-note">
              <strong>Want to stay in the loop for future editions?</strong> Sign up for our mailing list <a href="https://substack.com" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentEdition;
