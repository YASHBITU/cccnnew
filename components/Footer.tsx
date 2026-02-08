
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleStartNowClick = () => {
    // If the pricing-section ID exists in DOM, it means we are on the Pricing page.
    // In that case, we smooth scroll to the top of the content as requested.
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Otherwise, navigate to the pricing page as usual.
      onNavigate('pricing');
    }
  };

  return (
    <footer className="bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#05070a] rounded-[4rem] p-12 md:p-24 text-center text-white mb-32 shadow-2xl shadow-[#4285F4]/10 border border-[#4285F4]/10 soft-shadow">
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter max-w-3xl mx-auto leading-tight">
            Your job hunt doesn’t need more applications. <br />
            <span className="text-[#4285F4]/60">It needs a better strategy.</span>
          </h2>
          <button 
            onClick={handleStartNowClick}
            className="bg-[#4285F4] text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#3b78e7] transition-all shadow-xl shadow-[#4285F4]/20 active:scale-95 text-depth-button"
          >
            Start Now
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-gray-100">
          <div className="col-span-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-6 group">
              <span className="font-black text-4xl tracking-tighter text-slate-950 transition-transform group-hover:scale-105 duration-300">
                CC<span className="text-[#4285F4]">C</span>
              </span>
            </button>
            <p className="text-gray-400 text-sm max-w-xs font-medium leading-relaxed">
              Career Craft Consultancy helps professionals stop guessing and start winning their job hunt through structured execution and premium mentorship.
            </p>
          </div>

          <div>
            <h4 className="text-slate-950 font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-40">Platform</h4>
            <div className="flex flex-col gap-4 text-sm font-bold text-gray-500">
              <button onClick={() => onNavigate('home')} className="hover:text-[#4285F4] text-left transition-colors">Home</button>
              <button onClick={() => onNavigate('services')} className="hover:text-[#4285F4] text-left transition-colors">Services</button>
              <button onClick={() => onNavigate('pricing')} className="hover:text-[#4285F4] text-left transition-colors">Pricing</button>
              <button onClick={() => onNavigate('about')} className="hover:text-[#4285F4] text-left transition-colors">About</button>
            </div>
          </div>

          <div>
            <h4 className="text-slate-950 font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-40">Legal</h4>
            <div className="flex flex-col gap-4 text-sm font-bold text-gray-500">
              <button onClick={() => onNavigate('privacy')} className="hover:text-[#4285F4] text-left transition-colors">Privacy Policy</button>
              <button onClick={() => onNavigate('terms')} className="hover:text-[#4285F4] text-left transition-colors">Terms & Conditions</button>
              <button onClick={() => onNavigate('refund')} className="hover:text-[#4285F4] text-left transition-colors">Refund Policy</button>
              <button onClick={() => onNavigate('shipping')} className="hover:text-[#4285F4] text-left transition-colors">Shipping Policy</button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black">
            &copy; {new Date().getFullYear()} Career Craft Consultancy. South Extension, Delhi.
          </div>
          <div className="flex gap-8">
            <a 
              href="https://www.linkedin.com/company/ccc-careercraftconsultancy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#4285F4] transition-colors font-black text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
