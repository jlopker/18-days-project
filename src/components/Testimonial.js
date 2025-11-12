import React, { useState } from 'react';
import './Testimonial.css';
import { Scribble, Circle, Dot, Star, Leaf, Swoosh, PaperScrap, Underline } from './Decorations';

function Testimonial() {
  const testimonials = [
    {
      quote: "I'm confident that I am more powerful than my inner critic. Just give me a prompt and a few paragraphs of warmup to get over the hump, and writing WILL happen, 100% of the time. That's pretty fucking exciting!",
      author: "Peter Rubin",
      bgColor: "#ECD3F5"
    },
    {
      quote: "Writing is such a solitary, lonely pursuit most of the time, so projects like this that build intentional and thoughtful communities are vital to all of our spiritual health.",
      author: "Jessica Dickinson Goodman",
      bgColor: "#C9D8E8"
    },
    {
      quote: "I underestimated how confidence-building the positive-only feedback would be. I don't get to write much, and that aspect really encouraged me to stretch the bounds of what I was comfortable doing.",
      author: "Ethan Carlson",
      bgColor: "#D4E8D4"
    },
    {
      quote: "It was great to be held accountable to the program and my partner. This was an excellent crash-course on making writing a habit.",
      author: "Sara Olson",
      bgColor: "#F5E5D4"
    }
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.querySelector('.testimonials-scroll-container');
    const card = document.querySelector('.testimonial-card');
    if (container && card) {
      const cardWidth = card.offsetWidth;
      const gap = 16; // 2rem = 32px, but gap is between cards so we need to account for it
      const scrollAmount = cardWidth + gap;
      const newPosition = direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="section testimonial-section">
      {/* Decorative elements */}
      <div className="testimonial-decoration testimonial-scribble-1">
        <Scribble color="#C85364" />
      </div>
      <div className="testimonial-decoration testimonial-circle-1">
        <Circle color="#C9BC46" size={50} />
      </div>
      <div className="testimonial-decoration testimonial-dot-1">
        <Dot color="#129E77" size={16} />
      </div>
      <div className="testimonial-decoration testimonial-star-1">
        <Star color="#988495" />
      </div>
      <div className="testimonial-decoration testimonial-leaf-1">
        <Leaf color="#988495" />
      </div>
      <div className="testimonial-decoration testimonial-swoosh-1">
        <Swoosh color="#C85364" />
      </div>
      <div className="testimonial-decoration testimonial-scrap-1">
        <PaperScrap color="#C9BC46" fillColor="#C9BC46" />
      </div>
      <div className="testimonial-decoration testimonial-dot-2">
        <Dot color="#C85364" size={14} />
      </div>
      <div className="testimonial-decoration testimonial-circle-2">
        <Circle color="#129E77" size={45} />
      </div>
      <div className="testimonial-decoration testimonial-underline-1">
        <Underline color="#988495" />
      </div>
      <div className="testimonial-decoration testimonial-scribble-2">
        <Scribble color="#129E77" />
      </div>

      <div className="testimonial-container">
        <div className="testimonials-carousel-wrapper">
          <button
            className="carousel-arrow left-arrow"
            onClick={() => scroll('left')}
            aria-label="Scroll testimonials left"
          >
            ←
          </button>

          <div className="testimonials-scroll-container">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" style={{ backgroundColor: testimonial.bgColor }}>
                <p className="testimonial-quote">
                  "{testimonial.quote}"
                </p>
                <p className="testimonial-author">—{testimonial.author}</p>
              </div>
            ))}
          </div>

          <button
            className="carousel-arrow right-arrow"
            onClick={() => scroll('right')}
            aria-label="Scroll testimonials right"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
