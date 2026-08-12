import React from 'react';
import { Button } from '../../components/Button';
import { businessData } from '../../data/business';
import { createWhatsAppURL } from '../../utils/whatsapp';

export function MobileHero() {
  return (
    <section className="mobile-hero" id="home">
      {/* Static Optimized Photo Background */}
      <div className="mobile-hero-bg">
        <img 
          src="/assets/hero/hero-bg.jpg" 
          alt="Suyambu Travels Outstation Taxi Coimbatore" 
          loading="eager"
        />
        <div className="mobile-hero-overlay"></div>
      </div>

      <div className="container mobile-hero-content">
        <span className="eyebrow mobile-hero-eyebrow">COIMBATORE • OUTSTATION TRAVEL</span>
        
        <h1 className="heading-lg mobile-hero-title">
          Your Journey.<br />
          Our Drive.
        </h1>

        <p className="body-md mobile-hero-subtitle">
          Comfortable AC travel from Coimbatore.
        </p>

        {/* Immediate Thumb CTAs */}
        <div className="mobile-hero-actions">
          <Button 
            variant="white" 
            href={createWhatsAppURL()} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            WhatsApp Booking
          </Button>

          <Button 
            variant="outline-light" 
            href={`tel:${businessData.phoneTel}`}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Call Now
          </Button>
        </div>

        {/* Bottom Compact Trust Bar */}
        <div className="mobile-hero-trust-bar">
          <span>8 Years Exp</span>
          <span className="dot">•</span>
          <span>All AC Fleet</span>
          <span className="dot">•</span>
          <span>Outstation Travel</span>
        </div>
      </div>
    </section>
  );
}
