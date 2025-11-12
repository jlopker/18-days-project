import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };
  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);

  const handleScrollToSection = (id) => {
    closeMobileMenu();

    // If not on home page, navigate to home page first
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
      return;
    }

    // If already on home page, scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-section" onClick={closeMobileMenu}>
          <h1 className="site-title">The 18 Days Project</h1>
          <p className="site-tagline">A virtual writing adventure</p>
        </Link>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navigation ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>Welcome</Link>
          <Link to="/writing-process" className="nav-link" onClick={closeMobileMenu}>Writing Process</Link>
          <button className="nav-link" onClick={() => handleScrollToSection('faq')} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>FAQs</button>
          <button className="nav-link" onClick={() => handleScrollToSection('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>Contact</button>
          <div className={`nav-dropdown ${mobileDropdownOpen ? 'open' : ''}`}>
            <button className="nav-link dropdown-toggle" onClick={toggleMobileDropdown}>Learn More</button>
            <div className="dropdown-menu">
              <Link to="/resources" className="dropdown-link" onClick={closeMobileMenu}>Resources</Link>
              <Link to="/past-editions" className="dropdown-link" onClick={closeMobileMenu}>Past Editions</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
