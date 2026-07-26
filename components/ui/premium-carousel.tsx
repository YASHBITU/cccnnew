import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Linkedin, Star } from 'lucide-react';

export const placements = [
    {
        id: 1,
        name: "Dinesh Rathod",
        role: "Data Analyst",
        ctc: "5 LPA",
        company: "Kredit Bee",
        review: "Really thanks for CCC, i was frustrated by applying on lots of job opening, and was not even able to schedule the interview. But CCC help me to the calls, i started calls and even i gave 3 interview and finally got selected in one. Thankyou so much for your support",
        linkedin: "https://www.linkedin.com/in/dinesh-rathod-a71657399/",
        image: "/dinesh.jpg",
    },
    {
        id: 2,
        name: "Kiran Chavan",
        role: "Data Analyst",
        ctc: "4.5 LPA",
        company: "Toluna",
        review: "My experience was too good with CCC, Team of CCC was so experienced in Interview Process. I will recommend it to all the people who are not getting the interview calls and struggling to clear the interview. They also helped me in Resume Building and Linkedin Profile. Worth decision. Grateful to have CCC in my job hunting process",
        linkedin: "https://www.linkedin.com/in/kiran-chavan-29a3bb3a0/",
        image: "/kiran.jpg",
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

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % placements.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? placements.length - 1 : prev - 1));

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const current = placements[currentIndex];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10 py-12 md:py-20">

            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 tracking-tighter">
                    Path To Placements
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium max-w-xl mx-auto">
                    Meet the candidates who transformed their careers and landed top roles using our proven job-hunting strategy.
                </p>
            </div>

            {/* ─── MOBILE LAYOUT (< lg) ─── */}
            <div
                className="lg:hidden mx-auto max-w-md"
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
            >
                {/* Unified single card */}
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60 bg-white">

                    {/* Poster image — shows BOTTOM (face area) */}
                    <div className="relative w-full overflow-hidden" style={{ height: '420px' }}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={current.image}
                                src={current.image}
                                alt={current.name}
                                className="absolute inset-0 w-full h-full object-cover object-bottom"
                                initial={{ opacity: 0, scale: 1.03 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.45 }}
                            />
                        </AnimatePresence>

                        {/* Bottom gradient so name reads cleanly */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                        {/* Name + badges pinned bottom-left */}
                        <div className="absolute bottom-0 left-0 w-full px-5 pb-5 z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35, delay: 0.1 }}
                                >
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        <span className="bg-[#4285F4] text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase">
                                            {current.ctc}
                                        </span>
                                        <span className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase">
                                            {current.company}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-black text-white tracking-tight leading-none">{current.name}</p>
                                    <p className="text-[#4285F4] font-bold text-sm mt-1">{current.role}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Review panel */}
                    <div className="px-5 pt-5 pb-4 bg-white">
                        {/* Stars */}
                        <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                        </div>

                        {/* Quote */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={current.id}
                                className="text-sm leading-relaxed text-slate-600 font-medium italic mb-4 line-clamp-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, delay: 0.15 }}
                            >
                                "{current.review}"
                            </motion.p>
                        </AnimatePresence>

                        {/* LinkedIn */}
                        <a
                            href={current.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full font-bold text-xs hover:bg-[#0A66C2]/20 transition-colors mb-4"
                        >
                            <Linkedin className="w-3.5 h-3.5 fill-current" />
                            Connect on LinkedIn
                        </a>

                        {/* Navigation — full width bottom bar */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <button
                                onClick={prevSlide}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 active:scale-90 transition-all"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex gap-1.5">
                                {placements.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            index === currentIndex ? 'w-6 bg-[#4285F4]' : 'w-1.5 bg-slate-200'
                                        }`}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 active:scale-90 transition-all"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── DESKTOP LAYOUT (≥ lg) ─── */}
            <div
                className="hidden lg:block mx-auto max-w-5xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 bg-white flex flex-row">

                    {/* Left: Image */}
                    <div className="w-5/12 relative min-h-[580px] bg-slate-100 border-r border-slate-200 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={current.image}
                                src={current.image}
                                alt={current.name}
                                className="absolute inset-0 w-full h-full object-cover object-bottom"
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                >
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-[#4285F4] text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wider uppercase">
                                            {current.ctc}
                                        </span>
                                        <span className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wider uppercase">
                                            {current.company}
                                        </span>
                                    </div>
                                    <h3 className="text-4xl font-black text-white tracking-tight leading-none mb-1">
                                        {current.name}
                                    </h3>
                                    <p className="text-[#4285F4] font-bold text-lg">{current.role}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Review */}
                    <div className="w-7/12 p-12 xl:p-16 flex flex-col justify-between bg-white">
                        <div className="flex flex-col gap-6 flex-grow justify-center">
                            <div className="flex gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute inset-0 bg-amber-400 blur-[5px] opacity-40 rounded-full scale-110" />
                                        <Star className="w-6 h-6 fill-amber-400 text-amber-400 relative z-10" />
                                    </div>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={current.id}
                                    className="text-xl xl:text-2xl leading-relaxed text-slate-700 font-medium italic tracking-tight"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    "{current.review}"
                                </motion.p>
                            </AnimatePresence>
                            <a
                                href={current.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full font-bold text-sm hover:bg-[#0A66C2]/20 transition-colors w-max"
                            >
                                <Linkedin className="w-4 h-4 fill-current" />
                                Connect on LinkedIn
                            </a>
                        </div>

                        {/* Nav */}
                        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-slate-100">
                            <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all active:scale-95" aria-label="Previous">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex gap-1.5">
                                {placements.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[#4285F4]' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all active:scale-95" aria-label="Next">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <span className="ml-auto text-xs font-bold text-slate-300 uppercase tracking-widest">
                                {currentIndex + 1} / {placements.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
