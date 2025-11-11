import React from 'react';
import './Welcome.css';

function Welcome() {
  return (
    <section id="welcome" className="section welcome-section">
      <div className="section-container">
        <h2 className="section-title">Welcome</h2>
        <div className="welcome-content">
          <p className="lead-text">
            Creativity thrives within a container, especially a flexible one. For <strong>18 days,</strong> you'll write <strong>10 minutes per day</strong> on a prompt (we'll use imagery, sound, text) you'll receive each morning. In the email, you'll also find a brief missive on the creative process.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
