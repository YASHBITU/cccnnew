
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

      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[300] flex items-center gap-4 group"
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#25D366]/20 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none">
          <p className="text-slate-800 font-bold text-sm tracking-tight whitespace-nowrap flex items-center gap-2">
            Lets meet on whatsapp <span className="text-lg">😇</span>
          </p>
        </div>

        <a
          href="https://wa.me/919850103088"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white rounded-[2rem] shadow-[0_20px_50px_-12px_#25D366] hover:shadow-[0_20px_50px_-8px_#25D366] active:scale-95 transition-all duration-300 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-b before:from-white/40 before:to-transparent before:opacity-60 after:absolute after:inset-[2px] after:rounded-[1.8rem] after:border-t-2 after:border-white/40"
          aria-label="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="34"
            height="34"
            fill="currentColor"
            className="drop-shadow-md z-10"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default App;
