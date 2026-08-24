import React, { useState, useEffect, useCallback } from 'react';
import { 
  ContactBook, 
  ContactDetails, 
  ToastMessage 
} from './types';
import { 
  loadContactBook, 
  saveContactBook, 
  addContact, 
  viewContact, 
  editContact, 
  deleteContact, 
  toggleFavoriteContact, 
  INITIAL_CONTACTS 
} from './utils/contactBookEngine';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContactOverview } from './components/ContactOverview';
import { ContactList } from './components/ContactList';
import { AddContactModal } from './components/AddContactModal';
import { ViewContactModal } from './components/ViewContactModal';
import { EditContactModal } from './components/EditContactModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { PythonReferenceModal } from './components/PythonReferenceModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  // 1. Central Python dictionary state persisted to localStorage
  const [contactBook, setContactBook] = useState<ContactBook>(() => loadContactBook());

  // 2. Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState(false);
  
  const [viewContactName, setViewContactName] = useState<string | null>(null);
  const [editContactName, setEditContactName] = useState<string | null>(null);
  const [deleteContactName, setDeleteContactName] = useState<string | null>(null);

  // 3. Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to localStorage whenever contactBook updates
  useEffect(() => {
    saveContactBook(contactBook);
  }, [contactBook]);

  // Global keyboard shortcuts (ESC to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddOpen(false);
        setIsPythonModalOpen(false);
        setViewContactName(null);
        setEditContactName(null);
        setDeleteContactName(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // -------------------------------------------------------------
  // CRUD Handlers mapping directly to Python Logic Reference
  // -------------------------------------------------------------

  /**
   * Add Contact: maps to add_contact(contact_book)
   */
  const handleAddContactSubmit = (
    name: string,
    phone: string,
    email: string,
    address: string,
    category: ContactDetails['category'],
    notes: string
  ) => {
    const result = addContact(contactBook, name, phone, email, address, { category, notes });
    
    if (result.success) {
      setContactBook(result.book);
      setIsAddOpen(false);
      addToast(result.message, 'success'); // "Contact added successfully!"
    } else {
      addToast(result.message, 'error'); // "Contact already exists!"
    }
  };

  /**
   * View Contact: maps to view_contact(contact_book)
   */
  const handleViewContact = (name: string) => {
    const result = viewContact(contactBook, name);
    if (result.found && result.name) {
      setViewContactName(result.name);
    } else {
      addToast(result.message || "Contact not found!", 'error');
    }
  };

  /**
   * Edit Contact: maps to edit_contact(contact_book)
   */
  const handleEditContactOpen = (name: string) => {
    if (name in contactBook) {
      setEditContactName(name);
    } else {
      addToast("Contact not found!", 'error');
    }
  };

  const handleEditContactSubmit = (
    name: string,
    updates: {
      phone: string;
      email: string;
      address: string;
      category: ContactDetails['category'];
      notes: string;
    }
  ) => {
    const result = editContact(contactBook, name, updates);
    if (result.success) {
      setContactBook(result.book);
      setEditContactName(null);
      addToast(result.message, 'success'); // "Contact updated successfully!"
    } else {
      addToast(result.message, 'error'); // "Contact not found!"
    }
  };

  /**
   * Delete Contact: maps to delete_contact(contact_book)
   */
  const handleDeleteContactOpen = (name: string) => {
    if (name in contactBook) {
      setDeleteContactName(name);
    } else {
      addToast("Contact not found!", 'error');
    }
  };

  const handleDeleteContactConfirm = (name: string) => {
    const result = deleteContact(contactBook, name);
    if (result.success) {
      setContactBook(result.book);
      setDeleteContactName(null);
      addToast(result.message, 'success'); // "Contact deleted successfully!"
    } else {
      addToast(result.message, 'error'); // "Contact not found!"
    }
  };

  /**
   * Toggle Favorite helper
   */
  const handleToggleFavorite = (name: string) => {
    const updated = toggleFavoriteContact(contactBook, name);
    setContactBook(updated);
    const isFav = updated[name]?.favorite;
    addToast(`${name} ${isFav ? 'starred' : 'removed from favorites'}`, 'info');
  };

  /**
   * Reset to default demo data
   */
  const handleResetToDefault = () => {
    setContactBook(INITIAL_CONTACTS);
    saveContactBook(INITIAL_CONTACTS);
    addToast("Reset to default sample contacts", 'info');
  };

  /**
   * Import contacts from JSON
   */
  const handleImportBook = (imported: ContactBook) => {
    setContactBook(imported);
    saveContactBook(imported);
    addToast(`Successfully imported ${Object.keys(imported).length} contacts!`, 'success');
  };

  // Scroll navigation helpers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContacts = () => {
    const el = document.getElementById('contacts-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStats = () => {
    const el = document.getElementById('stats-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col font-sans selection:bg-slate-700 selection:text-white">
      {/* Navigation */}
      <Navbar
        totalContacts={Object.keys(contactBook).length}
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onScrollToContacts={scrollToContacts}
        onScrollToTop={scrollToTop}
        onScrollToStats={scrollToStats}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          totalContacts={Object.keys(contactBook).length}
          onOpenAddModal={() => setIsAddOpen(true)}
          onScrollToContacts={scrollToContacts}
          onOpenPythonModal={() => setIsPythonModalOpen(true)}
        />

        {/* Dynamic Telemetry Overview */}
        <ContactOverview contactBook={contactBook} />

        {/* Contacts Section (Search, Filter, List, Card Views) */}
        <ContactList
          contactBook={contactBook}
          onViewContact={handleViewContact}
          onEditContact={handleEditContactOpen}
          onDeleteContact={handleDeleteContactOpen}
          onToggleFavorite={handleToggleFavorite}
          onOpenAddModal={() => setIsAddOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onOpenAddModal={() => setIsAddOpen(true)}
      />

      {/* Modals & Dialogs */}
      <AddContactModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddContactSubmit}
        contactBook={contactBook}
      />

      <ViewContactModal
        isOpen={!!viewContactName}
        name={viewContactName}
        details={viewContactName ? contactBook[viewContactName] || null : null}
        onClose={() => setViewContactName(null)}
        onEdit={(name) => {
          setViewContactName(null);
          handleEditContactOpen(name);
        }}
        onDelete={(name) => {
          setViewContactName(null);
          handleDeleteContactOpen(name);
        }}
        onToggleFavorite={handleToggleFavorite}
      />

      <EditContactModal
        isOpen={!!editContactName}
        name={editContactName}
        currentDetails={editContactName ? contactBook[editContactName] || null : null}
        onClose={() => setEditContactName(null)}
        onSubmit={handleEditContactSubmit}
      />

      <DeleteConfirmModal
        isOpen={!!deleteContactName}
        name={deleteContactName}
        onClose={() => setDeleteContactName(null)}
        onConfirm={handleDeleteContactConfirm}
      />

      <PythonReferenceModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
        contactBook={contactBook}
        onResetToDefault={handleResetToDefault}
        onImportBook={handleImportBook}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
