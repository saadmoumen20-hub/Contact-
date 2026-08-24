import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Phone, Mail, MapPin, Tag, AlertCircle } from 'lucide-react';
import { ContactBook, ContactDetails } from '../types';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    phone: string,
    email: string,
    address: string,
    category: ContactDetails['category'],
    notes: string
  ) => void;
  contactBook: ContactBook;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  contactBook
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<ContactDetails['category']>('Personal');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCategory('Personal');
      setNotes('');
      setError(null);
    }
  }, [isOpen]);

  // Real-time duplicate check
  const isDuplicateName = name.trim() !== '' && Object.keys(contactBook).some(
    k => k.toLowerCase() === name.trim().toLowerCase()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Contact name is required.');
      return;
    }

    if (isDuplicateName) {
      setError('Contact already exists!');
      return;
    }

    onSubmit(trimmedName, phone.trim(), email.trim(), address.trim(), category, notes.trim());
  };

  if (!isOpen) return null;

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
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Add New Contact
                </h3>
                <p className="text-xs text-zinc-400">
                  Python logic: <code className="text-slate-300 font-mono">add_contact(contact_book)</code>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-add-modal-btn"
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Primary Key) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Contact Name <span className="text-slate-400">*</span>
              </label>
              <input
                id="add-contact-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. Elena Rostova"
                required
                autoFocus
                className={`w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  isDuplicateName || error === 'Contact already exists!'
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                    : 'border-white/15 focus:border-white/40 focus:ring-1 focus:ring-white/20'
                }`}
              />
              {isDuplicateName && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Contact already exists!</span>
                </div>
              )}
            </div>

            {/* Phone & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Phone</span>
                </label>
                <input
                  id="add-contact-phone-input"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Email</span>
                </label>
                <input
                  id="add-contact-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Address</span>
              </label>
              <textarea
                id="add-contact-address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, city, state, postal code..."
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
                  id="add-contact-category-select"
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
                  Tag / Label (Optional)
                </label>
                <input
                  id="add-contact-notes-input"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Lead Designer"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all"
                />
              </div>
            </div>

            {/* Error banner */}
            {error && !isDuplicateName && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

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
                id="submit-add-contact-btn"
                className="metallic-button px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-zinc-900" />
                <span>Save Contact</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
