
import React from 'react';
import FeaturesCards from '../components/ui/feature-shader-cards';
import TextMarquee from '../components/ui/text-marque';
import { TestimonialStack, Testimonial } from '../components/ui/testimonial-stack';
import { TestimonialsSection } from '../components/ui/testimonials-with-marquee';
import { Users, UserCheck, MessageSquare, HardDrive } from 'lucide-react';
import { cn } from '../lib/utils';

export const Home: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const cccTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Shivani Gorade',
      role: 'Data Analyst',
      title: 'Super effective strategy.',
      content: 'Being a fresher, it is very difficult to get interview calls. But this LinkedIn Job Hunt Strategy is super effective. I am really happy with CCC’s service, and the cost of this service is totally worth it. I will definitely recommend it to all job seekers.',
      avatar: 'https://lh3.googleusercontent.com/d/1enryug_5Y-f3Y4mj96WOYu_3Sv2xpI_X',
      bgColor: 'bg-[#FF1694]',
      textColor: 'text-white'
    },
    {
      id: '2',
      name: 'Akash Puri',
      role: 'Data Engineer',
      title: 'Results went to another level.',
      content: 'I have 4 years of experience, and I was already getting some interview calls on my own. But after following CCC’s LinkedIn Job Hunt Strategy, the results went to another level. The guidance on profile positioning and smart applications is extremely effective. I started getting better-quality interview calls. Completely worth it.',
      avatar: 'https://lh3.googleusercontent.com/d/1-sw3tPutBmu_heODmD6YPR5pEJVEaDTG',
      bgColor: 'bg-[#FF4F01]',
      textColor: 'text-white'
    },
    {
      id: '3',
      name: 'Utkarsha Meshram',
      role: 'Data Analyst',
      title: 'Actual interview calls.',
      content: 'After applying what they taught, I started seeing actual interview calls. The support was one-to-one, and the service cost is absolutely justified. One of the best decisions during my job search.',
      avatar: 'https://lh3.googleusercontent.com/d/18Fb00KbzIE_oFpRKk-ECwiZAKSe_6PQj',
      bgColor: 'bg-[#F2E8CF]',
      textColor: 'text-slate-950'
    },
    {
      id: '4',
      name: 'Prasann Autade',
      role: 'Junior Java Developer',
      title: 'Approach completely changed.',
      content: 'Before CCC, I was applying randomly on LinkedIn. After learning their job hunt strategy, my approach completely changed. I started getting genuine interview calls. The service is honest and useful.',
      avatar: 'https://lh3.googleusercontent.com/d/1Ic8Kez_UB_Lpx6jGoKKF2O9omuRsurSM',
      bgColor: 'bg-[#4285F4]',
      textColor: 'text-white'
    },
    {
      id: '5',
      name: 'Gajanand Vagile',
      role: 'HR Analytics',
      title: 'Polite and cooperative team.',
      content: 'As a fresher, it was very difficult to get interview calls. CCC’s Job Hunting Strategy was super effective. They also helped with resume and LinkedIn optimization. The team is polite and cooperative.',
      avatar: 'https://lh3.googleusercontent.com/d/1n0q-BVb7VFE5n8Gdz9CAleFDkdkLNXb7',
      bgColor: 'bg-[#004242]',
      textColor: 'text-white'
    },
    {
      id: '6',
      name: 'Om Rathod',
      role: 'Data Engineer',
      title: 'Working at MuscleBlaze.',
      content: 'My job search was frustrating and affected my confidence. After joining CCC, things started changing. The team guided me properly, helped improve my resume and LinkedIn profile, and showed the right way to apply. I’m now working as a Data Engineer at MuscleBlaze.',
      avatar: 'https://lh3.googleusercontent.com/d/1iwPk1YNlnmkq6Rea4JM5TTZEk-U3amhL',
      bgColor: 'bg-[#FFD700]',
      textColor: 'text-slate-950'
    },
    {
      id: '7',
      name: 'Pushkar Bhangale',
      role: 'Full Stack Developer',
      title: 'Two offer letters.',
      content: 'The support from CCC was next level. I felt confident for every interview. The service worked for me, and I now have two offer letters. Thanks to the entire team.',
      avatar: 'https://lh3.googleusercontent.com/d/17Er9R8aoiGHeypS-MkvmxCA90h4GfAXR',
      bgColor: 'bg-emerald-500',
      textColor: 'text-white'
    },
    {
      id: '8',
      name: 'Suhani',
      role: 'Data Analyst Intern',
      title: 'Really works for freshers.',
      content: 'As a fresher, it’s very difficult to get internship opportunities. But this LinkedIn Job Hunt Strategy really works. The service cost is totally worth it.',
      avatar: 'https://lh3.googleusercontent.com/d/1tV6KViP7Q48KGYOiaG6MkkQNb9uiBUMM',
      bgColor: 'bg-slate-900',
      textColor: 'text-white'
    }
  ];

  const marqueeTestimonials = cccTestimonials.map(t => ({
    author: {
      name: t.name,
      handle: t.role,
      avatar: t.avatar
    },
    text: t.content
  }));

  return (
    <div className="animate-in fade-in duration-700 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-56 md:pb-32 hero-gradient relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-gray-100 bg-white text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 text-depth-callout">
            Engineered for Results
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-950 mb-8 max-w-5xl mx-auto leading-[0.9] text-depth-hero">
            Not getting interview calls? <br />
            <span className="text-[#4285F4]">CCC is here.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-depth-subheading">
            CCC helps freshers stop applying blindly and start getting real interview calls — with a proven, mentor-led system designed for high-conversion.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto bg-[#4285F4] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#3b78e7] transition-all shadow-2xl shadow-[#4285F4]/20 active:scale-95 text-depth-button"
            >
              Get Interview Calls
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-400 transition-all active:scale-95 soft-shadow text-depth-callout"
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-20 md:py-32 bg-[#05070a] text-white mx-4 md:mx-10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 soft-shadow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-6xl font-black mb-4 md:mb-8 tracking-tighter text-depth-heading leading-[0.95]">
                You’re not failing. <br />Your strategy is.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg text-depth-subheading">
                Sending more resumes into the void is not the answer. The system is designed to ignore generic applications.
              </p>
              <div className="inline-flex items-center gap-3 text-[#4285F4] font-bold text-lg">
                <span className="w-12 h-[2px] bg-[#4285F4]"></span>
                That’s exactly what we fix.
              </div>
            </div>
            
            <div className="grid gap-4 md:gap-6">
              {[
                "You apply daily. Nobody replies.",
                "LinkedIn Easy Apply leads nowhere.",
                "Your resume looks “fine” — but HR ignores it.",
                "No one shows you how hiring actually works."
              ].map((text, i) => (
                <div key={i} className="group flex items-center gap-6 p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#4285F4]/5 hover:border-[#4285F4]/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#4285F4]/20 flex items-center justify-center text-[#4285F4] font-black italic">
                    {i + 1}
                  </div>
                  <span className="text-base md:text-xl font-bold text-slate-200 tracking-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Transition */}
      <div className="py-20 md:py-32 opacity-20 hover:opacity-100 transition-opacity duration-500">
        <TextMarquee baseVelocity={-1.5} clasname="text-slate-950 tracking-tighter text-[10vw]">
          Stop applying blindly • Get noticed faster • Bypass the portals •
        </TextMarquee>
        <TextMarquee baseVelocity={1.5} clasname="text-[#4285F4] tracking-tighter text-[10vw]">
          Resume optimization • LinkedIn growth • HR outreach •
        </TextMarquee>
      </div>

      <FeaturesCards />

      {/* Testimonials Section - Standardized Gap */}
      <div className="pt-0 pb-0 md:pt-0 md:pb-0 overflow-hidden">
        {/* PC/Laptop View - TestimonialStack */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16 pt-32">
             <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-depth-heading">Student Success Stories</h2>
          </div>
          <div className="h-[700px] mb-32">
            <TestimonialStack testimonials={cccTestimonials} />
          </div>
        </div>

        {/* Mobile/Tablet View - Slider Testimonials */}
        <div className="lg:hidden">
          <TestimonialsSection 
            title="Student Success Stories"
            description="Real stories from graduates who leveraged the CCC system to land high-impact calls."
            testimonials={marqueeTestimonials}
          />
        </div>
      </div>

      {/* Guarantee Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-[#4285F4]/5 border border-[#4285F4]/10 rounded-[3rem] p-10 md:p-24 text-center soft-shadow relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#4285F4]/10 blur-[100px] rounded-full" />
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-8 tracking-tighter text-depth-heading">We don’t guess. We guarantee.</h2>
            <div className="text-lg md:text-2xl text-slate-600 font-medium mb-12 space-y-4">
              <p className="text-depth-subheading">Follow our system properly.</p>
              <p className="text-[#4285F4] font-black text-depth-subheading uppercase italic tracking-tight">If you don’t receive at least one interview call within 15 days, we refund your money.</p>
            </div>
            <button 
              onClick={() => onNavigate('pricing')}
              className="bg-black text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#4285F4] transition-all active:scale-95 shadow-2xl text-depth-button uppercase tracking-widest"
            >
              Start Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
