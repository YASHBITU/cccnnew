import React, { useState, useEffect, useRef } from "react";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Pause,
  Play,
} from "lucide-react";

const topProofs = [
  {
    id: 1,
    src: "https://i.postimg.cc/Vv9k3QhC/sairaj-selection-in-axion-ray.png",
    title: "Final Selection Offer at Axion Ray",
    tag: "Offer Letter",
  },
  {
    id: 2,
    src: "https://i.postimg.cc/yNVMhpfv/4-AUG-INFOSIS.png",
    title: "Infosys AI Role Screening Invitation",
    tag: "Enterprise Interview",
  },
  {
    id: 3,
    src: "https://i.postimg.cc/d3sCJMGx/Priya-desai-soc-analyst-22-aug.png",
    title: "CyberNova Solutions SOC Analyst",
    tag: "Interview Confirmation",
  },
  {
    id: 4,
    src: "https://i.postimg.cc/sXZFxfZ0/24-AUG.png",
    title: "UST Global Technical Round Invite",
    tag: "Calendar Invite",
  },
  {
    id: 5,
    src: "https://i.postimg.cc/MK0y430P/26-JULY.png",
    title: "VISCR AI Bengaluru In-Person Coding Round",
    tag: "In-Person Round",
  },
  {
    id: 6,
    src: "https://i.postimg.cc/T16Nnjh3/Sairaj-bhavsar.png",
    title: "Axion Ray Technical Assessment Call",
    tag: "Round 1 Call",
  },
  {
    id: 7,
    src: "https://i.postimg.cc/m2HqmXz1/rohan-salve-18-july.png",
    title: "Data Analyst Trainee at Ededge",
    tag: "Interview Call",
  },
  {
    id: 8,
    src: "https://i.postimg.cc/fLR9RHmx/812-vikram.png",
    title: "Accenture Round 1 Cleared",
    tag: "Advancing to Round 2",
  },
  {
    id: 9,
    src: "https://i.postimg.cc/ry5N3GcK/15-JULY-2026-INTERVIEW-CALL.jpg",
    title: "CGI Python Developer Interview",
    tag: "Interview Scheduled",
  },
  {
    id: 10,
    src: "https://i.postimg.cc/50zxChC8/2-sep.png",
    title: "Technical Screening Call Booked",
    tag: "Recruiter Booking",
  },
];

export default function ProofSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || lightboxOpen) return;
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topProofs.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, lightboxOpen, currentIndex]);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + topProofs.length) % topProofs.length);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % topProofs.length);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    setTouchStartX(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const activeProof = topProofs[currentIndex];

  return (
    <section className="relative overflow-hidden bg-[#08080a] py-16 md:py-24 text-[#f2f4f7]">
      {/* Cobalt glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[450px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full opacity-[0.14] blur-[140px]"
        style={{ background: "#2F6BFF" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1180px] px-4 relative text-center">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[#8c93a0]">
          Verified Candidate Proofs
        </div>

        <h2 className="mx-auto mt-6 max-w-[18ch] text-[2rem] sm:text-[2.6rem] md:text-[3.25rem] font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#c9ced6] to-[#7d838c]">
          Proof in the inbox.
        </h2>

        <p className="mx-auto mt-4 max-w-[56ch] text-sm sm:text-base text-[#8c93a0]">
          Real interview invitations, screening confirmations, and selection emails received by candidates.
        </p>

        {/* Slideshow Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="mx-auto mt-10 w-full max-w-[980px] rounded-[24px] sm:rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 sm:p-7 md:p-8 text-left shadow-[0_50px_130px_-60px_rgba(47,107,255,0.85)] backdrop-blur-xl"
        >
          {/* Control Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#3ddc84] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#e3e7ed] font-semibold">
                {activeProof.tag}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-[#8c93a0] hover:text-white transition-colors cursor-pointer"
              >
                {isPaused ? (
                  <><Play className="h-3 w-3 text-[#2F6BFF]" /> Paused</>
                ) : (
                  <><Pause className="h-3 w-3 text-[#3ddc84]" /> Auto-Rotating (3s)</>
                )}
              </button>
              <span className="font-mono text-xs text-[#8c93a0]">
                <span className="text-white font-bold">0{currentIndex + 1}</span> / 10
              </span>
            </div>
          </div>

          {/* Screenshot area */}
          <div className="relative mt-4 sm:mt-6 group select-none">
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[250px] sm:min-h-[380px] md:min-h-[500px] w-full overflow-hidden rounded-[18px] sm:rounded-[22px] border border-white/10 bg-[#070a10] cursor-pointer shadow-inner flex items-center justify-center p-2 sm:p-4"
            >
              <img
                key={activeProof.id}
                src={activeProof.src}
                alt={activeProof.title}
                className="h-full w-full object-contain rounded-lg transition-all duration-700 animate-fadeIn"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0d1117] shadow-xl">
                  <ZoomIn className="h-4 w-4 text-[#2F6BFF]" /> Tap to Inspect Full Size
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-[#101014]/90 text-white backdrop-blur-md hover:bg-[#2F6BFF] hover:border-[#2F6BFF] transition-all shadow-xl active:scale-95 cursor-pointer"
              aria-label="Previous proof"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-[#101014]/90 text-white backdrop-blur-md hover:bg-[#2F6BFF] hover:border-[#2F6BFF] transition-all shadow-xl active:scale-95 cursor-pointer"
              aria-label="Next proof"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Bottom bar */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-sm sm:text-base text-[#e3e7ed] font-medium truncate">
              {activeProof.title}
            </p>
            <div className="flex items-center gap-1 sm:gap-1.5 self-center sm:self-auto">
              {topProofs.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 sm:w-8 bg-[#2F6BFF] shadow-[0_0_10px_rgba(47,107,255,0.8)]"
                      : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to proof ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3.5 sm:mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              key={currentIndex + (isPaused ? "-paused" : "-active")}
              className={`h-full bg-[#2F6BFF] rounded-full ${
                !isPaused && !lightboxOpen ? "animate-proof-progress" : "w-full"
              }`}
              style={{ animationDuration: "3000ms", animationTimingFunction: "linear" }}
            />
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mx-auto mt-6 w-full max-w-[980px] rounded-[22px] sm:rounded-[26px] border border-white/10 bg-[#101014] p-5 sm:p-7 text-left shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#2F6BFF]/40 bg-[#2F6BFF]/10 text-[#2F6BFF]">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                  100% Authentic Candidate Results
                </h4>
                <p className="text-xs sm:text-sm text-[#8c93a0]">
                  Verified invitations from Infosys, Axion Ray, UST Global, CyberNova & more.
                </p>
              </div>
            </div>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-[#2F6BFF] hover:bg-[#2558d6] text-white font-semibold py-3 px-6 text-sm shadow-[0_10px_30px_-8px_rgba(47,107,255,0.7)] transition-all active:scale-95 self-start sm:self-center shrink-0"
            >
              Start Getting Calls →
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-3 sm:p-4 backdrop-blur-md animate-fadeIn"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-3 sm:left-4 z-50 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] max-w-[94vw] overflow-hidden rounded-2xl bg-[#080c14] border border-white/15 shadow-2xl p-2 sm:p-3"
          >
            <img
              src={activeProof.src}
              alt={activeProof.title}
              className="max-h-[82vh] max-w-[90vw] object-contain rounded-xl"
            />
            <div className="mt-2.5 flex items-center justify-between px-2 sm:px-3 py-1 font-mono text-xs text-[#8c93a0]">
              <span className="text-white font-medium truncate mr-2">{activeProof.title}</span>
              <span className="shrink-0">Proof {currentIndex + 1} of {topProofs.length}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-3 sm:right-4 z-50 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>
      )}
    </section>
  );
}
