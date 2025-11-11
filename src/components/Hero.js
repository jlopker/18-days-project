import React from 'react';
import './Hero.css';
import { Scribble, PaperScrap, Circle, Leaf, Star, Dot, Swoosh, Underline } from './Decorations';
import './Decorations.css';

function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      {/* Top decorative elements */}
      <div className="hero-decoration hero-scribble-1">
        <Scribble color="#C85364" />
      </div>
      <div className="hero-decoration hero-scrap-1">
        <PaperScrap color="#C9BC46" fillColor="#C9BC46" />
      </div>
      <div className="hero-decoration hero-leaf-1">
        <Leaf color="#988495" />
      </div>
      <div className="hero-decoration hero-circle-1">
        <Circle color="#C9BC46" size={60} />
      </div>

      {/* Side dots and additional elements */}
      <div className="hero-decoration hero-dot-1">
        <Dot color="#129E77" size={18} />
      </div>
      <div className="hero-decoration hero-dot-2">
        <Dot color="#C9BC46" size={14} />
      </div>
      <div className="hero-decoration hero-dot-3">
        <Dot color="#C85364" size={16} />
      </div>
      <div className="hero-decoration hero-circle-2">
        <Circle color="#988495" size={70} />
      </div>
      <div className="hero-decoration hero-underline-1">
        <Underline color="#129E77" />
      </div>

      {/* Main content */}
      <div className="hero-content">
        <h2 className="hero-title">The 18 Days Project is a writing adventure to unleash your creativity</h2>
        <p className="hero-subtitle">Generate new work. Get creative support. Make inspired progress.</p>
        <button className="hero-cta-button" onClick={onOpenModal}>
          Join the Cocoon Edition
        </button>
      </div>

      {/* Bottom decorative elements */}
      <div className="hero-decoration hero-scribble-2">
        <Scribble color="#988495" />
      </div>
      <div className="hero-decoration hero-star-1">
        <Star color="#C9BC46" />
      </div>
      <div className="hero-decoration hero-swoosh-1">
        <Swoosh color="#129E77" />
      </div>
    </section>
  );
}

export default Hero;
