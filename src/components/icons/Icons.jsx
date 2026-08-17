import React from 'react';

export function CallIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M21.97 18.33c-.39 1.72-1.89 3.03-3.69 3.14-2.83.17-6.99-1.28-10.4-4.69C4.47 13.37 3.02 9.21 3.19 6.38c.11-1.8 1.42-3.3 3.14-3.69l2.45-.55c.98-.22 1.99.31 2.37 1.25l1.09 2.72c.32.8.12 1.72-.51 2.31l-1.32 1.24c1.19 2.39 3.14 4.34 5.53 5.53l1.24-1.32c.59-.63 1.51-.83 2.31-.51l2.72 1.09c.94.38 1.47 1.39 1.25 2.37l-.49 2.1z" />
    </svg>
  );
}

export function LocationIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 13.43a3.18 3.18 0 1 0 0-6.36 3.18 3.18 0 0 0 0 6.36z" />
      <path d="M3.62 10.09c1.97-8.66 14.79-8.65 16.76 0 1.15 5.08-2.01 9.38-4.78 12.04a5.64 5.64 0 0 1-7.2 0c-2.77-2.66-5.93-6.96-4.78-12.04z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M17.5 6.5A8.5 8.5 0 0 0 3.3 14.7L2 21.5l7-1.3A8.5 8.5 0 1 0 17.5 6.5z" />
      <path d="M9.5 9.5c.2-.5.5-.5.8-.5h.6c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.4.5c-.1.2-.3.2-.2.5.5.9 1.4 1.8 2.3 2.3.3.1.4 0 .5-.2l.5-.4c.2-.2.4-.2.7-.1l1.7.7c.3.1.4.3.4.5v.6c0 .3-.1.6-.5.8-.5.3-1.4.4-2.5 0-1.8-.7-3.3-2.2-4-4-.4-1.1-.3-2 0-2.5z" />
    </svg>
  );
}

export function SeatIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M5 19v2M19 19v2M4 11V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5" />
      <path d="M2 15a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z" />
    </svg>
  );
}

export function AirConditionerIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11M12 6l2-2M12 18l-2 2M6 12l-2-2M18 12l2 2" />
    </svg>
  );
}

export function ShieldIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function RouteIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M6 18L18 6M8.25 6H18v9.75" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M19.92 8.95l-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M8.95 4.08l6.52 6.52c.77.77.77 2.03 0 2.8L8.95 19.92" />
    </svg>
  );
}

export function CloseIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function MenuIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function CompassIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

export function CheckIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function CalendarIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function ClockIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function CarIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C1.4 11.2 1 12 1 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function MapPinIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function StarIcon({ size = 18, className = '', color = 'currentColor', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
