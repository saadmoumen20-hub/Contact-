import React from 'react';
import { BookUser, Plus, Code2 } from 'lucide-react';

interface NavbarProps {
  totalContacts: number;
  onOpenAddModal: () => void;
  onOpenPythonModal: () => void;
  onScrollToContacts: () => void;
  onScrollToTop: () => void;
  onScrollToStats: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalContacts,
  onOpenAddModal,
  onOpenPythonModal,
  onScrollToContacts,
  onScrollToTop,
  onScrollToStats
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={onScrollToTop}
          id="nav-brand-btn"
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/20 flex items-center justify-center shadow-lg group-hover:border-white/40 transition-colors">
            <img
              src="/app-logo.png"
              alt="contact + logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('postimg')) {
                  target.src = 'https://i.postimg.cc/L6wgJYpd/Chat-GPT-Image-24-aout-2026-18-37-42.png';
                }
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-white font-sans flex items-center gap-0.5">
                <span>contact</span>
                <span className="text-emerald-400 font-semibold">+</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-white/10 text-slate-300 border border-white/15">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Dictionary Data Engine
            </p>
          </div>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-white/10 shadow-inner">
          <button
            id="nav-home-btn"
            onClick={onScrollToTop}
            className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            id="nav-stats-btn"
            onClick={onScrollToStats}
            className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            id="nav-contacts-btn"
            onClick={onScrollToContacts}
            className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            Contacts
            <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono border border-white/10">
              {totalContacts}
            </span>
          </button>
          <button
            id="nav-python-btn"
            onClick={onOpenPythonModal}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Python Logic</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            id="nav-inspect-python-mobile-btn"
            onClick={onOpenPythonModal}
            className="md:hidden p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
            title="Inspect Python Logic"
            aria-label="Inspect Python Logic"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            id="nav-add-contact-btn"
            onClick={onOpenAddModal}
            className="metallic-button px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer font-semibold"
          >
            <Plus className="w-4 h-4 text-zinc-900" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
};
