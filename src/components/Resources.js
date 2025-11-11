import React from 'react';
import './Resources.css';

function Resources() {
  const books = [
    '*The Art of Daring: Risk, Restlessness, Imagination* by Carl Phillips',
    '*The Rose Metal Press Field Guide to Writing Flash Fiction*, edited by Tara Lynn Masih',
    '*How to Write an Autobiographical Novel: Essays* by Alexander Chee',
    '*Bird by Bird: Some Instructions on Writing and Life* by Anne Lamott',
    '*Poemcrazy: Freeing Your Life with Words* by Susan G. Wooldridge',
    '*The Practice of Poetry: Some Writing Exercises from Poets Who Teach* by Robin Behn and Chase Twichell',
    '*Writing Down the Bones: Freeing the Writer Within* by Natalie Goldberg',
    '*Reading Like A Writer: A Guide for People Who Love Books and for Those Who Want to Write Them* by Francine Prose',
    '*The Artist\'s Way: A Spiritual Path to Greater Creativity* by Julia Cameron',
    '*Zen and the Art of Writing* by Ray Bradbury',
    '*If You Want to Write: A Book about Art, Independence and Spirit* by Brenda Ueland',
    '*Your Art Will Save Your Life* by Beth Pickens',
    '*On Writing* by Stephen King',
    '*This Won\'t Take But A Minute Honey* by Steve Almond'
  ];

  const courses = [
    {
      name: 'The Writer\'s Grotto',
      url: 'writersgrotto.org',
      description: 'Offers classes'
    },
    {
      name: 'Laura Davis',
      url: 'lauradavis.net',
      description: 'Online classes and retreats focused on self-expression'
    },
    {
      name: 'Left Margin Lit',
      url: 'leftmarginlit.org',
      description: 'Berkeley co-working space with in-person and virtual classes'
    },
    {
      name: 'Lit Camp',
      url: 'litcampwriters.org',
      description: 'Primarily online classes'
    },
    {
      name: 'Page Street',
      url: 'pagestreet.org',
      description: 'Co-working spaces in San Francisco and Berkeley with membership tiers'
    },
    {
      name: 'Beth Pickens',
      description: 'Offers "Homework Club" and "Parakeet," a year-long book-writing program'
    }
  ];

  return (
    <section id="resources" className="section resources-section">
      <div className="section-container">
        <h2 className="section-title">Resources</h2>

        <div className="resources-content">
          <div className="resource-category">
            <h3>Recommended Books for Writers</h3>
            <ul className="books-list">
              {books.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          </div>

          <div className="resource-category">
            <h3>Courses & Workshops</h3>
            <p className="resource-note">
              The following resources are mostly based in the Bay Area, but many offer online classes:
            </p>
            <div className="courses-list">
              {courses.map((course, index) => (
                <div key={index} className="course-item">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  {course.url && <p className="course-url">{course.url}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resources;
