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
                Caroline and Janet wanted to celebrate their birthdays in a way that would spark their creativity and help others jump-start their own creative lives. The framework was introduced to Washington D.C. by The Writing Salon, who then shared it with Janet. Since June 2013, we've coordinated a dozen editions of the project with 500+ participants around the world.
              </p>
              <p>
                Starting in 2020 we began sending not only daily prompts but also daily accompanying letters on the creative process. We love hearing stories from participants, of dads writing alongside their teenage sons, people finishing or starting novels, friends staying in touch across long distances, and new projects sprouting. Since 2020 when we began paying ourselves for our work on this project, we've also been able to donate a portion of the project's proceeds to organizations including the Farmworker's COVID Relief Fund (2020), NDN Collective (2021), Yellowhammer Fund (2023), and RAICES (2024).
              </p>
            </div>

            <div className="creators-section">
              <div className="creator">
                <div className="creator-image">
                  <img src="https://images.squarespace-cdn.com/content/v1/68239d34411ae666d424576c/7bd52410-1f35-4ced-8641-a1e50a94411b/more+formal+headshot+hi-res.jpeg?format=1000w" alt="Caroline Kessler" />
                </div>
                <div className="creator-info">
                  <h2>Caroline Kessler</h2>
                  <p className="location"><strong>Location:</strong> Berkeley, CA (on Ohlone land)</p>
                  <p className="roles"><strong>Roles:</strong> Poet, editor, and facilitator working at intersections of language, spirituality, and organizing</p>

                  <h3>Publications & Credentials</h3>
                  <ul>
                    <li>Author of <em>Ritual in Blue</em> (Sutra Press, 2018)</li>
                    <li>MFA in Creative Writing from Washington University in St. Louis (T.S. Eliot Scholar)</li>
                    <li>Work published in <em>Superstition Review</em>, <em>Echolocation</em>, <em>The Oakland Review</em>, <em>The McNeese Review</em>, and <em>Quiet Lightning</em></li>
                  </ul>

                  <h3>Projects</h3>
                  <ul>
                    <li>Co-creator of <a href="https://indexfist.tumblr.com/" target="_blank" rel="noopener noreferrer">Index/Fist</a> (handmade magazine collective)</li>
                    <li>Co-founder of <a href="https://ashreinustl.org/" target="_blank" rel="noopener noreferrer">Ashreinu</a> (independent community in St. Louis)</li>
                  </ul>

                  <p><strong>Website:</strong> <a href="https://carokess.com/" target="_blank" rel="noopener noreferrer">carokess.com</a></p>
                </div>
              </div>

              <div className="creator">
                <div className="creator-image">
                  <img src="https://via.placeholder.com/300x300?text=Janet" alt="Janet Frishberg" />
                </div>
                <div className="creator-info">
                  <h2>Janet Frishberg</h2>
                  <p className="roles"><strong>Roles:</strong> Fiction, nonfiction, and poetry writer</p>

                  <h3>Professional Experience</h3>
                  <p>Assistant Interviews Editor for <em>The Rumpus</em> (2018-2021)</p>

                  <h3>Publications</h3>
                  <p>Work appears in <em>PANK</em>, <em>Catapult</em>, <em>Electric Lit</em>, <em>The Rumpus</em>, <em>Hobart</em>, <em>No Tokens</em>, and other publications; Pushcart Prize nominated</p>

                  <h3>Newsletter</h3>
                  <p>Monthly missive called "Eleven Things" available via <a href="https://tinyletter.com/janetf" target="_blank" rel="noopener noreferrer">TinyLetter</a></p>

                  <p><strong>Website:</strong> <a href="http://www.janetfrishberg.com/about.html" target="_blank" rel="noopener noreferrer">janetfrishberg.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
