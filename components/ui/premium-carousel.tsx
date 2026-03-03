import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Linkedin, Star, Quote } from 'lucide-react';

export const placements = [
    {
        id: 1,
        name: "Dinesh Rathod",
        role: "Data Analyst",
        ctc: "5 LPA",
        company: "Kredit Bee",
        review: "Really thanks for CCC, i was frustrated by applying on lots of job opening, and was not even able to schedule the interview. But CCC help me to the calls, i started calls and even i gave 3 interview and finally got selected in one. Thankyou so much for your support",
        linkedin: "https://www.linkedin.com/in/dinesh-rathod-a71657399/",
        image: "/kiran.jpg",
    },
    {
        id: 2,
        name: "Kiran Chavan",
        role: "Data Analyst",
        ctc: "4.5 LPA",
        company: "Toluna",
        review: "My experience was too good with CCC, Team of CCC was so experienced in Interview Process. I will recommend it to all the people who are not getting the interview calls and struggling to clear the interview. They also helped me in Resume Building and Linkedin Profile. Worth decision. Grateful to have CCC in my job hunting process",
        linkedin: "https://www.linkedin.com/in/kiran-chavan-29a3bb3a0/",
        image: "/dinesh.jpg",
    },
    {
        id: 3,
        name: "Prasann Autade",
        role: "Junior Java Developer",
        ctc: "6 LPA",
        company: "Interface Solution",
        review: "As a fresher its was too difficult to get the opportunity, i was like - i need a job at any cost. I was just looking for experience, in future once i will have experience, i will focus on Better opportunity. But CCC help me to land with Interface solution as a Junior Java Developer",
        linkedin: "https://www.linkedin.com/in/prasann-autade-5b85652a7/",
        image: "/prasann.jpg",
    },
    {
        id: 4,
        name: "Gajanand Vagile",
        role: "HR Analytics",
        ctc: "4 LPA",
        company: "Bajaj Finserve",
        review: "One of the best platform I came across for my job hunting. I got best service and guidance from resume polishing to mock interviews everything is top notch. And the job hunt strategy is game changer for me",
        linkedin: "https://www.linkedin.com/in/gajanand-vagile-d9/",
        image: "/gajanand.jpg",
    },
];

export function PremiumCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % placements.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? placements.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const current = placements[currentIndex];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                    Path To Placements
                </h2>
                <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                    Meet the candidates who transformed their careers and landed top roles using our proven job-hunting strategy.
                </p>
            </div>

            <div
                className="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex flex-col lg:flex-row min-h-[600px] items-stretch">
                    {/* Left side: Image and details */}
                    <div className="w-full lg:w-5/12 relative min-h-[400px] lg:min-h-full overflow-hidden bg-[#F0F4F8] lg:border-r border-slate-100 flex items-center justify-center rounded-l-[2rem] md:rounded-l-[3rem] lg:rounded-r-none rounded-t-[2rem] lg:rounded-tr-none">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={current.image}
                                src={current.image}
                                alt={current.name}
                                className="absolute inset-0 w-full h-full object-contain"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent pointer-events-none" />

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="mt-auto"
                                >
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="bg-[#4285F4] text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm shadow-[#4285F4]/10 pointer-events-auto">
                                            {current.ctc}
                                        </span>
                                        <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm pointer-events-auto">
                                            {current.company}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-md">
                                        {current.name}
                                    </h3>
                                    <p className="text-[#4285F4] font-bold text-lg md:text-xl drop-shadow-sm">
                                        {current.role}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right side: Review */}
                    <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white relative">
                        <Quote className="absolute top-8 right-8 w-24 h-24 text-slate-100 -rotate-12 opacity-50 pointer-events-none" />

                        <div className="relative z-10 flex-grow flex flex-col justify-center">
                            <div className="flex gap-1.5 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute inset-0 bg-amber-400 blur-[6px] opacity-40 rounded-full scale-110" />
                                        <Star className="w-6 h-6 fill-amber-400 text-amber-500 relative z-10 drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]" />
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-slate-700 font-medium italic tracking-tight mb-8">
                                        "{current.review}"
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`link-${current.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <a
                                        href={current.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full font-bold hover:bg-[#0A66C2]/20 transition-colors w-max"
                                    >
                                        <Linkedin className="w-5 h-5 fill-current" />
                                        Connect on LinkedIn
                                    </a>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between mt-12 bg-slate-50 p-2 rounded-2xl border border-slate-100 relative z-10 w-max self-end sm:self-start">
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-95"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <div className="flex gap-2 px-4">
                                    {placements.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#4285F4]" : "w-2 bg-slate-300 hover:bg-slate-400"
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-95"
                                    aria-label="Next"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
