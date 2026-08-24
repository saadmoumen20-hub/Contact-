import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Trash2, 
  Star, 
  Copy, 
  Check, 
  ExternalLink,
  Calendar,
  Tag
} from 'lucide-react';
import { ContactDetails } from '../types';

interface ViewContactModalProps {
  isOpen: boolean;
  name: string | null;
  details: ContactDetails | null;
  onClose: () => void;
  onEdit: (name: string) => void;
  onDelete: (name: string) => void;
  onToggleFavorite: (name: string) => void;
}

export const ViewContactModal: React.FC<ViewContactModalProps> = ({
  isOpen,
  name,
  details,
  onClose,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleCopyAll = () => {
    if (!name || !details) return;
    const fullText = `Name: ${name}\nPhone: ${details.phone || 'N/A'}\nEmail: ${details.email || 'N/A'}\nAddress: ${details.address || 'N/A'}`;
    handleCopy(fullText, 'all');
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Top metallic shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />

          {/* If contact is not found */}
          {!name || !details ? (
            <div className="text-center py-8">
              <p className="text-rose-400 font-semibold mb-4">Contact not found!</p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-xs text-white border border-white/10 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header with Avatar and Actions */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/20 flex items-center justify-center font-bold text-lg text-slate-100 shadow-xl">
                    {getInitials(name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {name}
                      </h3>
                      <button
                        onClick={() => onToggleFavorite(name)}
                        className="text-zinc-500 hover:text-amber-400 transition-colors p-1"
                        title={details.favorite ? 'Starred' : 'Star'}
                      >
                        <Star className={`w-4 h-4 ${details.favorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-slate-300 border border-white/10">
                        {details.category || 'Personal'}
                      </span>
                      {details.notes && (
                        <span className="text-xs text-zinc-400">
                          &bull; {details.notes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  id="close-view-modal-btn"
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Data Rows (Python view_contact format) */}
              <div className="space-y-4 mb-8">
                {/* Phone */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-slate-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Phone</div>
                      <div className="text-xs font-mono text-white mt-0.5">
                        {details.phone || <span className="text-zinc-500 italic">None</span>}
                      </div>
                    </div>
                  </div>
                  {details.phone && (
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${details.phone}`}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 text-[11px] text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      >
                        Call
                      </a>
                      <button
                        onClick={() => handleCopy(details.phone, 'phone')}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                        title="Copy Phone"
                      >
                        {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-slate-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Email</div>
                      <div className="text-xs text-white mt-0.5">
                        {details.email || <span className="text-zinc-500 italic">None</span>}
                      </div>
                    </div>
                  </div>
                  {details.email && (
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`mailto:${details.email}`}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 text-[11px] text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      >
                        Email
                      </a>
                      <button
                        onClick={() => handleCopy(details.email, 'email')}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                        title="Copy Email"
                      >
                        {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start justify-between group">
                  <div className="flex items-start gap-3 flex-1 pr-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Address</div>
                      <div className="text-xs text-white mt-0.5 leading-relaxed">
                        {details.address || <span className="text-zinc-500 italic">None</span>}
                      </div>
                    </div>
                  </div>
                  {details.address && (
                    <button
                      onClick={() => handleCopy(details.address, 'address')}
                      className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors shrink-0"
                      title="Copy Address"
                    >
                      {copiedKey === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={handleCopyAll}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-slate-200 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'all' ? 'Copied All' : 'Copy All'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onDelete(name);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-rose-950/50 text-rose-400 text-xs font-medium border border-rose-500/20 hover:border-rose-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onEdit(name);
                    }}
                    id="view-modal-edit-btn"
                    className="metallic-button px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-zinc-900" />
                    <span>Edit Contact</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
