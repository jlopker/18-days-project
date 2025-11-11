import React from 'react';
import './WritingProcess.css';

function WritingProcess() {
  return (
    <section id="writing-process" className="section writing-process-section">
      <div className="section-container">
        <h2 className="section-title">The Process</h2>
        <div className="writing-process-content">
          <div className="process-section">
            <h3>Key Suggestions for Writing</h3>
            <p>
              Maintain continuous writing for ten minutes without stopping. Use a timer and repeat the prompt as a starting point if you get stuck. Following Natalie Goldberg's free-writing approach, avoid crossing out or editing during creation.
            </p>
            <p>
              Act on your first instinct rather than overthinking. Go with your first instinct—it's best to do the prompt as soon as you see it.
            </p>
          </div>

          <div className="process-section">
            <h3>Approach & Adaptation</h3>
            <p>
              You may modify prompts by changing pronouns, tense, or deviating entirely. Specificity is encouraged, and your writings need not develop into finished pieces. We suggest reviewing your work months later when perspective shifts.
            </p>
          </div>

          <div className="process-section">
            <h3>Consistency & Organization</h3>
            <p>
              Attempt daily participation, catching up with extra responses if needed. You may organize your responses in separate files or consolidated documents—whatever works best for you.
            </p>
          </div>

          <div className="process-section">
            <h3>Partnership Option</h3>
            <p>
              For accountability, you may write with a partner. Partners exchange feedback using only positive comments. Partners receive each other's responses without prior review of theirs. Feedback should remain specific, honest, and avoid personal advice about content.
            </p>
          </div>

          <div className="process-insight">
            <h3>Why It Works</h3>
            <p>
              In 10 minutes a day, over the course of months or years, a person can accomplish a lot. 10 minutes a day can help overcome resistance and (re)build a writing muscle. Writers have completed novels, started memoirs and essay collections, maintained consistent journaling, and built creative communities across distances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WritingProcess;
