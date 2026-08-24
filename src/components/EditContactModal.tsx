import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit3, Phone, Mail, MapPin, Tag, Info, Check } from 'lucide-react';
import { ContactDetails } from '../types';

interface EditContactModalProps {
  isOpen: boolean;
  name: string | null;
  currentDetails: ContactDetails | null;
  onClose: () => void;
  onSubmit: (
    name: string,
    updates: {
      phone: string;
      email: string;
      address: string;
      category: ContactDetails['category'];
      notes: string;
    }
  ) => void;
}

export const EditContactModal: React.FC<EditContactModalProps> = ({
  isOpen,
  name,
  currentDetails,
  onClose,
  onSubmit
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<ContactDetails['category']>('Personal');
  const [notes, setNotes] = useState('');

  // When modal opens, populate with current values or let user change
  useEffect(() => {
    if (isOpen && currentDetails) {
      setPhone(currentDetails.phone || '');
      setEmail(currentDetails.email || '');
      setAddress(currentDetails.address || '');
      setCategory(currentDetails.category || 'Personal');
      setNotes(currentDetails.notes || '');
    }
  }, [isOpen, currentDetails]);

  if (!isOpen || !name || !currentDetails) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In Python: If left blank or empty string, fallback logic in engine keeps current value.
    // Here we pass the inputs to the editContact engine handler.
    onSubmit(name, {
      phone,
      email,
      address,
      category,
      notes
    });
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

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-slate-200">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Edit Contact: <span className="text-slate-300 font-semibold">{name}</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Python logic: <code className="text-slate-300 font-mono">edit_contact(contact_book)</code>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-edit-modal-btn"
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Python Rule Info Banner */}
          <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 mb-6 flex items-start gap-2.5 text-xs text-zinc-300">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Python Rule:</span> Leave field blank to keep current value.
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Phone Number</span>
                </label>
                <span className="text-[11px] text-zinc-500 font-mono truncate max-w-[200px]">
                  Current: {currentDetails.phone || 'None'}
                </span>
              </div>
              <input
                id="edit-contact-phone-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={`[${currentDetails.phone || 'blank'}]`}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 font-mono transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Email Address</span>
                </label>
                <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                  Current: {currentDetails.email || 'None'}
                </span>
              </div>
              <input
                id="edit-contact-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`[${currentDetails.email || 'blank'}]`}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Address</span>
                </label>
                <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                  Current: {currentDetails.address || 'None'}
                </span>
              </div>
              <textarea
                id="edit-contact-address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={`[${currentDetails.address || 'blank'}]`}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 resize-none transition-all"
              />
            </div>

            {/* Category and Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Category</span>
                </label>
                <select
                  id="edit-contact-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ContactDetails['category'])}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-zinc-300 focus:outline-none focus:border-white/40 cursor-pointer"
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="VIP">VIP</option>
                  <option value="Family">Family</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Tag / Label
                </label>
                <input
                  id="edit-contact-notes-input"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Lead Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-edit-contact-btn"
                className="metallic-button px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 text-zinc-900" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
