import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleScrollToSection = (id) => {
    closeMobileMenu();
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
          <div className="nav-dropdown">
            <button className="nav-link dropdown-toggle">Learn More</button>
            <div className="dropdown-menu">
              <Link to="/resources" className="dropdown-link" onClick={closeMobileMenu}>Resources</Link>
              <Link to="/past-editions" className="dropdown-link" onClick={closeMobileMenu}>Past Editions</Link>
            </div>
          </div>
          <Link to="/#about" className="nav-link" onClick={closeMobileMenu}>About</Link>
          <button className="nav-link" onClick={() => handleScrollToSection('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>Contact</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
