import { ContactBook, ContactDetails, ContactEntry } from '../types';

const STORAGE_KEY = 'contact_book_data_v1';

export const INITIAL_CONTACTS: ContactBook = {
  "Alexander Wright": {
    phone: "+1 (555) 234-5678",
    email: "alexander.wright@apexstudio.io",
    address: "742 Evergreen Terrace, San Francisco, CA 94107",
    category: "Work",
    favorite: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  "Elena Rostova": {
    phone: "+1 (555) 890-1234",
    email: "elena.rostova@designworks.com",
    address: "100 Broadway Suite 400, New York, NY 10005",
    category: "VIP",
    favorite: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  "Marcus Vance": {
    phone: "+1 (555) 432-8765",
    email: "marcus.vance@vancetech.org",
    address: "350 Mission St Floor 12, San Francisco, CA",
    category: "Work",
    favorite: false,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  "Sophia Sterling": {
    phone: "+1 (555) 314-1592",
    email: "sophia.sterling@gmail.com",
    address: "128 Oak Ridge Lane, Austin, TX 78701",
    category: "Personal",
    favorite: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  "David Chen": {
    phone: "+1 (555) 678-9012",
    email: "dchen@cloudscale.net",
    address: "2100 University Ave, Palo Alto, CA 94301",
    category: "Work",
    favorite: false,
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  }
};

/**
 * Load contacts from localStorage or initialize with defaults
 */
export function loadContactBook(): ContactBook {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed as ContactBook;
      }
    }
  } catch (e) {
    console.error("Failed to load contacts from localStorage", e);
  }
  return INITIAL_CONTACTS;
}

/**
 * Persist contacts to localStorage
 */
export function saveContactBook(book: ContactBook): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
  } catch (e) {
    console.error("Failed to save contacts to localStorage", e);
  }
}

/**
 * Python Reference: add_contact(contact_book)
 * 
 * name = input("Enter name: ").strip()
 * if name in contact_book:
 *     print("Contact already exists!")
 *     return
 * ...
 * contact_book[name] = {"phone": phone, "email": email, "address": address}
 * print("Contact added successfully!")
 */
export interface AddContactResult {
  success: boolean;
  message: string;
  book: ContactBook;
}

export function addContact(
  contactBook: ContactBook,
  nameInput: string,
  phoneInput: string,
  emailInput: string,
  addressInput: string,
  extra?: { category?: ContactDetails['category']; favorite?: boolean; notes?: string }
): AddContactResult {
  const name = nameInput.trim();
  if (!name) {
    return {
      success: false,
      message: "Please enter a valid name.",
      book: contactBook
    };
  }

  // Case-insensitive or direct key check - check if name key already exists
  const existingKey = Object.keys(contactBook).find(
    k => k.toLowerCase() === name.toLowerCase()
  );

  if (existingKey || name in contactBook) {
    return {
      success: false,
      message: "Contact already exists!",
      book: contactBook
    };
  }

  const phone = phoneInput.trim();
  const email = emailInput.trim();
  const address = addressInput.trim();

  const newBook: ContactBook = {
    ...contactBook,
    [name]: {
      phone,
      email,
      address,
      category: extra?.category || 'Personal',
      favorite: extra?.favorite ?? false,
      notes: extra?.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  saveContactBook(newBook);

  return {
    success: true,
    message: "Contact added successfully!",
    book: newBook
  };
}

/**
 * Python Reference: view_contact(contact_book)
 * 
 * name = input("Enter name to view: ").strip()
 * if name in contact_book:
 *     print(f"Name: {name}")
 *     print(f"Phone: {contact_book[name]['phone']}")
 *     ...
 * else:
 *     print("Contact not found!")
 */
export interface ViewContactResult {
  found: boolean;
  name?: string;
  details?: ContactDetails;
  message?: string;
}

export function viewContact(contactBook: ContactBook, nameInput: string): ViewContactResult {
  const name = nameInput.trim();
  if (name in contactBook) {
    return {
      found: true,
      name,
      details: contactBook[name]
    };
  }
  
  // Case-insensitive fallback
  const matchingKey = Object.keys(contactBook).find(k => k.toLowerCase() === name.toLowerCase());
  if (matchingKey && contactBook[matchingKey]) {
    return {
      found: true,
      name: matchingKey,
      details: contactBook[matchingKey]
    };
  }

  return {
    found: false,
    message: "Contact not found!"
  };
}

/**
 * Python Reference: edit_contact(contact_book)
 * 
 * name = input("Enter name to edit: ").strip()
 * if name in contact_book:
 *     print("Leave field blank to keep current value.")
 *     phone = input(f"New phone [{contact_book[name]['phone']}]: ").strip()
 *     email = input(f"New email [{contact_book[name]['email']}]: ").strip()
 *     address = input(f"New address [{contact_book[name]['address']}]: ").strip()
 *     # updates stored...
 *     print("Contact updated successfully!")
 */
export interface EditContactUpdates {
  phone?: string;
  email?: string;
  address?: string;
  category?: ContactDetails['category'];
  favorite?: boolean;
  notes?: string;
}

export interface EditContactResult {
  success: boolean;
  message: string;
  book: ContactBook;
}

export function editContact(
  contactBook: ContactBook,
  name: string,
  updates: EditContactUpdates
): EditContactResult {
  if (!(name in contactBook)) {
    return {
      success: false,
      message: "Contact not found!",
      book: contactBook
    };
  }

  const existing = contactBook[name];

  // Python rule: "Leave field blank to keep current value."
  // If the provided string is empty or undefined, keep current value.
  const newPhone = updates.phone !== undefined && updates.phone.trim() !== '' 
    ? updates.phone.trim() 
    : existing.phone;

  const newEmail = updates.email !== undefined && updates.email.trim() !== '' 
    ? updates.email.trim() 
    : existing.email;

  const newAddress = updates.address !== undefined && updates.address.trim() !== '' 
    ? updates.address.trim() 
    : existing.address;

  const newCategory = updates.category !== undefined 
    ? updates.category 
    : existing.category;

  const newFavorite = updates.favorite !== undefined 
    ? updates.favorite 
    : existing.favorite;

  const newNotes = updates.notes !== undefined 
    ? updates.notes 
    : existing.notes;

  const newBook: ContactBook = {
    ...contactBook,
    [name]: {
      ...existing,
      phone: newPhone,
      email: newEmail,
      address: newAddress,
      category: newCategory,
      favorite: newFavorite,
      notes: newNotes,
      updatedAt: new Date().toISOString()
    }
  };

  saveContactBook(newBook);

  return {
    success: true,
    message: "Contact updated successfully!",
    book: newBook
  };
}

/**
 * Python Reference: delete_contact(contact_book)
 * 
 * name = input("Enter name to delete: ").strip()
 * if name in contact_book:
 *     del contact_book[name]
 *     print("Contact deleted successfully!")
 * else:
 *     print("Contact not found!")
 */
export interface DeleteContactResult {
  success: boolean;
  message: string;
  book: ContactBook;
}

export function deleteContact(contactBook: ContactBook, name: string): DeleteContactResult {
  if (!(name in contactBook)) {
    return {
      success: false,
      message: "Contact not found!",
      book: contactBook
    };
  }

  const newBook = { ...contactBook };
  delete newBook[name];

  saveContactBook(newBook);

  return {
    success: true,
    message: "Contact deleted successfully!",
    book: newBook
  };
}

/**
 * Python Reference: list_all_contacts(contact_book)
 * 
 * if not contact_book:
 *     print("Contact book is empty.")
 *     return
 * for name, details in contact_book.items():
 *     print(f"- {name}: {details['phone']}")
 */
export function listAllContacts(contactBook: ContactBook): ContactEntry[] {
  return Object.entries(contactBook).map(([name, details]) => ({
    name,
    details
  }));
}

/**
 * Toggle favorite state helper
 */
export function toggleFavoriteContact(contactBook: ContactBook, name: string): ContactBook {
  if (!contactBook[name]) return contactBook;
  const current = !!contactBook[name].favorite;
  const updatedBook = {
    ...contactBook,
    [name]: {
      ...contactBook[name],
      favorite: !current,
      updatedAt: new Date().toISOString()
    }
  };
  saveContactBook(updatedBook);
  return updatedBook;
}
