import React from 'react';
import { Link } from 'react-router-dom';
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
              <Link to="/checkout" className="signup-link" onClick={onClose}>
                Sign up here
              </Link>
            </p>
            <p className="edition-description">
              The 18 Days Project brings writers together for an 18-day virtual writing adventure. Whether you're looking to overcome writer's block, find community, or simply dedicate time to your writing, we're here to support you.
            </p>
            <p className="substack-note">
              <strong>Want to stay in the loop for future editions?</strong> Sign up for our mailing list <a href="https://the18somethingsproject.substack.com/" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentEdition;
