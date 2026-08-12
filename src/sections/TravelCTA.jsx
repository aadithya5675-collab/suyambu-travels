import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { RevealText } from '../components/RevealText';
import { CinematicShaderImage } from '../motion/shaders/CinematicShaderImage';
import { businessData } from '../data/business';
import { createWhatsAppURL } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

export function TravelCTA() {
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
  }, []);

  return (
    <section ref={ctaRef} className="cta-section" id="contact">
      <div className="cta-bg-wrap" ref={bgRef}>
        <CinematicShaderImage src="/assets/cta/cta-bg.jpg" alt="Outstation Road Journey Landscape" className="cta-bg-img" enableShader={false} />
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Us Now
            </Button>
          </span>
          <span>
            <Button variant="outline-light" href={createWhatsAppURL()} target="_blank" rel="noopener noreferrer" hasArrow={false}>
              WhatsApp Booking
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}
