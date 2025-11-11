import React from 'react';
import './WritingProcess.css';

function WritingProcess() {
  return (
    <section id="writing-process" className="section writing-process-section">
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <div className="writing-process-content">
          <p>
            The 18 Days Project runs for 18 days with participants committing to 10 minutes of daily writing based on received prompts. Prompts arrive each morning at 3am PT / 6am ET via email and incorporate various stimulus types: imagery, sound, and text.
          </p>

          <p>
            Alongside prompts, participants receive brief reflections on the creative process. There's no prior writing experience required; participants can customize their engagement level. Writers can partner with accountability partners to share progress.
          </p>

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
