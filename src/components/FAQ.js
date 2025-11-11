import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Can I invite friends?",
      answer: "Absolutely. Please feel free to forward this note, or direct them to our website where they can learn more. You're also welcome to recruit a friend to be your accountability partner and share your writings with each other as you go — just make sure they (and you) fill out the Google form to be officially signed up and receive the daily emails"
    },
    {
      question: "Can I sign up midway through?",
      answer: "Nope! Sign-ups will close Friday night, November 28 at 11:11pm PT. Managing the email list is a lot of work so we don't take sign-ups midway through."
    },
    {
      question: "Will you offer another edition again? Now's not a good time for me.",
      answer: "Probably in 2026—stay tuned! We usually offer one edition per year, and the best way to know about it is by adding yourself to our Substack. We only email with new edition information."
    },
    {
      question: "When will you send the daily prompts?",
      answer: "We will send them at 3am PT / 6am ET each morning. We hope that's early enough for you! If not, you could also shift your process by one day so that you can do the previous day's at whatever time you need."
    },
    {
      question: "I need to be offline for part of this edition. Should I still participate?",
      answer: "If you want to! You're welcome to join and do as much as you can or modify when you do it to work for you. It's not school, this is not homework, and there is no grade. If this offering would be useful to you, we'd love to have you, and you can be as disciplined or loose with your participation as serves you. The only thing is that if you end up pairing with a partner, please let them know when you'll be offline so they don't think you dropped off."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="section-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
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
