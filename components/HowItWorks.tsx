
import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    { id: '01', title: "Audit & Positioning", desc: "We analyze your current gaps and define your market worth." },
    { id: '02', title: "Profile Optimization", desc: "We rebuild your resume and LinkedIn from scratch." },
    { id: '03', title: "Smart Strategy", desc: "Implementing our high-intent application framework." },
    { id: '04', title: "Direct Outreach", desc: "Systematic outreach to HRs and hiring managers." },
    { id: '05', title: "Interview Ready", desc: "Ongoing support until you sign your offer letter." }
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">How it works</h2>
          <p className="text-gray-500 text-lg">You’re not left alone at any step of the way.</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 md:items-center group">
              <div className="text-6xl font-black text-gray-50 group-hover:text-indigo-50 transition-colors w-24">
                {step.id}
              </div>
              <div className="flex-1 pb-8 border-b border-gray-100 group-last:border-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 max-w-xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
