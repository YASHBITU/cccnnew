
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "../../lib/utils"
import { TestimonialCard, TestimonialAuthor } from "./testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={cn(
      "bg-[#fcfcfc] text-slate-950",
      "py-24 md:py-32 px-0 overflow-hidden",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-12 text-center sm:gap-16">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 px-6 sm:gap-6">
          <h2 className="max-w-[800px] text-5xl font-black tracking-tighter leading-tight sm:text-7xl text-depth-heading">
            {title}
          </h2>
          <p className="text-sm max-w-[650px] font-medium text-slate-400 sm:text-xl text-depth-subheading">
            {description}
          </p>
        </div>

        {/* Slider Section */}
        <div className="relative w-full flex flex-col items-center gap-10">
          <div className="relative w-full max-w-5xl px-6 h-[320px] md:h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 500 : -500,
                    opacity: 0,
                    scale: 0.9,
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  },
                  exit: (direction: number) => ({
                    zIndex: 0,
                    x: direction < 0 ? 500 : -500,
                    opacity: 0,
                    scale: 0.9,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute"
              >
                <TestimonialCard 
                  {...testimonials[currentIndex]}
                  className="!w-[320px] sm:!w-[500px] md:!w-[600px] !p-10 md:!p-16 border-2 border-[#4285F4]/10"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6">
            <button 
              onClick={slidePrev}
              className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center bg-white text-slate-400 hover:text-[#4285F4] hover:border-[#4285F4]/20 hover:shadow-xl transition-all active:scale-90"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    currentIndex === i ? "w-8 bg-[#4285F4]" : "w-2 bg-slate-200"
                  )} 
                />
              ))}
            </div>
            <button 
              onClick={slideNext}
              className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center bg-white text-slate-400 hover:text-[#4285F4] hover:border-[#4285F4]/20 hover:shadow-xl transition-all active:scale-90"
            >
              <ChevronRight size={32} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
