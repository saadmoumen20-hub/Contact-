import React, { useState, useMemo } from 'react';
import { ContactBook, ContactDetails, SortOption } from '../types';
import { ContactCard } from './ContactCard';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Users, 
  UserX, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  Phone,
  Mail,
  MapPin,
  Eye,
  Edit3,
  Trash2,
  Star
} from 'lucide-react';

interface ContactListProps {
  contactBook: ContactBook;
  onViewContact: (name: string) => void;
  onEditContact: (name: string) => void;
  onDeleteContact: (name: string) => void;
  onToggleFavorite: (name: string) => void;
  onOpenAddModal: () => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contactBook,
  onViewContact,
  onEditContact,
  onDeleteContact,
  onToggleFavorite,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const rawEntries = Object.entries(contactBook) as [string, ContactDetails][];
  const totalCount = rawEntries.length;

  // Filter & Search Logic
  const filteredAndSortedContacts = useMemo(() => {
    let result = rawEntries.filter(([name, details]) => {
      // Category filter
      if (activeCategory === 'Starred' && !details.favorite) return false;
      if (activeCategory !== 'All' && activeCategory !== 'Starred' && details.category !== activeCategory) {
        return false;
      }

      // Search query (name, phone, email, address)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = name.toLowerCase().includes(query);
        const matchesPhone = details.phone?.toLowerCase().includes(query);
        const matchesEmail = details.email?.toLowerCase().includes(query);
        const matchesAddress = details.address?.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesEmail || matchesAddress;
      }

      return true;
    });

    // Sorting
    result.sort(([nameA, detailsA], [nameB, detailsB]) => {
      if (sortBy === 'name-asc') {
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'name-desc') {
        return nameB.localeCompare(nameA);
      }
      if (sortBy === 'recent') {
        const dateA = detailsA.createdAt ? new Date(detailsA.createdAt).getTime() : 0;
        const dateB = detailsB.createdAt ? new Date(detailsB.createdAt).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'category') {
        const catA = detailsA.category || '';
        const catB = detailsB.category || '';
        return catA.localeCompare(catB);
      }
      return 0;
    });

    return result;
  }, [contactBook, searchQuery, activeCategory, sortBy]);

  const categories = ['All', 'Starred', 'Personal', 'Work', 'VIP', 'Family'];

  return (
    <section id="contacts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Python Dictionary: list_all_contacts()</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            All Contacts
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-72 sm:flex-initial">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="contact-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts by name, phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              id="contact-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-white/30 cursor-pointer"
            >
              <option value="name-asc">Name (A &rarr; Z)</option>
              <option value="name-desc">Name (Z &rarr; A)</option>
              <option value="recent">Recently Added</option>
              <option value="category">Category</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-zinc-900/80 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Grid Card View"
              aria-label="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Compact List View"
              aria-label="Compact List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Contact Button */}
          <button
            onClick={onOpenAddModal}
            id="list-add-contact-btn"
            className="metallic-button px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <Plus className="w-4 h-4 text-zinc-900" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === category
                ? 'bg-white text-zinc-950 font-semibold shadow-md'
                : 'bg-zinc-900/60 text-zinc-400 border border-white/5 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            {category === 'Starred' ? (
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Favorites
              </span>
            ) : (
              category
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {totalCount === 0 ? (
        /* Empty State (Python: "Contact book is empty.") */
        <div id="contact-book-empty-state" className="metallic-card rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-500">
            <UserX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            Contact book is empty.
          </h3>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            There are no contacts stored in the contact_book dictionary yet. Start building your network by creating your first entry.
          </p>
          <button
            onClick={onOpenAddModal}
            className="metallic-button px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-zinc-900" />
            <span>Add First Contact</span>
          </button>
        </div>
      ) : filteredAndSortedContacts.length === 0 ? (
        /* No search results */
        <div className="metallic-card rounded-2xl p-10 text-center max-w-md mx-auto my-8">
          <Search className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white mb-1">
            No matching contacts found
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            No entries matched "{searchQuery}". Try a different keyword or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-slate-300 text-xs font-medium border border-white/10 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedContacts.map(([name, details]) => (
            <ContactCard
              key={name}
              name={name}
              details={details}
              onView={onViewContact}
              onEdit={onEditContact}
              onDelete={onDeleteContact}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        /* Compact List/Table Layout */
        <div className="metallic-card rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900/90 text-zinc-400 uppercase tracking-wider font-semibold border-b border-white/10 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAndSortedContacts.map(([name, details]) => (
                  <tr key={name} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                      <button
                        onClick={() => onToggleFavorite(name)}
                        className="text-zinc-600 hover:text-amber-400 transition-colors"
                      >
                        <Star className={`w-3.5 h-3.5 ${details.favorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                      </button>
                      <span>{name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-400">
                      {details.phone || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {details.email || '-'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800/80 text-zinc-300 border border-white/10">
                        {details.category || 'Personal'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewContact(name)}
                          className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-slate-300 hover:text-white transition-colors"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditContact(name)}
                          className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteContact(name)}
                          className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-rose-950/60 text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
