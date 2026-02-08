
import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10 leading-tight">
            We’re not a course. <br />
            <span className="text-slate-500">We’re your job-hunt partner.</span>
          </h2>
          <div className="space-y-6 text-xl text-slate-400 leading-relaxed">
            <p>
              CCC was built for students stuck in the application loop. We saw thousands of talented individuals getting ignored because of a broken hiring system.
            </p>
            <p>
              We don’t sell motivation — we build systems, clarity, and confidence. Our goal is to bridge the gap between education and employment through structured strategy.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};
