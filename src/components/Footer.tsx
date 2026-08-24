import React from 'react';
import { BookUser, Github, Code2, Heart, Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenPythonModal: () => void;
  onOpenAddModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onOpenPythonModal,
  onOpenAddModal
}) => {
  return (
    <footer className="border-t border-white/5 bg-zinc-950/80 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-12 border-b border-white/5">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-slate-200">
                <BookUser className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Contact<span className="text-slate-400 font-light">Book</span>
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Engineered with a high-performance Python dictionary architecture translated into a modern, reactive web experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Navigation
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={onScrollToTop} className="hover:text-white transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={onOpenAddModal} className="hover:text-white transition-colors cursor-pointer">
                    Add Contact
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPythonModal} className="hover:text-white transition-colors cursor-pointer">
                    Python Reference
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Architecture
              </div>
              <ul className="space-y-2 text-zinc-500">
                <li>&bull; <code className="font-mono text-zinc-400">dict[name, details]</code></li>
                <li>&bull; LocalStorage Sync</li>
                <li>&bull; Non-destructive Edits</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Contact Book Application</span>
            <span>&bull;</span>
            <span>All actions live-synced to local storage</span>
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
