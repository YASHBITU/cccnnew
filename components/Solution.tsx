
import React from 'react';

export const Solution: React.FC = () => {
  const cards = [
    {
      title: "Strategic Applications",
      description: "Apply less. Get noticed more through high-intent targeting.",
      icon: "🎯"
    },
    {
      title: "Psychology-Led Positioning",
      description: "Resumes and LinkedIn profiles designed for recruiter psychology.",
      icon: "🧠"
    },
    {
      title: "Direct HR Outreach",
      description: "Learn how interviews are really scheduled behind closed doors.",
      icon: "📧"
    },
    {
      title: "1-on-1 Expert Support",
      description: "Direct access to mentors. No guessing. No confusion.",
      icon: "👥"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            A job hunt system that actually makes sense
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We move beyond generic templates and focus on the mechanics of modern hiring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="text-3xl mb-6">{card.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{card.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
