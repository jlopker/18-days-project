import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>The 18 Days Project</h3>
          <p>A virtual writing adventure by Caroline & Janet</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#welcome">Welcome</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://substack.com" aria-label="Substack" target="_blank" rel="noopener noreferrer">Substack</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} The 18 Days Project. A portion of proceeds supports social justice organizations.</p>
      </div>
    </footer>
  );
}

export default Footer;
