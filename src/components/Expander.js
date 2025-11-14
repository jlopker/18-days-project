import React, { useState } from 'react';
import './Expander.css';

function Expander({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expander">
      <button
        className="expander-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="expander-title">{title}</span>
        <span className="expander-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="expander-content">{children}</div>}
    </div>
  );
}

export default Expander;
