
"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Target, 
  ShieldCheck, 
  Globe, 
  Users, 
  Search, 
  ShoppingCart, 
  Briefcase,
  MousePointer2,
  Mail,
  Zap,
  CheckCircle2
} from "lucide-react"
import { cn } from "../../lib/utils"

export default function FeaturesCards() {
  return (
    <section className="pb-24 md:pb-32 pt-10 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
            <Zap className="w-3 h-3 text-[#4285F4] fill-[#4285F4]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">The CCC Advantage</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-950 mb-6 tracking-tighter text-depth-heading leading-[0.85]">
            A system that <br className="hidden md:block" /> actually works
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto text-depth-subheading">
            Stop applying blindly. Use our structured, mentor-led framework designed for high-conversion outcomes.
          </p>
        </div>

        {/* Bento Grid Layout - Premium SaaS Style */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[900px]">
          
          {/* Card 1: Strategic Applications */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-4 md:row-span-1 bg-[#d6ccc2] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 relative overflow-hidden group border border-black/5 flex flex-col justify-start min-h-[320px] md:min-h-0"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.15] pointer-events-none" />
            <div className="relative z-10 mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-none mb-3 pr-6">
                Strategic Apps — high-intent targeting.
              </h3>
              <p className="text-slate-800/60 font-bold text-sm md:text-base tracking-tight leading-snug max-w-[240px]">
                Apply less. Get noticed more through our proprietary targeting framework.
              </p>
            </div>
            <div className="relative w-full z-10 mt-auto md:mt-0">
              <div className="w-full bg-white/95 backdrop-blur-md rounded-full py-3.5 px-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] group-hover:scale-[1.02] transition-all duration-500 border border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-slate-400" strokeWidth={3} />
                  <span className="text-slate-400 font-bold text-[10px] md:text-xs tracking-tight">Your next role...</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-950 font-black text-[10px] md:text-xs tracking-widest">.jobs</span>
                  <div className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center shadow-lg shadow-black/20">
                    <ShoppingCart className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Recruiter Psychology */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-4 md:row-span-1 bg-[#004242] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 relative overflow-hidden group border border-black/5 flex flex-col justify-between min-h-[380px] md:min-h-0"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter leading-none mb-3">
                Designed for recruiter psychology.
              </h3>
              <p className="text-white/40 font-bold text-sm md:text-base tracking-tight leading-snug">
                We rebuild your profiles to trigger 'instant hire' responses from HR managers.
              </p>
            </div>
            <div className="relative z-10 w-full flex justify-center mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-3xl rounded-[2rem] p-4 md:p-6 flex items-center border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)] group-hover:scale-[1.05] transition-transform duration-500 w-full max-w-[95%]">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#00e1e1] flex items-center justify-center shadow-2xl shadow-[#00e1e1]/40 flex-shrink-0">
                     <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-[#004242]" strokeWidth={3} />
                  </div>
                  <div className="space-y-1.5 md:space-y-2 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] md:text-[9px] font-black text-[#00e1e1] uppercase tracking-[0.2em]">Profile Score</span>
                      <span className="text-[8px] md:text-[9px] font-black text-white tracking-widest">98%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-[#00e1e1] shadow-[0_0_10px_rgba(0,225,225,0.8)]" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#00e1e1]/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Card 3: Trust/Network */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-4 md:row-span-1 bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between group border border-slate-100 shadow-sm min-h-[300px] md:min-h-0"
          >
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner">
                <Globe className="w-7 h-7 text-[#00e1e1]" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                More than advice. 500+ trust our growth systems.
              </h3>
            </div>
            <div className="mt-auto">
              <div className="flex -space-x-3 mb-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-950 flex items-center justify-center text-[10px] font-black text-white">
                  +
                </div>
              </div>
              <p className="text-slate-400 font-bold text-sm tracking-tight">
                Join a serious community of professionals landing high-impact calls.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Global Reach */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-4 md:row-span-1 bg-slate-950 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between group border border-white/5 min-h-[300px] md:min-h-0"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/10 to-transparent pointer-events-none" />
             <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-[#4285F4] rounded-2xl flex items-center justify-center shadow-xl shadow-[#4285F4]/30">
                 <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none">
                Direct outreach that skips the black holes.
              </h3>
            </div>
            <p className="relative z-10 text-slate-500 font-bold text-sm mt-6 leading-snug">
              Bypass generic "Easy Apply" portals and connect directly with hiring decision-makers.
            </p>
          </motion.div>

          {/* Card 5: The Full System */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-8 md:row-span-1 bg-[#e9e3dc] rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden group border border-black/5"
          >
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                  <Zap className="w-3 h-3 text-[#4285F4] fill-[#4285F4]" />
                  The CCC Blueprint
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                  Execution first. <br className="hidden lg:block" /> Systems second.
                </h3>
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-sm">
                  We provide the exact frameworks, scripts, and 1-on-1 support needed to navigate the hiring landscape.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-950 tracking-tighter">15 Days</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Refund Period</span>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-300" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-950 tracking-tighter">1-on-1</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expert Guidance</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden md:block group-hover:translate-x-6 transition-transform duration-700">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.12)] border border-black/5 w-[140%] -mr-60 relative overflow-hidden">
                   <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/20" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-50" />
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-300">Strategy Matrix v2.1</div>
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#4285F4] shadow-sm">
                          <Briefcase className="w-7 h-7" />
                        </div>
                        <div className="space-y-2.5 flex-1">
                          <div className="h-4 w-3/4 bg-slate-100 rounded-full" />
                          <div className="h-3 w-1/2 bg-slate-50 rounded-full" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col gap-2">
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Calls Generated</span>
                           <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-slate-950">24</span>
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                           </div>
                        </div>
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col gap-2">
                           <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">HR Engagement</span>
                           <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-indigo-950">12</span>
                              <Zap className="w-3 h-3 text-[#4285F4] fill-[#4285F4]" />
                           </div>
                        </div>
                      </div>
                   </div>
                   <div className="absolute -bottom-6 right-24 w-44 h-14 bg-[#4285F4] rounded-2xl shadow-3xl shadow-[#4285F4]/30 flex items-center justify-center gap-3 border-4 border-white group-hover:scale-105 transition-transform z-20">
                      <Mail className="w-4 h-4 text-white" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Direct HR Connect</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
