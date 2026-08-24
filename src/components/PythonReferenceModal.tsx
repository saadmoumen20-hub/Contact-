import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Code2, 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal,
  FileCode,
  Sparkles
} from 'lucide-react';
import { ContactBook } from '../types';

interface PythonReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactBook: ContactBook;
  onResetToDefault: () => void;
  onImportBook: (imported: ContactBook) => void;
}

const PYTHON_CODE_SNIPPETS = {
  full: `def add_contact(contact_book):
    print("\\n--- Add Contact ---")
    name = input("Enter name: ").strip()
    if name in contact_book:
        print("Contact already exists!")
        return
    phone = input("Enter phone: ").strip()
    email = input("Enter email: ").strip()
    address = input("Enter address: ").strip()
    contact_book[name] = {"phone": phone, "email": email, "address": address}
    print("Contact added successfully!")


def view_contact(contact_book):
    print("\\n--- View Contact ---")
    name = input("Enter name to view: ").strip()
    if name in contact_book:
        print(f"Name: {name}")
        print(f"Phone: {contact_book[name]['phone']}")
        print(f"Email: {contact_book[name]['email']}")
        print(f"Address: {contact_book[name]['address']}")
    else:
        print("Contact not found!")


def edit_contact(contact_book):
    print("\\n--- Edit Contact ---")
    name = input("Enter name to edit: ").strip()
    if name in contact_book:
        print("Leave field blank to keep current value.")
        phone = input(f"New phone [{contact_book[name]['phone']}]: ").strip()
        email = input(f"New email [{contact_book[name]['email']}]: ").strip()
        address = input(f"New address [{contact_book[name]['address']}]: ").strip()
        
        # Complete the missing edit logic:
        if phone != "":
            contact_book[name]['phone'] = phone
        if email != "":
            contact_book[name]['email'] = email
        if address != "":
            contact_book[name]['address'] = address
        print("Contact updated successfully!")
    else:
        print("Contact not found!")


def delete_contact(contact_book):
    print("\\n--- Delete Contact ---")
    name = input("Enter name to delete: ").strip()
    if name in contact_book:
        del contact_book[name]
        print("Contact deleted successfully!")
    else:
        print("Contact not found!")


def list_all_contacts(contact_book):
    print("\\n--- All Contacts ---")
    if not contact_book:
        print("Contact book is empty.")
        return
    for name, details in contact_book.items():
        print(f"- {name}: {details['phone']}")


def main():
    contact_book = {}`,
  add: `def add_contact(contact_book):
    print("\\n--- Add Contact ---")
    name = input("Enter name: ").strip()
    if name in contact_book:
        print("Contact already exists!")
        return
    phone = input("Enter phone: ").strip()
    email = input("Enter email: ").strip()
    address = input("Enter address: ").strip()
    contact_book[name] = {"phone": phone, "email": email, "address": address}
    print("Contact added successfully!")`,
  view: `def view_contact(contact_book):
    print("\\n--- View Contact ---")
    name = input("Enter name to view: ").strip()
    if name in contact_book:
        print(f"Name: {name}")
        print(f"Phone: {contact_book[name]['phone']}")
        print(f"Email: {contact_book[name]['email']}")
        print(f"Address: {contact_book[name]['address']}")
    else:
        print("Contact not found!")`,
  edit: `def edit_contact(contact_book):
    print("\\n--- Edit Contact ---")
    name = input("Enter name to edit: ").strip()
    if name in contact_book:
        print("Leave field blank to keep current value.")
        phone = input(f"New phone [{contact_book[name]['phone']}]: ").strip()
        email = input(f"New email [{contact_book[name]['email']}]: ").strip()
        address = input(f"New address [{contact_book[name]['address']}]: ").strip()
        
        # Complete the missing edit logic:
        if phone != "":
            contact_book[name]['phone'] = phone
        if email != "":
            contact_book[name]['email'] = email
        if address != "":
            contact_book[name]['address'] = address
        print("Contact updated successfully!")
    else:
        print("Contact not found!")`,
  delete: `def delete_contact(contact_book):
    print("\\n--- Delete Contact ---")
    name = input("Enter name to delete: ").strip()
    if name in contact_book:
        del contact_book[name]
        print("Contact deleted successfully!")
    else:
        print("Contact not found!")`,
  list: `def list_all_contacts(contact_book):
    print("\\n--- All Contacts ---")
    if not contact_book:
        print("Contact book is empty.")
        return
    for name, details in contact_book.items():
        print(f"- {name}: {details['phone']}")`
};

export const PythonReferenceModal: React.FC<PythonReferenceModalProps> = ({
  isOpen,
  onClose,
  contactBook,
  onResetToDefault,
  onImportBook
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'json'>('code');
  const [activeFunction, setActiveFunction] = useState<keyof typeof PYTHON_CODE_SNIPPETS>('full');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contactBook, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "contact_book.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed === 'object') {
            onImportBook(parsed);
            onClose();
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Top metallic shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-slate-200">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Python Logic Engine Reference
                </h3>
                <p className="text-xs text-zinc-400">
                  Direct mapping of the Python dictionary architecture to web state
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs bar */}
          <div className="flex items-center justify-between my-4 shrink-0 flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'code' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Python Reference Code</span>
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'json' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Live Dictionary JSON ({Object.keys(contactBook).length})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export contacts as JSON"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export JSON</span>
              </button>

              <label className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={onResetToDefault}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-amber-300 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset sample contacts"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Python Code */}
          {activeTab === 'code' && (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Function Sub-tabs */}
              <div className="flex items-center gap-1.5 pb-2 overflow-x-auto scrollbar-none shrink-0 mb-2">
                {[
                  { id: 'full', label: 'Full Script' },
                  { id: 'add', label: 'add_contact()' },
                  { id: 'view', label: 'view_contact()' },
                  { id: 'edit', label: 'edit_contact()' },
                  { id: 'delete', label: 'delete_contact()' },
                  { id: 'list', label: 'list_all_contacts()' },
                ].map((fn) => (
                  <button
                    key={fn.id}
                    onClick={() => setActiveFunction(fn.id as any)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                      activeFunction === fn.id
                        ? 'bg-zinc-800 text-slate-200 border border-white/20'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    {fn.label}
                  </button>
                ))}
              </div>

              {/* Code viewer block */}
              <div className="relative flex-1 bg-zinc-900/90 rounded-xl border border-white/10 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/5 text-[11px] text-zinc-400 font-mono">
                  <span>contact_book.py</span>
                  <button
                    onClick={() => handleCopyCode(PYTHON_CODE_SNIPPETS[activeFunction])}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="flex-1 p-4 text-xs font-mono text-slate-300 overflow-y-auto leading-relaxed scrollbar-none selection:bg-slate-700">
                  <code>{PYTHON_CODE_SNIPPETS[activeFunction]}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: Live JSON Viewer */}
          {activeTab === 'json' && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="relative flex-1 bg-zinc-900/90 rounded-xl border border-white/10 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/5 text-[11px] text-zinc-400 font-mono">
                  <span>Current State: contact_book = &#123;...&#125;</span>
                  <button
                    onClick={() => handleCopyCode(JSON.stringify(contactBook, null, 2))}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="flex-1 p-4 text-xs font-mono text-emerald-400/90 overflow-y-auto leading-relaxed scrollbar-none selection:bg-slate-700">
                  <code>{JSON.stringify(contactBook, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
