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
  Info
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

  const [activeTab, setActiveTab] = useState<'modules' | 'resources' | 'booking'>('modules');
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
        setAuthError(data.message || 'Login failed. Incorrect ID or password.');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
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
        setAuthError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
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
      resumeLink: 'https://docs.google.com/document/d/1t-8Z-w9jI03o3UeK8k7c7N-N1vX_0l0u/copy'
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

          <AnimatePresence mode="wait">
            {!isRegisterMode ? (
              <motion.form 
                key="login-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
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
              </motion.form>
            ) : (
              <motion.form 
                key="register-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleRegister} 
                className="space-y-3 text-left"
              >
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Student ID (Custom)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="CCC-101" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Phone Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="+61 400 000 000" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="student@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Password</label>
                  <input 
                    type="password" 
                    required
                    placeholder="Set Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-950 font-semibold focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all text-xs"
                  />
                </div>

                {authError && (
                  <p className="text-rose-500 font-bold text-xs px-1">{authError}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4285F4] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#3b78e7] transition-all active:scale-[0.98] shadow-lg shadow-[#4285F4]/20 flex items-center justify-center"
                >
                  {isLoading ? 'Registering...' : 'Register & Log In'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setAuthError('');
              }}
              className="text-xs text-[#4285F4] font-bold hover:underline"
            >
              {isRegisterMode ? 'Already have an account? Log In' : "Don't have an account? Register"}
            </button>
          </div>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-3 text-[9px] text-slate-400 uppercase font-black tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <button
            onClick={handleDemoAccess}
            className="w-full bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all border border-slate-200/60 active:scale-[0.98]"
          >
            Quick Demo Preview
          </button>
        </motion.div>
      </div>
    );
  }

  // Dashboard Main View
  return (
    <div className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Dashboard section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] rounded-full text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={10} /> Active Student Academy
              </div>
              <button 
                onClick={() => setShowSheetsModal(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                  isLiveSheet 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLiveSheet ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                {isLiveSheet ? 'Google Sheet Active' : 'Sheets: Mock Mode (Setup)'}
              </button>
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
                  <video
                    ref={videoRef}
                    src={activeModule.videoUrl}
                    className="w-full h-full object-cover"
                    onClick={handleVideoPlayToggle}
                    preload="auto"
                  />

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

                {/* Module Details Card */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#4285F4] tracking-[0.2em]">Active Module</span>
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

      {/* Google Sheets Live Integration Configuration Modal */}
      <AnimatePresence>
        {showSheetsModal && (
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
