
import React from 'react';

export const Pricing: React.FC = () => {
  const features = [
    "Resume & LinkedIn makeover",
    "1-on-1 guidance",
    "HR outreach strategy",
    "Chat support",
    "Progress tracking"
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-500">Everything you need to kickstart your career.</p>
        </div>

        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] uppercase font-black px-8 py-1 tracking-widest rotate-45 translate-x-[25%] translate-y-[100%]">
            Limited Slots
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Job Hunt Kickstart</h3>
            <p className="text-gray-500 text-sm">A complete system for early professionals.</p>
          </div>

          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-5xl font-black text-slate-900">₹999</span>
            <span className="text-gray-400 text-sm font-medium">one-time investment</span>
          </div>

          <ul className="space-y-5 mb-12">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-4 text-gray-600 font-medium">
                <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => window.open('https://rzp.io/rzp/L3WYf37s', '_blank')}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95"
          >
            Get Started
          </button>

          <p className="text-center mt-6 text-xs text-gray-400 font-medium">
            Secure payment processing via Razorpay
          </p>
        </div>
      </div>
    </section>
  );
};
