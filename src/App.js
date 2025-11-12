import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import CurrentEdition from './components/CurrentEdition';
import AnnouncementBar from './components/AnnouncementBar';
import WhoIsThis from './components/WhoIsThis';
import Background from './components/Background';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WritingProcess from './components/WritingProcess';
import Resources from './components/Resources';
import PastEditions from './components/PastEditions';
import Admin from './components/Admin';

function HomePage({ isModalOpen, setIsModalOpen }) {
  return (
    <>
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Welcome />
        <WhoIsThis />
        <Background />
        <Testimonial />
        <Contact />
        <FAQ />
      </main>
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <AnnouncementBar onOpenModal={() => setIsModalOpen(true)} />
        <Header />
        <CurrentEdition isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Routes>
          <Route path="/" element={<HomePage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} />
          <Route path="/writing-process" element={
            <main>
              <WritingProcess />
            </main>
          } />
          <Route path="/resources" element={
            <main>
              <Resources />
            </main>
          } />
          <Route path="/past-editions" element={
            <main>
              <PastEditions />
            </main>
          } />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
