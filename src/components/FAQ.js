import React, { useState, useContext } from 'react';
import './FAQ.css';
import { ContentContext } from '../context/ContentContext';

function FAQ() {
  const { content } = useContext(ContentContext);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = content?.faqs || [];
  const faqTitle = content?.faqTitle || 'Frequently Asked Questions';

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="section-container">
        <h2 className="section-title">{faqTitle}</h2>
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
  );
}

export default FAQ;
