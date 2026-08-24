export interface ContactDetails {
  phone: string;
  email: string;
  address: string;
  category?: 'Personal' | 'Work' | 'Family' | 'VIP' | 'Other';
  favorite?: boolean;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Core Python contact_book structure representation:
 * {
 *   "Name": {
 *     "phone": "...",
 *     "email": "...",
 *     "address": "..."
 *   }
 * }
 */
export type ContactBook = Record<string, ContactDetails>;

export interface ContactEntry {
  name: string;
  details: ContactDetails;
}

export type SortOption = 'name-asc' | 'name-desc' | 'recent' | 'category';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
}
