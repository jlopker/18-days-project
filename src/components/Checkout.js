import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';
import SlidingScale from './SlidingScale';
import { ContentContext } from '../context/ContentContext';

function Checkout() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { content } = useContext(ContentContext);
  const [selectedPrice, setSelectedPrice] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    hearAbout: [],
    hearAboutOther: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => {
        const newHearAbout = checked
          ? [...prev.hearAbout, value]
          : prev.hearAbout.filter(item => item !== value);

        // If unchecking "Other", also clear the text
        if (!checked && value === 'Other') {
          return {
            ...prev,
            hearAbout: newHearAbout,
            hearAboutOther: ''
          };
        }

        return {
          ...prev,
          hearAbout: newHearAbout
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreatePaymentIntent = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email || !formData.firstName || !formData.lastName) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Call backend to create Stripe payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPrice,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to create payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage('Payment system not ready. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment successful - redirect to success page
        navigate('/payment-success', { state: { paymentIntent } });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1>Join the 18 Days Project</h1>
      </header>

      <main className="checkout-main">
        <div className="checkout-container">
          <div className="checkout-content">
            <section className="checkout-section info-section">
              <h2>What You're Getting</h2>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">📝</div>
                  <div className="info-text">
                    <h3>Daily Writing Prompts</h3>
                    <p>18 days of carefully crafted prompts delivered each morning</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">👥</div>
                  <div className="info-text">
                    <h3>Community Support</h3>
                    <p>Connect with other writers and support each other's journeys</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🎯</div>
                  <div className="info-text">
                    <h3>Accountability Partner</h3>
                    <p>Get paired with a writing partner for mutual support</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">✨</div>
                  <div className="info-text">
                    <h3>Flex Schedule</h3>
                    <p>Participate at your own pace - it's not homework</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="checkout-section pricing-section">
              <SlidingScale onPriceChange={handlePriceChange} />
            </section>

            <section className="checkout-section form-section">
              <h2>Your Information</h2>
              <form onSubmit={clientSecret ? handleConfirmPayment : handleCreatePaymentIntent}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">How did you hear about 18 Somethings? (check all that apply)</label>
                  <div className="checkbox-options">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="past-participant"
                        name="hearAbout"
                        value="I'm a past participant"
                        checked={formData.hearAbout.includes("I'm a past participant")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="past-participant">I'm a past participant</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="hearAbout"
                        value="Through the 18 Somethings newsletter"
                        checked={formData.hearAbout.includes("Through the 18 Somethings newsletter")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="newsletter">Through the 18 Somethings newsletter</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="janet-caroline"
                        name="hearAbout"
                        value="Through Janet and/or Caroline"
                        checked={formData.hearAbout.includes("Through Janet and/or Caroline")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="janet-caroline">Through Janet and/or Caroline</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="someone-personal"
                        name="hearAbout"
                        value="Through someone else I know personally"
                        checked={formData.hearAbout.includes("Through someone else I know personally")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="someone-personal">Through someone else I know personally</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="social-media"
                        name="hearAbout"
                        value="Twitter/Insta/other social"
                        checked={formData.hearAbout.includes("Twitter/Insta/other social")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="social-media">Twitter/Insta/other social</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="remember"
                        name="hearAbout"
                        value="I can't remember"
                        checked={formData.hearAbout.includes("I can't remember")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="remember">I can't remember</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="other"
                        name="hearAbout"
                        value="Other"
                        checked={formData.hearAbout.includes("Other")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="other">Other</label>
                    </div>
                    {formData.hearAbout.includes("Other") && (
                      <div className="other-input-container">
                        <input
                          type="text"
                          name="hearAboutOther"
                          value={formData.hearAboutOther}
                          onChange={handleInputChange}
                          placeholder="Please tell us how you heard about 18 Somethings"
                          className="other-text-input"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {clientSecret && (
                  <div className="form-group">
                    <label>Card Details *</label>
                    <div className="card-element-container">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}

                <button
                  type="submit"
                  className="checkout-button"
                  disabled={isProcessing || !stripe}
                >
                  {isProcessing ? 'Processing...' : clientSecret ? `Complete Payment $${selectedPrice}` : `Continue to Payment $${selectedPrice}`}
                </button>

                <p className="checkout-disclaimer">
                  Your payment information is securely processed by Stripe.
                </p>
              </form>
            </section>
          </div>

          <aside className="checkout-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>18 Days Project Edition</span>
                <span>${selectedPrice}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span className="total-price">${selectedPrice}</span>
              </div>
              <div className="summary-note">
                <p>You will receive a confirmation email with access details after payment.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
