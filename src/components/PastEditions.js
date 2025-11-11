import React from 'react';
import './PastEditions.css';

function PastEditions() {
  const editions = [
    {
      name: 'Shelter In Place Edition',
      date: 'April 2020',
      participants: '320 participants from around the country and world',
      description: '18-day writing challenge with daily prompts and letters from creators Janet and Caroline',
      prompts: ['what was wasted', 'You trust the', 'Dear you']
    },
    {
      name: 'December Edition',
      date: 'December 2013',
      participants: '106 participants representing 36 cities and 5 countries (79 new participants)',
      description: '',
      prompts: ['I wear it as', 'censor', 'binary']
    },
    {
      name: 'June Edition',
      date: 'June 2014',
      participants: '74 participants with concentration in Bay Area, international participants from Canada, Philippines, and Vietnam',
      description: '',
      prompts: ['what I avoided', 'shopping list', 'it was enough']
    }
  ];

  return (
    <section id="past-editions" className="section past-editions-section">
      <div className="section-container">
        <h2 className="section-title">Past Editions</h2>

        <div className="past-editions-content">
          <p className="intro-text">
            Since 2013, the 18 Days Project has run nearly a dozen editions, creating a vibrant global community of writers. Here are some of the most recent public editions.
          </p>

          <div className="editions-grid">
            {editions.map((edition, index) => (
              <div key={index} className="edition-card">
                <div className="edition-header">
                  <h3>{edition.name}</h3>
                  <p className="edition-date">{edition.date}</p>
                </div>

                <div className="edition-details">
                  <p className="participants"><strong>Participants:</strong> {edition.participants}</p>
                  {edition.description && <p className="description">{edition.description}</p>}

                  {edition.prompts && edition.prompts.length > 0 && (
                    <div className="edition-prompts">
                      <p className="prompts-label"><strong>Sample Prompts:</strong></p>
                      <ul>
                        {edition.prompts.map((prompt, idx) => (
                          <li key={idx}>{prompt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="editions-note">
            <p>
              Since our beginning in June 2013, we've coordinated editions with 500+ participants around the world. Each edition brings together writers of all levels to build creative practice, overcome resistance, and generate new work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PastEditions;
