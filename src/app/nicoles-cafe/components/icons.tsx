import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

export function ArrowIcon(p: P) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function ScrollIcon(p: P) {
  return (
    <svg viewBox="0 0 20 20" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

export function WaIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...p}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.27-4.39c0-4.54 3.7-8.24 8.24-8.24a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.06s.88 2.39 1.01 2.55c.12.16 1.73 2.64 4.18 3.71.58.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

export function IgIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function FbIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.9.3-1.5 1.6-1.5h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10.5h-2.7v3h2.7V21h2.6z" />
    </svg>
  );
}

export function TtIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.5-1.6c-.4-.5-.6-1-.7-1.6V3h-3v12.4c0 1.4-1.1 2.5-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5.3 0 .5 0 .8.1V9.9c-.3 0-.5-.1-.8-.1A5.5 5.5 0 0 0 4.4 15.4a5.5 5.5 0 0 0 5.5 5.5 5.5 5.5 0 0 0 5.5-5.5V9.5a7.8 7.8 0 0 0 4.2 1.3v-3a4.7 4.7 0 0 1 0-1.1z" />
    </svg>
  );
}

export function PinIcon(p: P) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
      <path d="M10 18s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

export function PhoneIcon(p: P) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
      <path d="M4 4c0 7 5 12 12 12l1.5-3-3.5-1-2 2c-2-1-3.5-2.5-4.5-4.5l2-2-1-3.5L5 5z" />
    </svg>
  );
}

export function CheckIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" {...p}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function DownloadIcon(p: P) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
      <path d="M10 3v11m0 0l-4-4m4 4l4-4M4 17h12" />
    </svg>
  );
}

export function HeartIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M12 21s-7-4.5-9.5-9c-1.3-2.4-.5-5.6 2-7 2.2-1.2 4.5-.2 5.6 1.5l1.9 2.3 1.9-2.3c1.1-1.7 3.4-2.7 5.6-1.5 2.5 1.4 3.3 4.6 2 7C19 16.5 12 21 12 21z" />
    </svg>
  );
}

export function MsgIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M4 4h16v12H7l-3 3z" />
    </svg>
  );
}
