import React from 'react';
import './Testimonial.css';
import { Scribble, Circle, Dot, Star, Leaf, Swoosh, PaperScrap, Underline } from './Decorations';

function Testimonial() {
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
        <div className="testimonial-card">
          <p className="testimonial-quote">
            I started my first original novel as part of an 18 Somethings edition, typing my responses to the prompts while camping on the edge of the crater of Crater Lake. The novel, which became <em>Crater Lake Caravan</em>, touches on many of the themes the project brought out for me. I've had the pleasure of making friends and helping others make friends through 18 Somethings. Writing is such a solitary, lonely pursuit most of the time, so projects like this was build intentional and thoughtful communities are vital to all of our spiritual health.
          </p>
          <p className="testimonial-author">—Jessica Dickinson Goodman</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
