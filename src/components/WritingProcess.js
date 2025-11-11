import React from 'react';
import './WritingProcess.css';

function WritingProcess() {
  return (
    <section id="writing-process" className="section writing-process-section">
      <div className="section-container">
        <h2 className="section-title">Writing Process</h2>
        <div className="writing-process-content">
          <p>
            The 18 Days Project is built around a simple but powerful structure designed to foster creativity and build consistent writing habits.
          </p>

          <div className="process-steps">
            <div className="process-step">
              <h3>Daily Prompts</h3>
              <p>Each morning at 3am PT / 6am ET, you'll receive a prompt via email. The prompts use imagery, sound, and text to spark your imagination and guide your writing.</p>
            </div>

            <div className="process-step">
              <h3>10 Minutes of Writing</h3>
              <p>Set a timer and write for 10 minutes in response to the prompt. There's no pressure to be perfect—just let your thoughts flow onto the page.</p>
            </div>

            <div className="process-step">
              <h3>Creative Reflection</h3>
              <p>Along with each prompt, you'll receive a brief missive on the creative process from creators Caroline and Janet. These reflections deepen your understanding of your own creative practice.</p>
            </div>

            <div className="process-step">
              <h3>Build Your Practice</h3>
              <p>Over 18 consecutive days, the daily practice compounds. You'll overcome resistance, discover new ideas, and develop confidence in your voice as a writer.</p>
            </div>
          </div>

          <div className="process-insight">
            <h3>Why 18 Days?</h3>
            <p>
              18 days is a powerful container for creative work. It's long enough to build momentum and establish real habits, but short enough to feel achievable. In just over two weeks, you can generate substantial new work, overcome creative blocks, and rediscover your writing voice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WritingProcess;
