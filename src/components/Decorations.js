import React from 'react';

export const Scribble = ({ className = '', color = '#C85364' }) => (
  <svg
    className={`scribble ${className}`}
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 40 Q30 35, 40 38 T60 45 T80 35 Q90 32, 95 42"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M25 65 Q35 60, 45 65 T70 70 T95 65"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M30 85 Q40 82, 50 88 T75 90 Q85 92, 95 85"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

export const PaperScrap = ({ className = '', color = '#C85364', fillColor = '#ECD3F5' }) => (
  <svg
    className={`paper-scrap ${className}`}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20 L85 15 L90 75 L20 85 Z"
      fill={fillColor}
      stroke={color}
      strokeWidth="1.5"
      opacity="0.6"
    />
    <path
      d="M15 25 Q50 20, 80 22"
      stroke={color}
      strokeWidth="1"
      opacity="0.4"
      strokeDasharray="2,2"
    />
  </svg>
);

export const Circle = ({ className = '', color = '#C9BC46', size = 80 }) => (
  <svg
    className={`circle-decoration ${className}`}
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="35" stroke={color} strokeWidth="2" opacity="0.4" />
  </svg>
);

export const Dot = ({ className = '', color = '#129E77', size = 12 }) => (
  <svg
    className={`dot-decoration ${className}`}
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5" fill={color} opacity="0.5" />
  </svg>
);

export const Underline = ({ className = '', color = '#C85364' }) => (
  <svg
    className={`underline ${className}`}
    width="200"
    height="20"
    viewBox="0 0 200 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 15 Q50 12, 90 15 T190 15"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const Leaf = ({ className = '', color = '#988495' }) => (
  <svg
    className={`leaf-decoration ${className}`}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 10 Q40 25, 35 45 Q30 50, 25 45 Q20 25, 30 10 Z"
      fill={color}
      opacity="0.5"
    />
    <path
      d="M30 15 Q35 30, 32 42"
      stroke={color}
      strokeWidth="1"
      opacity="0.4"
      strokeLinecap="round"
    />
  </svg>
);

export const Star = ({ className = '', color = '#C9BC46' }) => (
  <svg
    className={`star-decoration ${className}`}
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 5 L31 20 L47 20 L35 30 L40 45 L25 35 L10 45 L15 30 L3 20 L19 20 Z"
      fill={color}
      opacity="0.5"
    />
  </svg>
);

export const Swoosh = ({ className = '', color = '#988495' }) => (
  <svg
    className={`swoosh ${className}`}
    width="150"
    height="60"
    viewBox="0 0 150 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 30 Q50 10, 90 20 T150 35"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);
