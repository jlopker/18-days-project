import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <main className="contact-page">
      <section className="section contact-page-section">
        <div className="section-container">
          <h1 className="section-title">Staying in Touch</h1>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-box">
                <p>For questions related to this edition, please email <a href="mailto:18somethings@gmail.com" target="_blank" rel="noopener noreferrer" className="email-link">18somethings@gmail.com</a>.</p>
              </div>
              <div className="info-box">
                <p>If you would like to hear about upcoming editions, make sure you're on our email newsletter — you can sign up <a href="https://the18somethingsproject.substack.com/" target="_blank" rel="noopener noreferrer">here</a> (now hosted on Substack, not Tiny Letter).</p>
              </div>
              <div className="info-box">
                <p>We only use this email list for announcements and reminders about new editions — no spam, we promise. If you're not sure if you're on our email list, just email <a href="mailto:18somethings@gmail.com" target="_blank" rel="noopener noreferrer" className="email-link">18somethings@gmail.com</a> and we'll let ya know.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
