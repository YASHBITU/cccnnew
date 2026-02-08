
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Timer } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-1000">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
        <Timer size={14} className="text-[#4285F4] animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Today's offer ends in
        </span>
        <div className="flex items-center gap-1 ml-1">
          <span className="font-mono text-sm font-black text-slate-950 tabular-nums">{timeLeft.hours}h</span>
          <span className="text-slate-300 font-bold">:</span>
          <span className="font-mono text-sm font-black text-slate-950 tabular-nums">{timeLeft.minutes}m</span>
          <span className="text-slate-300 font-bold">:</span>
          <span className="font-mono text-sm font-black text-[#4285F4] tabular-nums">{timeLeft.seconds}s</span>
        </div>
      </div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        Price resets at midnight. Secure your slot now.
      </p>
    </div>
  );
};

export const PricingPage: React.FC = () => {
  const handleEnrollClick = () => {
    window.open('https://pages.razorpay.com/pl_RscCDeL6yNVKaH/view', '_blank');
  };

  return (
    <div id="pricing-section" className="pt-28 pb-20 md:pt-48 md:pb-40 animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mb-4 md:mb-6 text-depth-hero">Invest in your career.</h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium text-depth-subheading">One simple plan. Professional results.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-20 shadow-2xl shadow-[#4285F4]/10 relative overflow-hidden soft-shadow">
            <div className="absolute top-8 right-[-45px] md:top-10 md:right-[-40px] bg-[#4285F4] text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] py-2 px-12 rotate-45 shadow-lg z-20">
              Limited Slots
            </div>

            <div className="mb-8 md:mb-12 relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2 text-depth-heading uppercase tracking-tighter">Job Hunt Kickstart</h2>
              <p className="text-sm md:text-base text-gray-400 font-medium leading-tight">Everything you need to land your first interview.</p>
            </div>

            <div className="flex flex-col mb-8 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-base md:text-lg text-gray-400 line-through font-bold">₹4,999.00</span>
                <span className="bg-[#4285F4]/10 text-[#4285F4] text-[9px] md:text-[10px] font-black px-2 py-1 rounded text-depth-callout">SAVE 86%</span>
              </div>
              <div className="flex items-baseline gap-2 md:gap-3">
                <span className="text-5xl md:text-7xl font-black text-slate-950 text-depth-heading tracking-tighter">₹699</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">One-Time Payment</span>
              </div>
            </div>

            {/* Countdown Timer Component */}
            <CountdownTimer />

            <div className="grid gap-4 md:gap-5 mb-10 md:mb-16 relative z-10">
              {[
                "Resume + LinkedIn makeover",
                "Guaranteed interview calls",
                "1-on-1 expert guidance",
                "Chat support",
                "Proven job hunt system"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 text-slate-700 font-bold text-sm md:text-base">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#4285F4] flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-depth-callout">{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleEnrollClick}
              className="w-full bg-[#4285F4] text-white py-5 md:py-6 rounded-[1.5rem] md:rounded-3xl font-black text-lg md:text-xl hover:bg-[#3b78e7] transition-all shadow-xl shadow-[#4285F4]/20 active:scale-95 uppercase tracking-widest text-depth-button relative z-10"
            >
              Enroll Now
            </button>

            {/* Premium Animated Money-Back Guarantee Section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
              className="mt-8 md:mt-12 p-6 md:p-8 bg-gray-50/50 rounded-2xl md:rounded-[2.5rem] border border-gray-100 text-center relative overflow-hidden group transition-all duration-500 shadow-sm"
            >
              {/* Premium "Sweep" Reflection Effect */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
                className="absolute inset-0 w-1/3 h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none -skew-x-12 z-20"
                style={{ top: '-50%' }}
              />

              {/* Glowing Background Pulse */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/[0.02] transition-colors duration-700" />
              
              <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
                <p className="text-slate-800 font-black text-sm md:text-lg tracking-tight text-depth-subheading">
                  15-Day Money-Back Guarantee
                </p>
                
                {/* Verified Premium Green Tick Container */}
                <div className="relative">
                   <motion.div 
                     animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 rounded-full border border-emerald-500/30 -z-10"
                   />
                   <div className="flex items-center justify-center bg-emerald-500 p-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-white/20 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck size={16} className="text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-base text-gray-500 leading-relaxed font-bold text-depth-callout relative z-10 max-w-sm mx-auto">
                No interview calls within 15 days? We refund your full amount. <span className="text-emerald-600">No questions asked.</span>
              </p>

              {/* Floating micro-ornaments */}
              <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                <Sparkles size={16} className="text-emerald-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
