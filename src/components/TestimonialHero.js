import React from 'react';
import './TestimonialHero.css';

function TestimonialHero() {
  return (
    <section className="section testimonial-hero-section">
      <div className="section-container">
        <div className="testimonial-hero-content">
          <blockquote className="testimonial-hero-quote">
            <p>
              "Writing is such a solitary, lonely pursuit most of the time, so projects like this that build intentional and thoughtful communities are vital to all of our spiritual health."
            </p>
            <footer className="testimonial-hero-author">
              — Jessica Dickinson Goodman
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default TestimonialHero;
