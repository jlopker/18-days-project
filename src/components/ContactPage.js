import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';

function ContactPage() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS (you'll need to set your service ID, template ID, and public key)
  React.useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          to_email: '18somethings@gmail.com',
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
        }
      );

      setSubmitStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <main className="contact-page">
      <section className="section contact-page-section">
        <div className="section-container">
          <h1 className="section-title">Staying in Touch</h1>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-box">
                <p>For questions related to this edition, please email <a href="mailto:18somethings@gmail.com" target="_blank" rel="noopener noreferrer" className="email-link">18somethings@gmail.com</a> or use the form below.</p>
              </div>
              <div className="info-box">
                <p>If you would like to hear about upcoming editions, make sure you're on our email newsletter — you can sign up <a href="https://the18somethingsproject.substack.com/" target="_blank" rel="noopener noreferrer">here</a> (now hosted on Substack, not Tiny Letter).</p>
              </div>
              <div className="info-box">
                <p>We only use this email list for announcements and reminders about new editions — no spam, we promise. If you're not sure if you're on our email list, just email <a href="mailto:18somethings@gmail.com" target="_blank" rel="noopener noreferrer" className="email-link">18somethings@gmail.com</a> and we'll let ya know.</p>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <h3>Send us a message</h3>
              <div className="form-group">
                <label htmlFor="from_name">Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="from_email">Email</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows="6"
                ></textarea>
              </div>
              <button type="submit" className="submit-button" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="form-message success">Message sent successfully! We'll get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="form-message error">Failed to send message. Please try again or email us directly.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
