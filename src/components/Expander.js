import React, { useState } from 'react';
import './Expander.css';

function Expander({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`expander ${isOpen ? 'open' : ''}`}>
      <button
        className="expander-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="expander-title">{title}</span>
        <span className="expander-icon"></span>
      </button>
      {isOpen && <div className="expander-content">{children}</div>}
    </div>
  );
}

export default Expander;
