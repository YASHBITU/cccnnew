
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { 
  FileText, 
  Linkedin, 
  Target, 
  Send, 
  ShieldCheck, 
  Code,
  Terminal,
  Database,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progressColor: string;
  isActive?: boolean;
  progress: number;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  progressColor, 
  isActive, 
  progress,
  delay 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const count = useMotionValue(progress);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(progress);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    const target = (isHovered || (isMobile && isInView)) ? 100 : progress;
    
    const controls = animate(count, target, {
      duration: isMobile ? 2.5 : 1.2,
      ease: [0.22, 1, 0.36, 1],
      delay: isMobile ? (delay * 0.5) + 0.5 : 0
    });
    return () => controls.stop();
  }, [isHovered, progress, count, isMobile, isInView, delay]);

  const isFullyCompleted = displayValue === 100;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!isMobile ? { 
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      className={cn(
        "group relative bg-white rounded-[2.5rem] p-8 md:p-10 transition-all duration-700 flex flex-col overflow-hidden border-2",
        "shadow-[0_8px_30px_rgb(0,0,0,0.02)]",
        (isActive || isFullyCompleted) 
          ? `border-${progressColor}-500/40 ring-4 ring-${progressColor}-500/5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]` 
          : "border-slate-50 hover:border-slate-200"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/30 pointer-events-none" />
      
      <motion.div 
        animate={(isHovered || (isMobile && isInView)) ? { x: ["-100%", "250%"] } : { x: "-100%" }}
        transition={{ 
          duration: isMobile ? 3 : 1.5, 
          ease: "easeInOut",
          repeat: isMobile && isFullyCompleted ? Infinity : 0,
          repeatDelay: 5
        }}
        className="absolute inset-0 w-1/3 h-[200%] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none -skew-x-12 z-30"
        style={{ top: '-50%' }}
      />

      <div className={cn(
        "absolute -top-20 -right-20 w-64 h-64 blur-[80px] rounded-full transition-opacity duration-1000 pointer-events-none z-10",
        (isHovered || (isMobile && isFullyCompleted)) ? "opacity-15" : "opacity-0",
        `bg-${progressColor}-500`
      )} />

      <div className="flex items-start justify-between mb-8 relative z-20">
        <motion.div 
          animate={(isHovered || (isMobile && isFullyCompleted)) ? { rotate: [0, -5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5 transition-all duration-700",
            color,
            (isHovered || isFullyCompleted) ? "shadow-xl scale-110" : ""
          )}
        >
          {isFullyCompleted ? (
            <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
          ) : (
            <Icon className="w-8 h-8" strokeWidth={1.5} />
          )}
        </motion.div>
        
        <div className={cn(
          "transition-all duration-500",
          (isHovered || isMobile) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        )}>
          {isFullyCompleted ? (
            <div className={cn("px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border", `bg-${progressColor}-500/10 border-${progressColor}-500/20 text-${progressColor}-600`)}>
              Mastered
            </div>
          ) : (
            <ArrowUpRight size={20} className="text-slate-200" />
          )}
        </div>
      </div>

      <div className="relative z-20 mb-10">
        <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-tight mb-3 transition-colors duration-500">
          {title}
        </h3>
        <p className="text-slate-400 text-[15px] font-medium leading-relaxed max-w-[260px]">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-8 relative z-20 border-t border-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Phase Completion</span>
            {(isActive || (isMobile && !isFullyCompleted)) && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-blink", `bg-${progressColor}-500`)} />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Current Focus</span>
              </div>
            )}
          </div>
          <span className={cn("text-2xl font-black tabular-nums tracking-tighter transition-all duration-500", 
            (isHovered || isFullyCompleted) ? `text-${progressColor}-500 scale-110` : "text-slate-950"
          )}>
            {displayValue}%
          </span>
        </div>
        
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-[1px]">
          <motion.div 
            animate={{ width: (isHovered || (isMobile && isInView)) ? "100%" : `${progress}%` }}
            transition={{ duration: isMobile ? 2.5 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "h-full rounded-full relative transition-shadow duration-500",
              `bg-${progressColor}-500`,
              (isHovered || isFullyCompleted) ? `shadow-[0_0_15px_rgba(0,0,0,0.1)]` : ""
            )}
          >
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-[1px]"
            />
          </motion.div>
        </div>
      </div>

      <div className={cn(
        "absolute bottom-6 right-6 transition-all duration-1000 pointer-events-none",
        (isHovered || isFullyCompleted) ? "text-slate-200/80 scale-125" : "text-slate-100/50"
      )}>
        <Sparkles size={32} strokeWidth={1} />
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const services = [
    {
      title: "Resume Building",
      description: "Crafting industry-level professional resumes aligned with modern recruiter expectations.",
      icon: FileText,
      color: "bg-blue-50 text-blue-500",
      progressColor: "blue",
      progress: 10,
      delay: 0.1
    },
    {
      title: "LinkedIn Optimization",
      description: "Full profile makeover to trigger passive job opportunities through SEO.",
      icon: Linkedin,
      color: "bg-emerald-50 text-emerald-500",
      progressColor: "emerald",
      isActive: true,
      progress: 15,
      delay: 0.2
    },
    {
      title: "Job Hunt Strategy",
      description: "Proprietary high-intent frameworks tailored to your specific industry.",
      icon: Target,
      color: "bg-amber-50 text-amber-500",
      progressColor: "amber",
      progress: 5,
      delay: 0.3
    },
    {
      title: "Profile Optimization",
      description: "Proof-based profile optimization through detailed review and refinement.",
      icon: Terminal,
      color: "bg-purple-50 text-purple-500",
      progressColor: "purple",
      progress: 25,
      delay: 0.4
    },
    {
      title: "HR Outreach",
      description: "Direct outreach strategies to bypass portals and connect with HRs.",
      icon: Send,
      color: "bg-red-50 text-red-500",
      progressColor: "red",
      isActive: true,
      progress: 45,
      delay: 0.5
    },
    {
      title: "Interview Guidance",
      description: "Mastering storytelling and psychology for every round of interviews.",
      icon: ShieldCheck,
      color: "bg-indigo-50 text-indigo-500",
      progressColor: "indigo",
      progress: 75,
      delay: 0.6
    },
    {
      title: "Technical Mock Rounds",
      description: "Question set which include most probable questions for your interview.",
      icon: Database,
      color: "bg-cyan-50 text-cyan-500",
      progressColor: "cyan",
      progress: 30,
      delay: 0.7
    },
    {
      title: "Salary Negotiation",
      description: "Learn how to present your market worth and secure top-tier offers.",
      icon: BarChart3,
      color: "bg-pink-50 text-pink-500",
      progressColor: "pink",
      progress: 40,
      delay: 0.8
    },
    {
      title: "Post-Offer Support",
      description: "Guidance on onboarding and professional reporting for high impact.",
      icon: Code,
      color: "bg-teal-50 text-teal-500",
      progressColor: "teal",
      progress: 60,
      delay: 0.9
    }
  ];

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 bg-[#fcfcfc] overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#4285F4]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-pulse shadow-[0_0_8px_#4285F4]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Execution Framework</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-slate-950 mb-10 leading-[0.8] text-depth-hero"
          >
            Master the <br />
            <span className="text-[#4285F4]">Job Hunt.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-500 font-medium text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed text-depth-subheading"
          >
            A high-performance curriculum designed to transform your professional profile from invisible to indispensable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12"
        >
           <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Curriculum Compliance</span>
              <span className="text-sm font-black text-slate-950 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Verified Execution System
              </span>
           </div>
           
           <div className="flex gap-2">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="w-2 h-0.5 bg-slate-200 rounded-full" />
              ))}
           </div>

           <div className="flex items-center gap-4">
              <div className="px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                 <ShieldCheck size={18} className="text-[#4285F4]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Industry Standard 2025</span>
              </div>
           </div>
        </motion.div>
      </div>

      <div className="hidden bg-blue-500 bg-emerald-500 bg-amber-500 bg-purple-500 bg-red-500 bg-indigo-500 bg-cyan-500 bg-pink-500 bg-teal-500 border-red-500/30 border-emerald-500/30 text-blue-500 text-emerald-500 text-amber-500 text-purple-500 text-red-500 text-indigo-500 text-cyan-500 text-pink-500 text-teal-500 ring-red-500/5 ring-emerald-500/5 ring-blue-500/5 bg-blue-500/10 border-blue-500/20 text-blue-600 bg-emerald-500/10 border-emerald-500/20 text-emerald-600 bg-amber-500/10 border-amber-500/20 text-amber-600 bg-purple-500/10 border-purple-500/20 text-purple-600 bg-red-500/10 border-red-500/20 text-red-600 bg-indigo-500/10 border-indigo-500/20 text-indigo-600 bg-cyan-500/10 border-cyan-500/20 text-cyan-600 bg-pink-500/10 border-pink-500/20 text-pink-600 bg-teal-500/10 border-teal-500/20 text-teal-600 border-blue-500/40 border-emerald-500/40 border-amber-500/40 border-purple-500/40 border-red-500/40 border-indigo-500/40 border-cyan-500/40 border-pink-500/40 border-teal-500/40 ring-blue-500/5 ring-emerald-500/5 ring-amber-500/5 ring-purple-500/5 ring-red-500/5 ring-indigo-500/5 ring-cyan-500/5 ring-pink-500/5 ring-teal-500/5" />
    </div>
  );
};
