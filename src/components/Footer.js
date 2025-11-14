import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (id) => {
    // If not on home page, navigate to home page first
    if (location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }

    // If already on home page, scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <li><Link to="/">Welcome</Link></li>
            <li><Link to="/writing-process">Writing Process</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/past-editions">Past Editions</Link></li>
            <li><button onClick={() => handleScrollToSection('faq')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', textDecoration: 'underline' }}>FAQs</button></li>
            <li><button onClick={() => handleScrollToSection('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', textDecoration: 'underline' }}>Contact</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://the18somethingsproject.substack.com/" aria-label="Substack" target="_blank" rel="noopener noreferrer">Substack</a></li>
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
