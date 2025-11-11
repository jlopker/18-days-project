import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
          <Link to="/#contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
