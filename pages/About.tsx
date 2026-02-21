
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, MessageSquare, HardDrive, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const About: React.FC = () => {
  const keyPoints = [
    {
      icon: Users,
      stat: "500+",
      label: "Careers Guided",
      color: "text-[#4285F4]"
    },
    {
      icon: UserCheck,
      stat: "1:1",
      label: "Dedicated Consulting",
      color: "text-[#FABB05]"
    },
    {
      icon: MessageSquare,
      stat: "24/7",
      label: "Always-On Support",
      color: "text-[#9333EA]"
    },
    {
      icon: HardDrive,
      stat: "Lifetime",
      label: "Drive Access",
      color: "text-[#34A853]"
    }
  ];

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-tight text-depth-hero">
            We’re your job hunt partner — <span className="text-[#4285F4]">not a course.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed text-depth-subheading">
            Career Craft Consultancy was built for students and freshers stuck in the “apply more” trap. We don’t sell motivation. We build strategy, execution, and results.
          </p>
        </div>

        {/* 4-card Key Service Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-100 rounded-2xl shadow-sm px-6 py-10 mb-24 flex flex-col md:flex-row justify-between items-center divide-y md:divide-y-0 md:divide-x divide-slate-100"
        >
          {keyPoints.map((point, i) => (
            <div key={i} className="flex-1 py-6 md:py-0 px-4 w-full md:w-auto text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <point.icon size={30} className={point.color} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">{point.stat}</h3>
              <p className="text-xs md:text-sm font-medium text-slate-500">{point.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-24 items-start border-t border-slate-100 pt-32">
          <div>
            <h2 className="text-3xl font-bold text-slate-950 mb-8 tracking-tight text-depth-heading">Our Mission</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              To help every job-seeking student feel supported, confident, and employable by removing the guesswork from the hiring process.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-950 mb-8 tracking-tight text-depth-heading">Why we started</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              The gap between college and the corporate world is a black hole. Most students have the skills but lack the 'packaging' and 'outreach' systems required to get noticed. We bridge that gap systematically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
