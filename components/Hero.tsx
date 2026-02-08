
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-40 pb-24 md:pt-56 md:pb-40 hero-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-indigo-100 bg-indigo-50/30 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
          Reimagining the Job Hunt
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
          Stop applying blindly. <br />
          <span className="text-gray-400">Start getting real interview calls.</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          A structured, mentor-led job hunt system designed for freshers who are tired of being ignored. We build systems, not just resumes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
            Start Your Job Hunt the Right Way
          </button>
          <button className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-300 transition-all active:scale-95">
            See How It Works
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
          {['TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant'].map((brand) => (
            <span key={brand} className="text-xl font-bold tracking-tighter text-gray-400">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
