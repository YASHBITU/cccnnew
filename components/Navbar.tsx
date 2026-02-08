
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[250] transition-all duration-500 px-6 py-4 md:px-12",
        isScrolled ? "py-3 bg-white/70 backdrop-blur-2xl border-b border-slate-200/40 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo - Left Aligned */}
        <button onClick={() => handleNavClick('home')} className="group flex items-center gap-1.5 outline-none z-[260]">
          <span className="font-black text-2xl md:text-3xl tracking-tighter text-slate-950 transition-transform group-hover:scale-105 duration-300">
            CC<span className="text-[#4285F4]">C</span>
          </span>
        </button>

        {/* Desktop Nav - EXACT CENTER */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "text-[9px] font-black uppercase tracking-[0.25em] transition-all hover:text-[#4285F4] outline-none relative",
                currentPage === item.id ? "text-[#4285F4]" : "text-slate-400"
              )}
            >
              {item.name}
              {currentPage === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4285F4] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Action Button - Right Aligned */}
        <div className="hidden md:block">
          <button 
            onClick={() => handleNavClick('pricing')}
            className="bg-slate-950 text-white text-[9px] font-black uppercase tracking-[0.2em] px-7 py-3 rounded-full hover:bg-[#4285F4] transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-950 z-[260] relative hover:bg-slate-50 rounded-full transition-colors outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Premium Fixed Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-[60px] z-[240] flex flex-col items-center justify-center p-8 text-center overscroll-none"
            style={{ height: '100vh', width: '100vw' }}
          >
            <div className="flex flex-col gap-4 w-full max-w-xs relative z-[250]">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 120 }}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "text-4xl font-black uppercase tracking-tighter transition-all py-2 outline-none",
                    currentPage === item.id ? "text-[#4285F4]" : "text-slate-400 hover:text-slate-950"
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <button 
                  onClick={() => handleNavClick('pricing')}
                  className="w-full bg-[#4285F4] text-white font-black text-lg uppercase tracking-widest py-5 rounded-2xl shadow-2xl shadow-[#4285F4]/30 active:scale-95 transition-all outline-none"
                >
                  Get Started
                </button>
              </motion.div>
            </div>
            
            {/* Background Branding Elements for Mobile Menu */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none -z-10">
              <span className="text-[60vw] font-black leading-none">CCC</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
