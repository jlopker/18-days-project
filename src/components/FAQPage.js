import React, { useState, useContext } from 'react';
import './FAQPage.css';
import { ContentContext } from '../context/ContentContext';

function FAQPage() {
  const { content } = useContext(ContentContext);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = content?.faqs || [];
  const faqTitle = content?.faqTitle || 'Frequently Asked Questions';

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="faq-page">
      <section className="section faq-page-section">
        <div className="section-container">
          <h1 className="section-title">{faqTitle}</h1>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">+</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQPage;
