import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <main className="about-page">
      <section className="section about-page-section">
        <div className="section-container">
          <h1 className="section-title">About The Creators</h1>
          <div className="about-page-content">
            <div className="about-page-mission">
              <p>
                We (Caroline & Janet) have been running the 18 Days Project, a generative writing experience, since June 2013, when we started it in honor of our Gemini birthdays. Since then, we've coordinated a dozen editions of the project with 500+ participants around the world.
              </p>
              <p>
                Starting in 2020 we began sending not only daily prompts but also daily accompanying letters on the creative process. We love hearing stories from participants, of dads writing alongside their teenage sons, people finishing or starting novels, friends staying in touch across long distances, and new projects sprouting. Since 2020 when we began paying ourselves for our work on this project, we've also been able to donate a portion of the project's proceeds to organizations including the Farmworker's COVID Relief Fund (2020), NDN Collective (2021), Yellowhammer Fund (2023), and RAICES (2024).
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
