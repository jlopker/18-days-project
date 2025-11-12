import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentSuccess.css';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentIntent = location.state?.paymentIntent;

  return (
    <div className="payment-success-page">
      <header className="success-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </header>

      <main className="success-main">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h1>Payment Successful!</h1>
            <p className="success-message">
              Thank you for joining the 18 Days Project! Your payment has been processed successfully.
            </p>

            <div className="payment-details">
              <h2>Order Details</h2>
              {paymentIntent && (
                <div className="details-box">
                  <div className="detail-item">
                    <span className="label">Payment ID:</span>
                    <span className="value">{paymentIntent.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Amount:</span>
                    <span className="value">${(paymentIntent.amount / 100).toFixed(2)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className="value status-succeeded">{paymentIntent.status}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="next-steps">
              <h2>What's Next?</h2>
              <ol>
                <li>Check your email for a confirmation and access details</li>
                <li>Visit your account to see your dashboard and content</li>
                <li>Join our community and meet other writers</li>
                <li>Start writing! Your 18-day adventure begins now</li>
              </ol>
            </div>

            <div className="contact-section">
              <p>
                Have questions? Email us at{' '}
                <a href="mailto:18somethings@gmail.com" className="email-link">
                  18somethings@gmail.com
                </a>
              </p>
            </div>

            <button className="home-button" onClick={() => navigate('/')}>
              Return to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaymentSuccess;
