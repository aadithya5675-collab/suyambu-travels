import React from 'react';
import { Button } from '../../components/Button';
import { createWhatsAppURL } from '../../utils/whatsapp';

export function MobileTravelCTA() {
  return (
    <section className="mobile-cta-section" id="contact">
      <div className="mobile-cta-bg">
        <img src="/assets/cta/cta-bg.jpg" alt="Outstation Road Journey" loading="lazy" />
        <div className="mobile-cta-overlay" />
      </div>

      <div className="container mobile-cta-content">
        <span className="eyebrow eyebrow-white">READY TO TRAVEL?</span>
        <h2 className="heading-md" style={{ color: 'var(--color-white)', marginBottom: '16px' }}>
          Wherever you're going,<br />we're ready to drive.
        </h2>
        <Button 
          variant="white" 
          href={createWhatsAppURL()} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          WhatsApp Us
        </Button>
      </div>
    </section>
  );
}
