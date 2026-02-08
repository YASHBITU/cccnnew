
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  title: string;
  avatar: string;
  bgColor: string;
  textColor: string;
}

interface TestimonialStackProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export const TestimonialStack: React.FC<TestimonialStackProps> = ({
  testimonials,
  autoPlayInterval = 8000,
}) => {
  const [items, setItems] = useState(testimonials);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<any>(null);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setItems((prev) => {
      const newItems = [...prev];
      const firstItem = newItems.shift()!;
      newItems.push(firstItem);
      return newItems;
    });

    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setItems((prev) => {
      const newItems = [...prev];
      const lastItem = newItems.pop()!;
      newItems.unshift(lastItem);
      return newItems;
    });

    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  useEffect(() => {
    autoPlayRef.current = setInterval(handleNext, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [handleNext, autoPlayInterval]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(handleNext, autoPlayInterval);
  };

  return (
    <section className="h-full bg-[#05070a] text-white overflow-hidden rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-10 border border-white/5 relative soft-shadow">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#4285F4]/10 blur-[150px] rounded-full opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-full relative z-10 flex flex-col justify-center py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5 md:gap-3">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4285F4]" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                PROVEN CAREER GROWTH
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-depth-hero">
              Transforming <br /> careers <br className="hidden lg:block" /> instantly
            </h2>
            
            <p className="text-sm md:text-lg text-white/40 font-medium max-w-sm mx-auto lg:mx-0 leading-relaxed">
              Real stories from graduates who leveraged the CCC system to land high-impact calls.
            </p>
          </div>

          <div className="relative h-[340px] md:h-[500px] w-full flex items-center justify-center lg:justify-end order-1 lg:order-2 mt-4 lg:mt-0">
            <div className="relative w-full max-w-[280px] md:max-w-[420px] h-full flex items-center justify-center">
              
              <div className="absolute top-[-40px] md:top-0 right-0 md:right-4 flex gap-2 z-[110]">
                <button
                  onClick={() => { pauseAutoPlay(); handlePrev(); resumeAutoPlay(); }}
                  className="w-9 h-9 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 backdrop-blur-3xl transition-all shadow-lg active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <button
                  onClick={() => { pauseAutoPlay(); handleNext(); resumeAutoPlay(); }}
                  className="w-9 h-9 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 backdrop-blur-3xl transition-all shadow-lg active:scale-90"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {items.slice(0, 3).map((testimonial, index) => (
                  <Card 
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                    total={items.length}
                    onNext={handleNext}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  testimonial: Testimonial;
  index: number;
  onNext: () => void;
  total: number;
}

const Card: React.FC<CardProps> = ({ testimonial, index, onNext, total }) => {
  const isTop = index === 0;
  
  const x = useMotionValue(0);
  const rotateValue = useTransform(x, [-300, 300], [-15, 15]);
  const opacityValue = useTransform(x, [-300,-200, 0, 200, 300], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onNext();
    }
  };

  return (
    <motion.div
      layout
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate: isTop ? rotateValue : 0, opacity: isTop ? opacityValue : 1 }}
      initial={{ opacity: 0, scale: 0.9, x: 100 }}
      animate={{
        opacity: 1,
        x: index * (window.innerWidth < 768 ? 4 : 12), 
        y: index * (window.innerWidth < 768 ? 4 : 12),
        scale: 1 - index * 0.04,
        zIndex: total - index,
      }}
      exit={{
        x: -400,
        y: -100,
        rotate: -20,
        opacity: 0,
        transition: { duration: 0.6 }
      }}
      transition={{
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1]
      }}
      className={cn(
        "absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 flex flex-col justify-between overflow-hidden border border-white/10 select-none",
        "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] md:shadow-[0_45px_90px_-20px_rgba(0,0,0,0.7)]",
        testimonial.bgColor,
        testimonial.textColor,
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
    >
      <div className="space-y-5 md:space-y-8 overflow-hidden">
        <Quote className="w-8 h-8 md:w-14 md:h-14 opacity-30" fill="currentColor" />
        
        <div className="space-y-3 md:space-y-6">
          <h3 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-[1.05] md:leading-[0.95]">
            {testimonial.title}
          </h3>
          
          <p className="text-xs md:text-lg font-medium opacity-90 leading-relaxed italic line-clamp-5 md:line-clamp-none">
            "{testimonial.content}"
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-5 mt-auto pt-4">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/30"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center border-2 border-slate-950">
             <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm md:text-xl font-black tracking-tighter leading-tight truncate">{testimonial.name}</p>
          <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.25em] opacity-60 mt-0.5 md:mt-1 truncate">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
