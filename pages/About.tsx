
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, MessageSquare, HardDrive, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const About: React.FC = () => {
  const keyPoints = [
    {
      icon: Users,
      title: "500+ Careers Guided",
      desc: "Helping students move confidently toward job readiness.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: UserCheck,
      title: "Dedicated 1:1 Consulting",
      desc: "Focused guidance for resumes, profiles, and job strategy.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: MessageSquare,
      title: "Always-On Support",
      desc: "Chat and call support for real-time problem solving.",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: HardDrive,
      title: "Drive Access for life time",
      desc: "Session recording will be available on drive for life long.",
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-20 md:mb-32">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-950 mb-10 leading-[0.9] text-depth-hero">
            We’re your job hunt partner — <span className="text-[#4285F4]">not a course.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed text-depth-subheading">
            Career Craft Consultancy was built for students and freshers stuck in the “apply more” trap. We don’t sell motivation. We build strategy, execution, and results.
          </p>
        </div>

        {/* 4-card Key Service Points with WhatsApp buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {keyPoints.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-[#4285F4]/30 transition-all soft-shadow group flex flex-col"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", point.bg)}>
                <point.icon size={28} className={point.color} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-950 mb-4 tracking-tight leading-tight">{point.title}</h3>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-8 flex-grow">{point.desc}</p>
              
              <a 
                href="https://wa.me/919850103088" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#4285F4] font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform"
              >
                Learn More <MessageCircle size={14} className="fill-[#4285F4]/10" />
              </a>
            </motion.div>
          ))}
        </div>

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
