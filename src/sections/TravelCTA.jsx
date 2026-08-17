import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { businessData } from '../data/business';
import { createWhatsAppURL } from '../utils/whatsapp';
import { CallIcon, WhatsAppIcon } from '../components/icons/Icons';

gsap.registerPlugin(ScrollTrigger);

export function TravelCTA({ enableGSAP = true }) {
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (!enableGSAP) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(bgRef.current,
          { scale: 1.06, y: '5%' },
          {
            scale: 1,
            y: '-3%',
            ease: 'none',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }, ctaRef);

    return () => ctx.revert();
  }, [enableGSAP]);

  return (
    <section ref={ctaRef} className="cta-section" id="contact">
      <div className="cta-bg-wrap" ref={bgRef}>
        <img 
          src="/assets/cta/cta-bg.jpg" 
          alt="Outstation Road Journey Landscape" 
          className="cta-bg-img" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="cta-overlay"></div>
      </div>

      <div className="container cta-content">
        <span className="eyebrow eyebrow-white">READY TO TRAVEL?</span>
        
        <h2 className="heading-lg" style={{ marginBottom: '38px', color: 'var(--color-white)' }}>
          <span>Wherever you're going,</span>
          <br/>
          <span>we're ready to drive.</span>
        </h2>
        
        <div className="cta-buttons">
          <span>
            <Button variant="white" href={`tel:${businessData.phoneTel}`} hasArrow={false}>
              <CallIcon size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
              Call Us Now
            </Button>
          </span>
          <span>
            <Button variant="outline-light" href={createWhatsAppURL()} target="_blank" rel="noopener noreferrer" hasArrow={false}>
              <WhatsAppIcon size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
              WhatsApp Booking
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}
