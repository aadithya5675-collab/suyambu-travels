import React from 'react';
import { Button } from '../../components/Button';
import { createWhatsAppURL } from '../../utils/whatsapp';
import { businessData } from '../../data/business';
import { CallIcon, WhatsAppIcon } from '../../components/icons/Icons';

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <Button 
            variant="white" 
            href={`tel:${businessData.phoneTel}`} 
            hasArrow={false}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <CallIcon size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
            Call Us Now
          </Button>
          <Button 
            variant="outline-light" 
            href={createWhatsAppURL()} 
            target="_blank" 
            rel="noopener noreferrer" 
            hasArrow={false}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <WhatsAppIcon size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
            WhatsApp Booking
          </Button>
        </div>
      </div>
    </section>
  );
}
