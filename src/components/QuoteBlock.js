import React from 'react';
import './QuoteBlock.css';

function QuoteBlock() {
  return (
    <section className="section quote-block-section">
      <div className="section-container">
        <div className="quote-block-content">
          <blockquote className="quote-block-quote">
            <p>
              "I'm confident that I am more powerful than my inner critic. Just give me a prompt and a few paragraphs of warmup to get over the hump, and writing WILL happen, 100% of the time. That's pretty fucking exciting!"
            </p>
            <footer className="quote-block-author">
              — Peter Rubin
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default QuoteBlock;
