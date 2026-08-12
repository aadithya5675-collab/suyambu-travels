import React from 'react';
import { businessData } from '../data/business';
import { createWhatsAppURL } from '../utils/whatsapp';

export function MobileBookingBar() {
  return (
    <div className="mobile-action-bar">
      <div className="mobile-action-grid">
        <a href={`tel:${businessData.phoneTel}`} className="mobile-action-btn call-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          Call
        </a>
        <a href={createWhatsAppURL()} target="_blank" rel="noopener noreferrer" className="mobile-action-btn wa-btn">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
