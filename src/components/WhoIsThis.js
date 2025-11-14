import React from 'react';
import './WhoIsThis.css';

function WhoIsThis() {
  return (
    <section className="section who-is-this-section">
      <div className="section-container">
        <h2 className="section-title">What Is This?</h2>
        <div className="who-is-this-content">
          <p>
            In 10 minutes a day, over the course of months or years, a person can accomplish a lot. 10 minutes a day can help overcome resistance and (re)build a writing muscle.
          </p>
          <div className="paragraph-spacing"></div>
          <p>
            You do not have to already be or call yourself a writer to participate in this (though writers are definitely welcome)! We've seen people use the space to explore their creative process, make huge progress on novels and memoirs, start a new essay or series of poems, or find the time to journal consistently. The experience is what you make of it. Our goal is to provide encouragement, structure, and support for you to be writing consistently.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhoIsThis;
