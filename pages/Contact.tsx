
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

export const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      desc: "Fastest response for queries and enrollment support.",
      value: "+91 9850103088",
      actionLabel: "Chat on WhatsApp",
      actionUrl: "https://wa.me/919850103088",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      primary: true
    },
    {
      icon: Mail,
      title: "Email Outreach",
      desc: "Reach out for career guidance, technical queries, or enrollment help.",
      value: "info@ccc-consultancy.com",
      actionLabel: "Send Email",
      actionUrl: "mailto:info@ccc-careercraftconsultancy.com",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Phone,
      title: "Direct Call",
      desc: "Our team is available 24/7 to assist you with your career journey.",
      value: "+91 9850103088",
      actionLabel: "Call Now",
      actionUrl: "tel:+919850103088",
      color: "text-[#4285F4]",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Connect with CCC</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-950 mb-8 leading-[0.9] text-depth-hero">
            We’re here to <span className="text-[#4285F4]">help.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed text-depth-subheading">
            Our team is available across multiple channels to ensure you get the support you need, when you need it.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactMethods.map((method, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-8 md:p-10 rounded-[3rem] border transition-all duration-500 flex flex-col justify-between group soft-shadow",
                method.primary 
                  ? "bg-emerald-50/30 border-emerald-100/50 hover:border-emerald-300 ring-4 ring-emerald-500/5" 
                  : "bg-white border-slate-100 hover:border-[#4285F4]/30"
              )}
            >
              <div>
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", method.bg)}>
                  <method.icon size={32} className={method.color} />
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tighter leading-tight">{method.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{method.desc}</p>
                <p className="text-slate-900 font-black text-base md:text-lg mb-8 break-all">{method.value}</p>
              </div>

              <a 
                href={method.actionUrl}
                target={method.actionUrl.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={cn(
                  "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95",
                  method.primary 
                    ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600" 
                    : "bg-slate-900 text-white hover:bg-[#4285F4]"
                )}
              >
                {method.actionLabel}
                <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Relocated Main Office Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-[3rem] p-10 md:p-16 soft-shadow text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <MapPin size={32} className="text-rose-500" />
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black text-slate-950 mb-4 tracking-tighter">Main Office</h2>
          <p className="text-slate-500 font-medium text-sm md:text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Our headquarters located in the heart of the capital.
          </p>
          
          <div className="inline-block px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <p className="text-slate-900 font-black text-lg md:text-2xl tracking-tight">South Extension, New Delhi, India</p>
          </div>
        </motion.div>

        {/* Global Support Callout */}
        <div className="mt-32 pt-24 border-t border-slate-100 text-center">
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Support Connectivity</p>
          <p className="text-slate-900 font-bold text-xl md:text-2xl tracking-tight text-depth-subheading">24/7 Global Assistance | Career Journey Success Monitoring</p>
          <div className="mt-12 flex items-center justify-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <span className="text-sm font-bold text-emerald-600">Active Monitoring Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
