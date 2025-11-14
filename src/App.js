import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TestimonialHero from './components/TestimonialHero';
import Welcome from './components/Welcome';
import CurrentEdition from './components/CurrentEdition';
import AnnouncementBar from './components/AnnouncementBar';
import WhoIsThis from './components/WhoIsThis';
import Background from './components/Background';
import Contact from './components/Contact';
import QuoteBlock from './components/QuoteBlock';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WritingProcess from './components/WritingProcess';
import Resources from './components/Resources';
import PastEditions from './components/PastEditions';
import Admin from './components/Admin';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function HomePage({ isModalOpen, setIsModalOpen }) {
  return (
    <>
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <TestimonialHero />
      <main>
        <Welcome />
        <WhoIsThis />
        <Background />
        <Contact />
        <QuoteBlock />
        <FAQ />
      </main>
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ContentProvider>
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
            <Route path="/checkout" element={
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            } />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;
