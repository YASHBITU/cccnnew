import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  Download, 
  Link as LinkIcon, 
  Calendar, 
  Lock, 
  ChevronRight, 
  FileText, 
  ExternalLink,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Video
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

interface SharedLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
}

export const PortalPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ccc_portal_auth') === 'true';
  });
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'modules' | 'resources' | 'booking'>('modules');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('ccc_completed_modules');
    return saved ? JSON.parse(saved) : [];
  });

  const [customLinks, setCustomLinks] = useState<SharedLink[]>(() => {
    const saved = localStorage.getItem('ccc_shared_links');
    if (saved) return JSON.parse(saved);
    
    // Default shared links
    return [
      {
        id: '1',
        title: 'ATS-Friendly Google Docs Resume Template',
        url: 'https://docs.google.com/document/d/1t-8Z-w9jI03o3UeK8k7c7N-N1vX_0l0u/copy',
        description: 'Clean, double-column and single-column structures engineered for recruiter readability and automatic scanner compatibility.',
        category: 'Templates'
      },
      {
        id: '2',
        title: 'LinkedIn Positioning & Outreach Swipe File',
        url: 'https://docs.google.com/spreadsheets/d/1X-uG9-N0T5p3c0eK9k7c7N-N1vX_0l0u/copy',
        description: 'Ready-to-use template messages, connection request scripts, and email follow-ups for cold networking.',
        category: 'Swipe Files'
      },
      {
        id: '3',
        title: '15-Day Job Search Action Matrix Checklist',
        url: 'https://docs.google.com/spreadsheets/d/1g-H9-N0T5p3c0eK9k7c7N-N1vX_0l0u/copy',
        description: 'A day-by-day step matrix mapping exactly how to perform targeted applications and check tasks.',
        category: 'Guides'
      }
    ];
  });

  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkDesc, setNewLinkDesc] = useState('');
  const [newLinkCategory, setNewLinkCategory] = useState('Templates');

  // Video Playing States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Modules List
  const modules: Module[] = [
    {
      id: 1,
      title: "Module 1: The ATS Resume Blueprint",
      duration: "14:22",
      description: "Learn how to structure your resume to bypass algorithmic scanners (ATS). We cover core keywords alignment, formatting templates, and metrics-driven experience bullet formulations.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41793-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=640&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Module 2: LinkedIn Magnet Checklist & Positioning",
      duration: "18:45",
      description: "Optimize your profile to attract inbound recruiter queries. Master headlines, summaries that convert, structural setups, and creating strategic posts that highlight engineering value.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-41785-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=640&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Module 3: Direct HR Outreach System & Swipes",
      duration: "21:10",
      description: "Stop submitting portals and directly pitch decision-makers. Build your database of recruiters, schedule outreach messages, handle follow-ups, and convert connections to screening calls.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-developer-typing-on-a-keyboard-40618-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=640&auto=format&fit=crop"
    }
  ];

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  useEffect(() => {
    // Reset video playing state when changing modules
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeModuleId]);

  useEffect(() => {
    localStorage.setItem('ccc_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('ccc_shared_links', JSON.stringify(customLinks));
  }, [customLinks]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret passcode: CCC2026 or welcome
    if (passcode.trim().toUpperCase() === 'CCC2026' || passcode.trim().toLowerCase() === 'demo') {
      setIsAuthenticated(true);
      localStorage.setItem('ccc_portal_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Use "CCC2026" or click "Quick Demo Preview".');
    }
  };

  const handleDemoAccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('ccc_portal_auth', 'true');
    setAuthError('');
  };

  const toggleCompleted = (id: number) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter(mId => mId !== id));
    } else {
      setCompletedModules([...completedModules, id]);
    }
  };

  const handleVideoPlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;

    const formattedUrl = newLinkUrl.startsWith('http://') || newLinkUrl.startsWith('https://') 
      ? newLinkUrl 
      : `https://${newLinkUrl}`;

    const newLink: SharedLink = {
      id: Date.now().toString(),
      title: newLinkTitle,
      url: formattedUrl,
      description: newLinkDesc || 'User uploaded resource link.',
      category: newLinkCategory
    };

    setCustomLinks([newLink, ...customLinks]);
    setNewLinkTitle('');
    setNewLinkUrl('');
    setNewLinkDesc('');
  };

  const handleDeleteLink = (id: string) => {
    setCustomLinks(customLinks.filter(l => l.id !== id));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ccc_portal_auth');
  };

  const progressPercentage = Math.round((completedModules.length / modules.length) * 100);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#fcfcfc] px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-[#4285F4]/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#4285F4]/5 blur-[60px] rounded-full -z-10" />
          
          <div className="w-16 h-16 bg-[#4285F4]/10 rounded-3xl flex items-center justify-center text-[#4285F4] mx-auto mb-6">
            <Lock size={28} className="animate-pulse" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Student Portal</h2>
          <p className="text-slate-400 text-sm font-semibold mb-8 uppercase tracking-widest text-[9px]">Career Craft Consultancy Curriculum</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter Access Key (e.g. CCC2026)" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-900 font-bold text-center placeholder:text-slate-400 focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
              />
            </div>

            {authError && (
              <p className="text-rose-500 font-bold text-xs text-left px-2">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#4285F4] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#3b78e7] transition-all active:scale-[0.98] shadow-lg shadow-[#4285F4]/20"
            >
              Unlock Access
            </button>
          </form>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-slate-400 uppercase font-black tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <button
            onClick={handleDemoAccess}
            className="w-full bg-slate-50 text-slate-700 py-4 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-200/60 active:scale-[0.98]"
          >
            Quick Demo Preview
          </button>

          <p className="text-[10px] text-gray-400 font-medium mt-6">
            If you are a student and lost your credentials, please contact support.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Dashboard section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <Sparkles size={10} /> Active Student Academy
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Job Hunt Curriculum</h1>
            <p className="text-slate-500 font-medium mt-1">Unlock modules, grab recruiters outreach templates, and build your resume.</p>
          </div>

          <button
            onClick={handleLogout}
            className="self-start md:self-auto text-xs text-slate-400 font-black tracking-widest uppercase hover:text-rose-500 transition-colors border border-slate-200 px-4 py-2 rounded-xl bg-white hover:bg-rose-50/20"
          >
            Exit Portal
          </button>
        </div>

        {/* Course Progress Dashboard Card */}
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-100 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#4285F4]/20 to-[#3b78e7]/10 rounded-2xl flex items-center justify-center text-[#4285F4]">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Course Completion</h3>
              <p className="text-slate-400 text-sm font-semibold">{completedModules.length} of {modules.length} modules completed</p>
            </div>
          </div>

          <div className="flex-grow max-w-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>PROGRESS</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#4285F4] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Tab system navigation */}
        <div className="flex border-b border-slate-200/80 gap-6 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('modules')}
            className={`pb-4 text-xs font-black tracking-widest uppercase outline-none transition-all border-b-2 relative ${
              activeTab === 'modules' ? 'text-[#4285F4] border-[#4285F4]' : 'text-slate-400 border-transparent hover:text-slate-900'
            }`}
          >
            1. Videos & Lectures
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-4 text-xs font-black tracking-widest uppercase outline-none transition-all border-b-2 relative ${
              activeTab === 'resources' ? 'text-[#4285F4] border-[#4285F4]' : 'text-slate-400 border-transparent hover:text-slate-900'
            }`}
          >
            2. Resources & Shared Links
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`pb-4 text-xs font-black tracking-widest uppercase outline-none transition-all border-b-2 relative ${
              activeTab === 'booking' ? 'text-[#4285F4] border-[#4285F4]' : 'text-slate-400 border-transparent hover:text-slate-900'
            }`}
          >
            3. Book 1-on-1 Review
          </button>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'modules' && (
            <motion.div
              key="modules-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Left Column: Video Player & Synopsis */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-950 border border-slate-900 rounded-[2.5rem] overflow-hidden relative shadow-2xl group flex items-center justify-center aspect-video">
                  
                  {/* Real video player implementation */}
                  <video
                    ref={videoRef}
                    src={activeModule.videoUrl}
                    className="w-full h-full object-cover"
                    onClick={handleVideoPlayToggle}
                    preload="auto"
                  />

                  {/* HTML5 video placeholder banner if not playing */}
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent cursor-pointer"
                      onClick={handleVideoPlayToggle}
                    >
                      <div className="self-end px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-xs font-bold text-slate-300">
                        {activeModule.duration}
                      </div>

                      <div className="flex items-center justify-center flex-grow">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 bg-[#4285F4] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#4285F4]/40 z-30 transition-transform duration-300"
                        >
                          <Play fill="currentColor" className="ml-1.5" size={28} />
                        </motion.div>
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase text-[#4285F4] tracking-[0.2em]">Module {activeModule.id}</span>
                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">{activeModule.title}</h2>
                      </div>
                    </div>
                  )}

                  {/* Quick video playback helper info */}
                  {isPlaying && (
                    <div className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={handleVideoPlayToggle}
                        className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl text-xs font-bold text-white hover:bg-slate-800"
                      >
                        Pause Video
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#4285F4] tracking-[0.2em]">Active Module</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1">{activeModule.title}</h2>
                    </div>
                    
                    <button
                      onClick={() => toggleCompleted(activeModule.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                        completedModules.includes(activeModule.id)
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <CheckCircle size={14} />
                      {completedModules.includes(activeModule.id) ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{activeModule.description}</p>
                </div>
              </div>

              {/* Right Column: Module playlist navigation */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.25em] px-2">Lecture Playlist</h4>
                
                <div className="space-y-3">
                  {modules.map((m) => {
                    const isSelected = m.id === activeModuleId;
                    const isCompleted = completedModules.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => setActiveModuleId(m.id)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 outline-none ${
                          isSelected
                            ? 'bg-white border-[#4285F4] shadow-md shadow-[#4285F4]/5 ring-1 ring-[#4285F4]'
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-[#4285F4]/10 text-[#4285F4]' : 'bg-slate-50 text-slate-400'
                          }`}>
                            <Video size={18} />
                          </div>
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Module {m.id}</span>
                            <h5 className="font-bold text-slate-900 leading-tight mt-0.5">{m.title.replace(`Module ${m.id}: `, '')}</h5>
                            <span className="text-[10px] font-medium text-slate-400">{m.duration} mins</span>
                          </div>
                        </div>

                        {isCompleted && (
                          <div className="text-emerald-500 bg-emerald-50 p-1 rounded-full flex-shrink-0 mt-0.5">
                            <CheckCircle size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#4285F4]/5 border border-[#4285F4]/10 rounded-2xl p-5 mt-6">
                  <h5 className="font-bold text-slate-900 text-sm mb-1">Need help with templates?</h5>
                  <p className="text-xs text-slate-500 mb-3">Head over to the Resources tab to duplicate our custom Google Docs and swipe files.</p>
                  <button 
                    onClick={() => setActiveTab('resources')}
                    className="text-xs text-[#4285F4] font-bold flex items-center gap-1 hover:underline"
                  >
                    Go to Resources <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Left 2 Columns: Shared Links list */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase tracking-wide">Document Swipe Library</h3>
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
                    {customLinks.length} Resources Shared
                  </span>
                </div>

                <div className="grid gap-4">
                  {customLinks.map((link) => (
                    <div 
                      key={link.id} 
                      className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#4285F4]/10 text-[#4285F4] text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                            {link.category}
                          </span>
                          <span className="text-slate-300 font-light">|</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Shared Resource</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg leading-snug">{link.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{link.description}</p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0 self-start md:self-auto">
                        <button
                          onClick={() => window.open(link.url, '_blank')}
                          className="flex items-center gap-2 bg-slate-950 text-white hover:bg-[#4285F4] px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                        >
                          <Download size={12} />
                          Open Link
                        </button>

                        {/* Allow user to delete manually added custom links */}
                        {parseInt(link.id) > 10 && (
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-3 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50/20 border border-slate-100 rounded-xl transition-all"
                            title="Remove link"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Share a new Link panel */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-black text-slate-900 text-md uppercase tracking-wider mb-2 flex items-center gap-2">
                    <LinkIcon size={16} className="text-[#4285F4]" />
                    Share a Link / Bookmark
                  </h4>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                    Need to bookmark a resource or share an application portal? Add custom items below to build your custom job-hunt folder.
                  </p>

                  <form onSubmit={handleAddLink} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Resource Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. My Target Companies Spreadsheet"
                        value={newLinkTitle}
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Destination URL *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. drive.google.com/..."
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
                      <select
                        value={newLinkCategory}
                        onChange={(e) => setNewLinkCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                      >
                        <option value="Templates">Templates</option>
                        <option value="Swipe Files">Swipe Files</option>
                        <option value="Guides">Guides</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Description (Optional)</label>
                      <textarea 
                        placeholder="Provide details about this folder or link..."
                        value={newLinkDesc}
                        onChange={(e) => setNewLinkDesc(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#4285F4] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#3b78e7] transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-md shadow-[#4285F4]/10"
                    >
                      <Plus size={14} /> Add to Library
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'booking' && (
            <motion.div
              key="booking-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#4285F4]/5 blur-[80px] rounded-full -z-10" />

                <div className="w-14 h-14 bg-[#4285F4]/10 text-[#4285F4] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar size={24} />
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-2">Book Your 1-on-1 Review Session</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-medium leading-relaxed">
                  As part of your active enrollment, you get one-on-one session access with your mentor to dissect your resume drafts and optimize headlines live.
                </p>

                <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">1</div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed">Finalize your Module 1 Resume Draft first.</p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">2</div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed">Choose a timeslot using the live calendar below.</p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">3</div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed">Our mentor will review and optimize your profile layout live via Zoom.</p>
                  </div>
                </div>

                <button
                  onClick={() => window.open('https://calendly.com', '_blank')}
                  className="bg-[#4285F4] text-white px-8 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#3b78e7] transition-all active:scale-[0.98] shadow-xl shadow-[#4285F4]/20 flex items-center justify-center gap-2 mx-auto"
                >
                  <Calendar size={14} />
                  Access Calendly Scheduler <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
