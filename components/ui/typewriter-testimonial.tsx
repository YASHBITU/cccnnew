
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Testimonial = {
  image: string;
  audio: string;
  text: string;
  name: string;
  jobtitle: string;
};

type ComponentProps = {
  testimonials: Testimonial[];
};

export const TypewriterTestimonial: React.FC<ComponentProps> = ({ testimonials }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null); 
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<any>(null);
  const currentTextRef = useRef('');

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause(); 
      audioPlayerRef.current.currentTime = 0; 
      audioPlayerRef.current.src = ''; 
      audioPlayerRef.current.load(); 
      audioPlayerRef.current = null; 
    }
  }, []); 

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;
    
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 30);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []); 

  const handleMouseEnter = useCallback((index: number) => {
    stopAudio(); 
    setHoveredIndex(index);
  
    // Optional: Only attempt to play if audio path is valid
    if (testimonials[index].audio && testimonials[index].audio.endsWith('.mp3')) {
      const newAudio = new Audio(`/audio/${testimonials[index].audio}`);
      audioPlayerRef.current = newAudio; 
      newAudio.play().catch(e => {
          console.warn("Audio playback prevented or failed:", e);
      });
    }
    
    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, stopAudio, startTypewriter]); 

  const handleMouseLeave = useCallback(() => {
    stopAudio(); 
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopAudio, stopTypewriter]);

  useEffect(() => {
    return () => {
      stopAudio(); 
      stopTypewriter(); 
    };
  }, [stopAudio, stopTypewriter]); 

  return (
    <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center"
          onMouseEnter={() => handleMouseEnter(index)} 
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={testimonial.image}
            alt={`Testimonial ${index}`}
            className="w-20 h-20 rounded-full border-4 cursor-pointer object-cover shadow-lg"
            animate={{ 
              borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#4285F4' : '#E5E7EB'
            }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence mode="wait">
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.4, type: 'spring', damping: 20 }}
                className="absolute bottom-24 bg-white text-slate-950 text-sm px-6 py-6 rounded-[2rem] shadow-2xl z-50 pointer-events-none w-72 md:w-80 border border-gray-100"
              >
                <div className="h-32 overflow-hidden whitespace-pre-wrap leading-relaxed font-medium italic text-slate-600">
                  "{typedText}"
                  <span className="animate-blink font-bold text-[#4285F4]">|</span>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                  <p className="font-black text-slate-950 tracking-tight">{testimonial.name}</p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{testimonial.jobtitle}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4">
                  <div className="w-3 h-3 bg-white rounded-full shadow-sm border border-gray-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full shadow-sm mt-1 mx-auto border border-gray-100"></div>
                  <div className="w-1 h-1 bg-white rounded-full shadow-sm mt-1 mx-auto border border-gray-100"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
