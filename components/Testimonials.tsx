
import React from 'react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "After months of no replies, I finally started getting HR calls. The process was structured and clear.",
      author: "Data Analyst",
      name: "Rohan M."
    },
    {
      quote: "I used to think my resume was fine. CCC showed me why it wasn't converting. The change was instant.",
      author: "Software Engineer",
      name: "Ananya K."
    },
    {
      quote: "No motivation talk. Just real, actionable steps that actually lead to interviews.",
      author: "Product Designer",
      name: "Siddharth S."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-20">
          Real students. Real progress.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-100 text-left shadow-sm">
              <div className="text-indigo-600 text-4xl mb-6 font-serif opacity-30">“</div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t.quote}
              </p>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-gray-400">{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
