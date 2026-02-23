
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { PricingPage } from './pages/PricingPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'services': return <Services />;
      case 'pricing': return <PricingPage />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'privacy': return <Legal type="privacy" />;
      case 'terms': return <Legal type="terms" />;
      case 'refund': return <Legal type="refund" />;
      case 'shipping': return <Legal type="shipping" />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-[#4285F4]/20 selection:text-[#4285F4] relative">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
