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
  Video,
  Database,
  X,
  FileCode,
  Info,
  Layout
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

interface StudentProfile {
  studentId: string;
  name: string;
  email: string;
  phone: string;
  resumeLink: string;
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getVimeoId = (url: string) => {
  const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const getGoogleDrivePreviewUrl = (url: string) => {
  const regExp = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return null;
};

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.includes('canva.com/design/')) {
    if (!trimmed.includes('?embed') && !trimmed.includes('&embed')) {
      const base = trimmed.split('?')[0];
      return `${base}/view?embed`;
    }
    return trimmed;
  }
  if (trimmed.includes('docs.google.com/document/d/')) {
    const docIdMatch = trimmed.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
    if (docIdMatch && docIdMatch[1]) {
      return `https://docs.google.com/document/d/${docIdMatch[1]}/preview`;
    }
  }
  return trimmed;
};

export const PortalPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ccc_portal_auth') === 'true';
  });
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [isLiveSheet, setIsLiveSheet] = useState<boolean>(() => {
    return localStorage.getItem('ccc_is_live_sheet') === 'true';
  });
  
  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('ccc_student_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [resumeUrlInput, setResumeUrlInput] = useState<string>('');
  const [showSheetsModal, setShowSheetsModal] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'modules' | 'resources' | 'canva'>('modules');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('ccc_completed_modules');
    return saved ? JSON.parse(saved) : [];
  });

  const [customLinks, setCustomLinks] = useState<SharedLink[]>(() => {
    const saved = localStorage.getItem('ccc_shared_links');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: '1',
        title: 'ATS-Friendly Google Docs Resume Template',
        url: 'https://docs.google.com/document/d/1t-8Z-w9jI03o3UeK8k7c7N-N1vX_0l0u/copy',
        description: 'Recruiter-optimized structural layouts matching single and double column specifications.',
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
      title: "Session 1: Resume Building",
      duration: "14:22",
      description: "First, watch the complete resume video. Then, edit your resume using the provided Canva template, exactly as explained. Even if it takes extra time, that’s completely okay, just make sure it’s done correctly and properly. Once your resume is ready, send it to CCC. Our team will review it and suggest corrections or improvements. Then you can move to Session 2.",
      videoUrl: "https://drive.google.com/file/d/1UPpmoOQogW-llI1a9W3Vi9kDKfjoL3GC/view?usp=sharing",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=640&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Session 2: LinkedIn Profile Optimization",
      duration: "18:45",
      description: "Watch the LinkedIn Profile Optimization video. Apply everything step by step to your LinkedIn profile. Spend sufficient time optimizing your LinkedIn profile properly. Again, quality matters more than speed.",
      videoUrl: "https://drive.google.com/file/d/1KD0z96AiaAPqs02KAoQ1DE8peDFQeuTu/view?usp=sharing",
      thumbnail: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=640&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Session 3: LinkedIn Job Hunt Strategy (Daily Work) 🔥",
      duration: "21:10",
      description: "This is the most important part of CCC. Watch the LinkedIn Job Hunt Strategy video very carefully. Do not skip any minute of the video. At the end of the video there is the most useful thing. This includes the exact steps of Job Hunt strategy and Chrome extension usage. Start applying using this strategy. This is not a one-day task—you need to work on this daily for best results. Once you start getting Interview calls, inform CCC immediately. We’ll guide you on this.",
      videoUrl: "https://drive.google.com/file/d/1vN9hL1tDbeeOwaCHXsmEC_telozT5FJV/view?usp=sharing",
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

  // Set the input field with current resume link on load
  useEffect(() => {
    if (profile?.resumeLink) {
      setResumeUrlInput(profile.resumeLink);
    } else {
      setResumeUrlInput('');
    }
  }, [profile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !password.trim()) {
      setAuthError('All fields are required.');
      return;
    }
    setIsLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          studentId: studentId.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setIsLiveSheet(!!data.isLiveSheet);
        localStorage.setItem('ccc_portal_auth', 'true');
        localStorage.setItem('ccc_is_live_sheet', data.isLiveSheet ? 'true' : 'false');
        
        const loadedProfile: StudentProfile = {
          studentId: data.student.studentId,
          name: data.student.name,
          email: data.student.email,
          phone: data.student.phone,
          resumeLink: data.student.resumeLink || ''
        };
        setProfile(loadedProfile);
        localStorage.setItem('ccc_student_profile', JSON.stringify(loadedProfile));

        const loadedModules: number[] = [];
        if (data.student.modules[0]) loadedModules.push(1);
        if (data.student.modules[1]) loadedModules.push(2);
        if (data.student.modules[2]) loadedModules.push(3);
        setCompletedModules(loadedModules);
        setAuthError('');
      } else {
        setAuthError((data.message || 'Login failed. Incorrect ID or password.') + (data.error ? ` Details: ${data.error}` : ''));
      }
    } catch (err: any) {
      setAuthError('Connection error. Please try again. Details: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !studentId.trim() || !email.trim() || !password.trim()) {
      setAuthError('All fields are required.');
      return;
    }
    setIsLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          studentId: studentId.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setIsLiveSheet(!!data.isLiveSheet);
        localStorage.setItem('ccc_portal_auth', 'true');
        localStorage.setItem('ccc_is_live_sheet', data.isLiveSheet ? 'true' : 'false');

        const loadedProfile: StudentProfile = {
          studentId: studentId.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          resumeLink: ''
        };
        setProfile(loadedProfile);
        localStorage.setItem('ccc_student_profile', JSON.stringify(loadedProfile));
        setCompletedModules([]);
        setAuthError('');
      } else {
        setAuthError((data.message || 'Registration failed.') + (data.error ? ` Details: ${data.error}` : ''));
      }
    } catch (err: any) {
      setAuthError('Connection error. Please try again. Details: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = () => {
    setIsAuthenticated(true);
    setIsLiveSheet(false);
    localStorage.setItem('ccc_portal_auth', 'true');
    localStorage.setItem('ccc_is_live_sheet', 'false');
    
    const loadedProfile: StudentProfile = {
      studentId: 'demo_user',
      name: 'Demo Student',
      email: 'demo@ccc.com',
      phone: '+61 412 345 678',
      resumeLink: 'https://canva.link/6l4zlfikcjs8owu'
    };
    setProfile(loadedProfile);
    localStorage.setItem('ccc_student_profile', JSON.stringify(loadedProfile));
    setCompletedModules([1]);
    setAuthError('');
  };

  const toggleCompleted = async (id: number) => {
    let updated: number[];
    if (completedModules.includes(id)) {
      updated = completedModules.filter(mId => mId !== id);
    } else {
      updated = [...completedModules, id];
    }
    setCompletedModules(updated);

    if (profile?.studentId && profile.studentId !== 'demo_user') {
      const modulesState = [1, 2, 3].map(mId => updated.includes(mId));
      try {
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sync',
            studentId: profile.studentId,
            modules: modulesState
          })
        });
      } catch (err) {
        console.error('Failed to sync progress:', err);
      }
    }
  };

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsLoading(true);

    const formattedUrl = resumeUrlInput.trim().startsWith('http://') || resumeUrlInput.trim().startsWith('https://')
      ? resumeUrlInput.trim()
      : `https://${resumeUrlInput.trim()}`;

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_resume',
          studentId: profile.studentId,
          resumeLink: formattedUrl
        })
      });

      const data = await res.json();
      if (data.success) {
        const updatedProfile = { ...profile, resumeLink: formattedUrl };
        setProfile(updatedProfile);
        localStorage.setItem('ccc_student_profile', JSON.stringify(updatedProfile));
        alert('Resume link successfully synchronized with database!');
      } else {
        alert(data.message || 'Failed to update resume link.');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error. Failed to save to spreadsheet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoPlayToggle = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    
    if (nextPlaying) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => console.log('Autoplay blocked:', err));
        }
      }, 50);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
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
    setIsLiveSheet(false);
    setProfile(null);
    localStorage.removeItem('ccc_portal_auth');
    localStorage.removeItem('ccc_is_live_sheet');
    localStorage.removeItem('ccc_student_profile');
    localStorage.removeItem('ccc_completed_modules');
    setCompletedModules([]);
    setStudentId('');
    setPassword('');
    setName('');
    setPhone('');
    setEmail('');
  };

  const progressPercentage = Math.round((completedModules.length / modules.length) * 100);

  // Lockscreen Auth View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#fcfcfc] px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-[#4285F4]/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#4285F4]/5 blur-[60px] rounded-full -z-10" />
          
          <div className="w-12 h-12 bg-[#4285F4]/10 rounded-2xl flex items-center justify-center text-[#4285F4] mx-auto mb-4">
            <Lock size={22} className="animate-pulse" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-900 text-center mb-1">Student Portal</h2>
          <p className="text-slate-400 text-center text-xs font-semibold mb-6 uppercase tracking-widest text-[8px]">Career Craft Consultancy Curriculum</p>

          <form 
            onSubmit={handleLogin} 
            className="space-y-4 text-left"
          >
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Student ID or Email</label>
              <input 
                type="text" 
                required
                placeholder="student@example.com" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-sm"
              />
            </div>

            {authError && (
              <p className="text-rose-500 font-bold text-xs px-1">{authError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4285F4] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#3b78e7] transition-all active:scale-[0.98] shadow-lg shadow-[#4285F4]/20 flex items-center justify-center"
            >
              {isLoading ? 'Unlocking...' : 'Unlock Portal'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const youtubeId = getYoutubeId(activeModule.videoUrl);
  const vimeoId = getVimeoId(activeModule.videoUrl);
  const drivePreviewUrl = getGoogleDrivePreviewUrl(activeModule.videoUrl);

  // Dashboard Main View
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Dashboard section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/15 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={10} className="animate-pulse" /> CCC Career Academy
              </span>
              <span 
                className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified Student
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Job Hunt Curriculum</h1>
            {profile && (
              <p className="text-slate-500 text-sm font-semibold mt-2">
                Student: <span className="text-slate-800 font-black">{profile.name}</span> (ID: {profile.studentId}) | Email: {profile.email} | Phone: {profile.phone}
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="self-start text-xs text-slate-400 font-black tracking-widest uppercase hover:text-rose-500 transition-colors border border-slate-200 px-4 py-2 rounded-xl bg-white hover:bg-rose-50/20"
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
              <p className="text-slate-400 text-sm font-semibold">{completedModules.length} of {modules.length} sessions completed</p>
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
            2. Resources
          </button>
          <button
            onClick={() => setActiveTab('canva')}
            className={`pb-4 text-xs font-black tracking-widest uppercase outline-none transition-all border-b-2 relative ${
              activeTab === 'canva' ? 'text-[#4285F4] border-[#4285F4]' : 'text-slate-400 border-transparent hover:text-slate-900'
            }`}
          >
            3. Canva Template
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
                  {isPlaying ? (
                    youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                        className="w-full h-full border-0 absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : vimeoId ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                        className="w-full h-full border-0 absolute inset-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : drivePreviewUrl ? (
                      <iframe
                        src={drivePreviewUrl}
                        className="w-full h-full border-0 absolute inset-0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        src={activeModule.videoUrl}
                        className="w-full h-full object-cover absolute inset-0"
                        onClick={handleVideoPlayToggle}
                        preload="auto"
                        autoPlay
                        controls
                      />
                    )
                  ) : (
                    <div 
                      className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 bg-cover bg-center cursor-pointer"
                      style={{ 
                        backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.4)), url(${activeModule.thumbnail})` 
                      }}
                      onClick={handleVideoPlayToggle}
                    >
                      <div className="self-end px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-xs font-bold text-slate-300">
                        {activeModule.duration}
                      </div>

                      <div 
                        className="flex items-center justify-center flex-grow"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoPlayToggle();
                        }}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 bg-[#4285F4] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#4285F4]/40 z-30 transition-transform duration-300"
                        >
                          <Play fill="currentColor" className="ml-1.5" size={28} />
                        </motion.div>
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase text-[#4285F4] tracking-[0.2em]">Session {activeModule.id}</span>
                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">{activeModule.title}</h2>
                      </div>
                    </div>
                  )}

                  {isPlaying && !youtubeId && !vimeoId && (
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

                {/* Module Details Card */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#4285F4] tracking-[0.2em]">Active Session</span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1">{activeModule.title}</h2>
                    </div>
                    
                    <button
                      onClick={() => toggleCompleted(activeModule.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all self-start sm:self-auto ${
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

                {/* Personal Student-Specific Resume URL Card */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                        My Drafts
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Student-Specific File</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg leading-snug">Personal Resume Workspace</h4>
                    {profile?.resumeLink ? (
                      <p className="text-xs text-slate-500 font-semibold truncate max-w-md">
                        Linked to: <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline font-bold flex inline-flex items-center gap-1">{profile.resumeLink} <ExternalLink size={10} /></a>
                      </p>
                    ) : (
                      <p className="text-xs text-amber-500 font-bold">
                        ⚠️ No resume link added yet. Paste your Google Doc link below.
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleUpdateResume} className="flex items-center gap-3 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Paste Google Doc / Resume link"
                      value={resumeUrlInput}
                      onChange={(e) => setResumeUrlInput(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] w-full md:w-60"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#4285F4] text-white hover:bg-[#3b78e7] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap active:scale-[0.98] shadow-md shadow-[#4285F4]/10"
                    >
                      {profile?.resumeLink ? 'Update' : 'Link File'}
                    </button>
                  </form>
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
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Session {m.id}</span>
                            <h5 className="font-bold text-slate-900 leading-tight mt-0.5">{m.title.replace(`Session ${m.id}: `, '')}</h5>
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
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase tracking-wide">Document Swipe Library</h3>
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
                    {customLinks.length} Resources Shared
                  </span>
                </div>

                <div className="grid gap-4">
                  {/* Canva template section (mentor-assigned) */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50/50 border border-purple-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-3">
                        <span className="bg-purple-100 text-purple-700 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                          Canva Template
                        </span>
                        <span className="text-purple-300 font-light">|</span>
                        <span className="text-[10px] text-purple-600 font-black uppercase tracking-wider">Mentor Assigned</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg leading-snug">Personal Canva Resume Template</h4>
                      {profile?.resumeLink ? (
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          Your custom Canva Resume Template has been shared by your mentor! Use this layout exactly as explained in Session 1.
                        </p>
                      ) : (
                        <p className="text-xs text-amber-600 leading-relaxed font-bold">
                          ⚠️ Your Canva template has not been linked yet. Your mentor will update it here in your portal once they review your profile.
                        </p>
                      )}
                    </div>
                    
                    {profile?.resumeLink && (
                      <button
                        onClick={() => window.open(profile.resumeLink, '_blank')}
                        className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-md shadow-purple-600/10 active:scale-[0.98] self-start md:self-auto"
                      >
                        <ExternalLink size={12} />
                        Edit in Canva
                      </button>
                    )}
                  </div>

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

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#4285F4]/5 to-indigo-50/50 border border-[#4285F4]/10 rounded-2xl p-6 shadow-sm">
                  <h5 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <Calendar size={16} className="text-[#4285F4]" />
                    Book 1-on-1 Review
                  </h5>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
                    Optimize your LinkedIn headlines and review your drafts live with your mentor Zoom link.
                  </p>
                  <button 
                    onClick={() => window.open('https://calendly.com', '_blank')}
                    className="w-full bg-[#4285F4] text-white hover:bg-[#3b78e7] py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#4285F4]/10 active:scale-[0.98]"
                  >
                    Schedule Call <ExternalLink size={10} />
                  </button>
                </div>

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

          {activeTab === 'canva' && (
            <motion.div
              key="canva-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-700 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                      Canva Template Workspace
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Workspace</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg leading-snug">Personal Canva Resume Template</h4>
                  {profile?.resumeLink ? (
                    <p className="text-xs text-slate-500 font-semibold truncate max-w-xl">
                      Template URL: <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline font-bold inline-flex items-center gap-1">{profile.resumeLink} <ExternalLink size={10} /></a>
                    </p>
                  ) : (
                    <p className="text-xs text-amber-500 font-bold">
                      ⚠️ No Canva template link assigned to your profile yet.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  {profile?.resumeLink && (
                    <button
                      onClick={() => window.open(profile.resumeLink, '_blank')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap active:scale-[0.98] shadow-md shadow-purple-600/10 flex items-center gap-1.5"
                    >
                      <ExternalLink size={12} /> Open in Canva
                    </button>
                  )}
                </div>
              </div>

              {/* Embedding Canva iframe view */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Interactive Resume View</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Edit in Canva and watch the live preview synchronize below.</p>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
                    Real-time Embed
                  </div>
                </div>

                {profile?.resumeLink ? (
                  <div className="w-full aspect-[4/3] bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden relative shadow-inner flex flex-col items-center justify-center">
                    <iframe 
                      src={getEmbedUrl(profile.resumeLink)} 
                      className="w-full h-full border-none rounded-3xl"
                      allowFullScreen
                      title="Canva Resume Template Preview"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl text-[10px] text-slate-300 font-semibold flex items-center justify-between pointer-events-none">
                      <span>If your template doesn't render, open it directly using the button above.</span>
                      <span className="font-black text-white">Canva Workspace</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-3">
                      <Layout size={20} />
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">No Template Assigned</h5>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">Once your mentor links your Canva Resume Template inside the Google Sheet database, it will display here automatically.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Google Sheets Live Integration Configuration Modal */}
      <AnimatePresence>
        {false && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[500] flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] w-full max-w-2xl shadow-2xl p-6 md:p-10 relative overflow-y-auto max-h-[85vh]"
            >
              <button 
                onClick={() => setShowSheetsModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Database size={22} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">Google Sheets Integration Guide</h3>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Automate student logins and progress tracking</p>
                </div>
              </div>

              <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/50">
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Info size={14} className="text-[#4285F4]" /> Current Status: {isLiveSheet ? '🟢 Active' : '🟡 Mock Mode'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    {isLiveSheet 
                      ? 'The portal is currently communicating with your active Google Spreadsheet. Registration, login details, progress states, and resume workspace URLs are being saved directly in the sheet!'
                      : 'Running in local sandbox mock mode. Actions will save in active browser storage. To hook up your real Spreadsheet, follow the steps below:'
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-slate-950 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-bold text-slate-950 text-sm">Create your Spreadsheet</h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Create a blank Google Sheet and name the first tab index <strong>"Students"</strong>. Set up these exact headers in Row 1 (A to J):
                      </p>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2 font-mono text-[9px] text-slate-700 select-all overflow-x-auto">
                        Student ID | Name | Email | Phone | Password | Module 1 | Module 2 | Module 3 | Last Active | Resume Link
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-slate-950 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                    <div className="w-full">
                      <h5 className="font-bold text-slate-950 text-sm">Paste Apps Script Web App Code</h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Click on <strong>Extensions &gt; Apps Script</strong>. Replace the empty editor code with the following snippet:
                      </p>
                      <div className="bg-slate-950 p-4 rounded-xl mt-2 font-mono text-[9px] text-slate-300 max-h-40 overflow-y-auto select-all relative group">
                        <pre>{`function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Students") || ss.getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  var action = data.action;
  var rows = sheet.getDataRange().getValues();
  
  if (action === 'register') {
    for (var i = 1; i < rows.length; i++) {
      var cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
      var cellEmail = rows[i][2] ? rows[i][2].toString().trim().toLowerCase() : "";
      
      if ((cellId && cellId === data.studentId.toString().trim().toLowerCase()) ||
          (cellEmail && cellEmail === data.email.toString().trim().toLowerCase())) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Student ID or Email already exists.' })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    sheet.appendRow([data.studentId, data.name, data.email, data.phone, data.password, false, false, false, new Date(), '']);
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Registered.' })).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'login') {
    for (var i = 1; i < rows.length; i++) {
      var cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
      var cellEmail = rows[i][2] ? rows[i][2].toString().trim().toLowerCase() : "";
      var targetId = data.studentId.toString().trim().toLowerCase();
      
      if ((cellId && cellId === targetId) || (cellEmail && cellEmail === targetId)) {
        if (rows[i][4].toString() === data.password.toString()) {
          sheet.getRange(i + 1, 9).setValue(new Date());
          return ContentService.createTextOutput(JSON.stringify({
            success: true,
            student: { studentId: rows[i][0], name: rows[i][1], email: rows[i][2], phone: rows[i][3], modules: [rows[i][5] === true, rows[i][6] === true, rows[i][7] === true], resumeLink: rows[i][9] || '' }
          })).setMimeType(ContentService.MimeType.JSON);
        } else {
          return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Incorrect password.' })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Student not found.' })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'sync') {
    for (var i = 1; i < rows.length; i++) {
      var cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
      if (cellId && cellId === data.studentId.toString().trim().toLowerCase()) {
        sheet.getRange(i + 1, 6).setValue(data.modules[0]);
        sheet.getRange(i + 1, 7).setValue(data.modules[1]);
        sheet.getRange(i + 1, 8).setValue(data.modules[2]);
        sheet.getRange(i + 1, 9).setValue(new Date());
        return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  if (action === 'update_resume') {
    for (var i = 1; i < rows.length; i++) {
      var cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
      if (cellId && cellId === data.studentId.toString().trim().toLowerCase()) {
        sheet.getRange(i + 1, 10).setValue(data.resumeLink);
        sheet.getRange(i + 1, 9).setValue(new Date());
        return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
      }
    }
  }
}`}</pre>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-slate-950 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-bold text-slate-950 text-sm">Deploy Web App & Save URL</h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        In Apps Script, click <strong>Deploy &gt; New Deployment</strong>. Select <strong>Web App</strong>, set "Execute as" to <strong>Me</strong>, set "Who has access" to <strong>Anyone</strong>, and deploy. Copy the Web App URL.
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5">
                        Add this URL to your Vercel project environment variables as:
                      </p>
                      <code className="block bg-slate-50 p-2 rounded-xl text-xs text-[#4285F4] font-black border border-slate-100 mt-1">
                        GOOGLE_SCRIPT_URL = [Your_Web_App_Url]
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
