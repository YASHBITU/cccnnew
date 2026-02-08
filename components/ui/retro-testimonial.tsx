
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { cn } from "../../lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

interface iCarouselProps {
  items: React.ReactElement<any>[];
  initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// ===== Components =====
const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 230 : 384;
      const gap = isMobile ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full mt-10">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5 px-6"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-6">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: "easeOut",
                },
              }}
              key={`card-${index}`}
              className="flex-shrink-0"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center md:justify-end gap-3 mt-8 px-6">
        <button
          className="relative z-40 h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center disabled:opacity-30 hover:bg-[#334155] transition-all duration-200 shadow-lg"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="relative z-40 h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center disabled:opacity-30 hover:bg-[#334155] transition-all duration-200 shadow-lg"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

// Added interface for TestimonialCard props to ensure proper typing and inclusion of React built-in props like 'key'
interface TestimonialCardProps {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
}

// Fixed: Properly type TestimonialCard as a React.FC to allow 'key' prop when mapping in Home.tsx
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?q=80&w=1000&auto=format&fit=crop",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen w-screen z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/60 backdrop-blur-xl h-full w-full fixed inset-0"
              onClick={handleCollapse}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              ref={containerRef}
              className="max-w-4xl w-full bg-[#f8fafc] h-auto max-h-[90vh] overflow-y-auto z-[110] p-8 md:p-16 rounded-[3rem] relative shadow-2xl"
            >
              <button
                className="absolute top-6 right-6 h-10 w-10 rounded-full flex items-center justify-center bg-slate-900 shadow-xl hover:scale-110 transition-transform"
                onClick={handleCollapse}
              >
                <X className="h-5 w-5 text-white" />
              </button>
              
              <div className="mb-8">
                <p className="text-[#4285F4] text-sm uppercase font-black tracking-[0.2em] mb-4">
                  {testimonial.designation}
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter">
                  {testimonial.name}
                </h3>
              </div>

              <div className="text-slate-600 text-2xl md:text-4xl font-medium leading-relaxed italic relative">
                <Quote className="h-12 w-12 text-[#4285F4]/10 absolute -top-6 -left-6" />
                <span className="relative z-10">"{testimonial.description}"</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={handleExpand}
        className="outline-none"
        whileHover={{
          scale: 1.02,
          y: -5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div
          className="rounded-[3rem] bg-white h-[500px] md:h-[550px] w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-2xl border border-slate-100 group"
        >
          <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
            <img
              className="block w-full h-full object-cover"
              src={backgroundImage}
              alt="Background"
            />
          </div>
          
          <div className="relative z-20 flex flex-col items-center px-8 text-center">
            <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
            
            <motion.p className="text-slate-900 text-xl md:text-2xl font-bold tracking-tight mt-8 leading-snug">
              {testimonial.description.length > 100
                ? `"${testimonial.description.slice(0, 100)}..."`
                : `"${testimonial.description}"`}
            </motion.p>
            
            <div className="mt-8">
              <p className="text-slate-950 text-xl font-black tracking-tight uppercase italic">
                {testimonial.name}
              </p>
              <p className="text-[#4285F4] text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                {testimonial.designation}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-slate-900 text-white text-[10px] font-black py-2 px-4 rounded-full uppercase tracking-widest shadow-lg">
              Read Story
            </div>
          </div>
        </div>
      </motion.button>
    </>
  );
};

const ProfileImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] overflow-hidden rounded-full border-4 border-white shadow-2xl relative">
      <img
        className={cn(
          "transition duration-500 w-full h-full object-cover",
          isLoading ? "blur-sm" : "blur-0",
        )}
        onLoad={() => setLoading(false)}
        src={src}
        loading="lazy"
        alt={alt || "Profile image"}
      />
    </div>
  );
};

export { Carousel, TestimonialCard, ProfileImage };
