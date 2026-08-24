import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Plus } from 'lucide-react';

interface HeroProps {
  totalContacts: number;
  onOpenAddModal: () => void;
  onScrollToContacts: () => void;
  onOpenPythonModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalContacts,
  onOpenAddModal,
  onScrollToContacts,
  onOpenPythonModal
}) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play video seamlessly on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        // Fallback gracefully if browser restricts autoplay
        setVideoEnded(true);
      });
    }
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[640px] md:min-h-[720px] flex items-center justify-center pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-[#07070a]"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. SEAMLESS BACKGROUND VIDEO (Plays once, perfectly blended)  */}
      {/* ------------------------------------------------------------- */}
      <div 
        className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-in-out pointer-events-none ${
          videoEnded ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster="/hero-poster.jpg"
          playsInline
          autoPlay
          muted
          onEnded={handleVideoEnded}
          onError={() => setVideoEnded(true)}
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        />

        {/* Cinematic Vignette & Edge Blend to match site canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/30 to-[#07070a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/90 via-transparent to-[#07070a]/90" />
        <div className="absolute inset-0 radial-vignette opacity-80" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. AMBIENT BACKDROP (Always present to unify visual continuity) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-slate-500/10 via-zinc-800/5 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. HERO CONTENT (Fades in smoothly with elegant typography)   */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-10"
          >
            {/* Abstract Metallic Ribbon Curves */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[620px] pointer-events-none overflow-hidden -z-10 opacity-60">
              <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] opacity-40"
                viewBox="0 0 1100 650"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="silverRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                    <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#334155" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="silverRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#64748b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1e293b" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <path
                  d="M 50,420 C 320,620 680,200 1050,380"
                  stroke="url(#silverRibbon1)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M 150,120 C 450,-40 750,260 980,80"
                  stroke="url(#silverRibbon2)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="550" cy="290" r="220" stroke="url(#silverRibbon1)" strokeWidth="0.5" opacity="0.25" strokeDasharray="6 8" />
              </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              {/* Minimal Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] font-mono tracking-wide text-zinc-400 mb-8"
              >
                <span>PYTHON DATA ENGINE &bull; LOCAL STORAGE</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]"
              >
                <span className="text-white">Your Contacts. </span>
                <span className="silver-gradient-text font-serif italic font-normal">Organized.</span>
              </motion.h1>

              {/* Supporting description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
              >
                A high-precision address book built on a pure Python dictionary model.
                Create, view, update, and search your network with instant client-side persistence.
              </motion.p>

              {/* Call to Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
              >
                <button
                  id="hero-add-contact-cta"
                  onClick={onOpenAddModal}
                  className="w-full sm:w-auto metallic-button px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4 text-zinc-900" />
                  <span>Add Contact</span>
                </button>

                <button
                  id="hero-view-contacts-cta"
                  onClick={onScrollToContacts}
                  className="w-full sm:w-auto metallic-button-dark px-7 py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Contacts</span>
                  <ArrowDown className="w-4 h-4 text-slate-400" />
                </button>
              </motion.div>

              {/* Refined Metric Bar (Clean, no childish icons) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left"
              >
                <div className="py-2">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">{totalContacts}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Total Contacts</div>
                </div>

                <div className="py-2">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">100%</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Local Persistence</div>
                </div>

                <div className="py-2">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">&lt; 1ms</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Lookup Latency</div>
                </div>

                <div className="py-2">
                  <button
                    onClick={onOpenPythonModal}
                    className="group cursor-pointer focus:outline-none text-left"
                  >
                    <div className="text-xs font-mono font-medium text-slate-300 group-hover:text-white flex items-center gap-1 transition-colors">
                      contact_book = &#123;&#125;
                      <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5 group-hover:text-zinc-400 transition-colors">View Python Reference</div>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

