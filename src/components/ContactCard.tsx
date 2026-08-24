import React, { useState } from 'react';
import { ContactDetails } from '../types';
import { Phone, Mail, MapPin, Eye, Edit3, Trash2, Star, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactCardProps {
  name: string;
  details: ContactDetails;
  onView: (name: string) => void;
  onEdit: (name: string) => void;
  onDelete: (name: string) => void;
  onToggleFavorite: (name: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  name,
  details,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleCopy = (text: string, field: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const categoryColor = {
    VIP: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    Work: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    Personal: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    Family: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    Other: 'bg-zinc-800 text-zinc-400 border-white/10'
  }[details.category || 'Personal'] || 'bg-zinc-800 text-zinc-400 border-white/10';

  return (
    <div
      id={`contact-card-${name.replace(/\s+/g, '-').toLowerCase()}`}
      className="metallic-card p-6 rounded-2xl flex flex-col justify-between relative group hover:translate-y-[-2px] transition-all duration-200"
    >
      {/* Top row: Avatar, Name, Category & Star */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Avatar with metallic border */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/15 flex items-center justify-center font-bold text-sm text-slate-200 shadow-md shrink-0 group-hover:border-white/30 transition-colors">
              {getInitials(name)}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white truncate group-hover:text-slate-100 transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {details.category && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${categoryColor}`}>
                    {details.category}
                  </span>
                )}
                {details.notes && (
                  <span className="text-[11px] text-zinc-500 truncate max-w-[120px]">
                    {details.notes}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(name)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
              details.favorite
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-zinc-900/60 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/15'
            }`}
            title={details.favorite ? 'Remove from favorites' : 'Mark as favorite'}
            aria-label={details.favorite ? 'Remove from favorites' : 'Mark as favorite'}
          >
            <Star className={`w-4 h-4 ${details.favorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Contact details list */}
        <div className="space-y-2.5 my-4 pt-3 border-t border-white/5 text-xs text-zinc-300">
          {/* Phone */}
          <div className="flex items-center justify-between group/field">
            <div className="flex items-center gap-2.5 truncate text-zinc-400 min-w-0">
              <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="truncate font-mono text-zinc-300">
                {details.phone || <span className="text-zinc-600 italic">No phone provided</span>}
              </span>
            </div>
            {details.phone && (
              <button
                onClick={(e) => handleCopy(details.phone, 'phone', e)}
                className="opacity-0 group-hover/field:opacity-100 p-1 text-zinc-400 hover:text-white rounded transition-opacity"
                title="Copy phone"
                aria-label="Copy phone"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center justify-between group/field">
            <div className="flex items-center gap-2.5 truncate text-zinc-400 min-w-0">
              <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="truncate text-zinc-300">
                {details.email || <span className="text-zinc-600 italic">No email provided</span>}
              </span>
            </div>
            {details.email && (
              <button
                onClick={(e) => handleCopy(details.email, 'email', e)}
                className="opacity-0 group-hover/field:opacity-100 p-1 text-zinc-400 hover:text-white rounded transition-opacity"
                title="Copy email"
                aria-label="Copy email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start justify-between group/field">
            <div className="flex items-start gap-2.5 text-zinc-400 min-w-0 flex-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
              <span className="line-clamp-2 text-zinc-300 leading-snug">
                {details.address || <span className="text-zinc-600 italic">No address provided</span>}
              </span>
            </div>
            {details.address && (
              <button
                onClick={(e) => handleCopy(details.address, 'address', e)}
                className="opacity-0 group-hover/field:opacity-100 p-1 text-zinc-400 hover:text-white rounded transition-opacity shrink-0"
                title="Copy address"
                aria-label="Copy address"
              >
                {copiedField === 'address' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons bottom bar */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
        <button
          onClick={() => onView(name)}
          id={`view-btn-${name.replace(/\s+/g, '-').toLowerCase()}`}
          className="flex-1 py-2 px-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 text-slate-200 hover:text-white text-xs font-medium border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span>View</span>
        </button>

        <button
          onClick={() => onEdit(name)}
          id={`edit-btn-${name.replace(/\s+/g, '-').toLowerCase()}`}
          className="py-2 px-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 text-slate-200 hover:text-white text-xs font-medium border border-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          title="Edit contact"
          aria-label={`Edit ${name}`}
        >
          <Edit3 className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Edit</span>
        </button>

        <button
          onClick={() => onDelete(name)}
          id={`delete-btn-${name.replace(/\s+/g, '-').toLowerCase()}`}
          className="py-2 px-3 rounded-xl bg-zinc-900/80 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-300 text-xs font-medium border border-white/10 hover:border-rose-500/30 flex items-center justify-center transition-colors cursor-pointer"
          title="Delete contact"
          aria-label={`Delete ${name}`}
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
        </button>
      </div>
    </div>
  );
};
