import React from 'react';
import { Scribble, PaperScrap, Leaf, Circle, Dot, Star } from './Decorations';
import './Decorations.css';

function SectionDivider() {
  // Randomly select a decoration type for variety
  const decorations = [
    <PaperScrap color="#C9BC46" fillColor="#C9BC46" />,
    <Scribble color="#988495" />,
    <Leaf color="#129E77" />,
    <Circle color="#C9BC46" size={50} />,
    <Star color="#C85364" />,
    <Dot color="#C9BC46" size={20} />,
  ];

  const randomDecoration = decorations[Math.floor(Math.random() * decorations.length)];

  return (
    <div className="section-divider">
      <div className="divider-decoration">
        {randomDecoration}
      </div>
    </div>
  );
}

export default SectionDivider;
