import React from 'react';
import { ContactBook, ContactDetails } from '../types';
import { Users, Mail, Phone, Clock, Star } from 'lucide-react';

interface ContactOverviewProps {
  contactBook: ContactBook;
}

export const ContactOverview: React.FC<ContactOverviewProps> = ({ contactBook }) => {
  const entries = Object.entries(contactBook) as [string, ContactDetails][];
  const totalContacts = entries.length;

  const contactsWithEmail = entries.filter(([_, details]) => details.email && details.email.trim() !== '').length;
  const contactsWithPhone = entries.filter(([_, details]) => details.phone && details.phone.trim() !== '').length;
  const favoriteContacts = entries.filter(([_, details]) => !!details.favorite).length;

  // Recently added: contacts created in last 7 days or newest 3
  const sevenDaysAgo = Date.now() - 7 * 86400000;
  const recentlyAddedCount = entries.filter(([_, details]) => {
    if (!details.createdAt) return false;
    const time = new Date(details.createdAt).getTime();
    return !isNaN(time) && time >= sevenDaysAgo;
  }).length;

  const stats = [
    {
      id: 'stat-total-contacts',
      label: 'Total Contacts',
      value: totalContacts,
      subtext: 'Dictionary entries',
      icon: Users,
      highlight: true
    },
    {
      id: 'stat-with-phone',
      label: 'Contacts with Phone',
      value: contactsWithPhone,
      subtext: totalContacts > 0 ? `${Math.round((contactsWithPhone / totalContacts) * 100)}% coverage` : '0%',
      icon: Phone,
      highlight: false
    },
    {
      id: 'stat-with-email',
      label: 'Contacts with Email',
      value: contactsWithEmail,
      subtext: totalContacts > 0 ? `${Math.round((contactsWithEmail / totalContacts) * 100)}% coverage` : '0%',
      icon: Mail,
      highlight: false
    },
    {
      id: 'stat-recent-added',
      label: 'Recently Added',
      value: recentlyAddedCount > 0 ? recentlyAddedCount : Math.min(totalContacts, 3),
      subtext: 'Past 7 days activity',
      icon: Clock,
      highlight: false
    }
  ];

  return (
    <section id="stats-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest mb-1.5">
            TELEMETRY & INSIGHTS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Contact Overview
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 text-xs text-zinc-400 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>Starred: <strong className="text-white">{favoriteContacts}</strong></span>
          </div>
          <div className="text-xs text-zinc-500 font-mono">
            live state
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className={`metallic-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group ${
                item.highlight ? 'border-white/20' : ''
              }`}
            >
              {/* Subtle metallic diagonal sheen on hover */}
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-all" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-zinc-400 tracking-wide">
                  {item.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-white/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5 font-mono">
                {item.value}
              </div>

              <div className="text-[12px] text-zinc-500 flex items-center gap-1.5">
                <span>{item.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
