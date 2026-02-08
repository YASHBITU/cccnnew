
import React from 'react';

export const Problem: React.FC = () => {
  const problems = [
    "Hundreds of applications. Zero replies.",
    "LinkedIn Easy Apply doesn’t work anymore.",
    "Resumes look fine — but don’t convert.",
    "No one tells you how hiring actually works."
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white rounded-[2rem] md:rounded-[4rem] mx-4 md:mx-8 mb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why most job <br />searches fail
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md">
              The modern application process is broken. Sending more resumes into the void is not the answer.
            </p>
            <p className="text-indigo-400 font-medium">
              CCC exists to fix this — systematically.
            </p>
          </div>
          
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                </div>
                <p className="text-lg text-slate-300">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
