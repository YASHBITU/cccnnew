
import React from 'react';

export const Guarantee: React.FC = () => {
  const points = ["Clear process", "Dedicated guidance", "Measurable progress"];

  return (
    <section className="py-24 md:py-32 border-y border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Our promise to you</h2>
        
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {points.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 font-medium">{p}</span>
            </div>
          ))}
        </div>
        
        <div className="p-10 md:p-12 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100/50">
          <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
            If you follow the process and don’t receive at least one interview call within 15 days, we refund you.
          </p>
          <p className="mt-6 text-sm text-gray-400 uppercase tracking-widest font-semibold">
            No small print. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};
