import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  name: string | null;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  name,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !name) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-zinc-950 border border-rose-500/20 rounded-2xl shadow-2xl p-6 z-10 overflow-hidden"
        >
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Delete Contact
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Python logic: <code className="text-rose-300 font-mono">del contact_book[name]</code>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 mb-6 text-xs text-zinc-300 leading-relaxed">
            <p className="font-medium text-white mb-1">
              Are you sure you want to delete this contact?
            </p>
            <p className="text-zinc-400">
              This will permanently remove <span className="text-white font-semibold">{name}</span> from the dictionary.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              id="cancel-delete-modal-btn"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(name)}
              id="confirm-delete-modal-btn"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-950/50"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Contact</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
