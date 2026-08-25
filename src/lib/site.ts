export const SITE_URL = 'https://ricardonieblas.com';

export const LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en';

export const CONTACT = {
  email: 'hello@ricardonieblas.com',
  /** E.164, digits only. This is the format wa.me expects. */
  whatsappNumber: '526634343930',
  /** Human-readable, for display. */
  whatsappDisplay: '+52 663 434 3930',
} as const;

/** WhatsApp deep link with a pre-filled message in the visitor's language. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
