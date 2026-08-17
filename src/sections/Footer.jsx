import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessData } from '../data/business';
import { CallIcon, LocationIcon, ArrowUpRightIcon, StarIcon } from '../components/icons/Icons';

gsap.registerPlugin(ScrollTrigger);

export function Footer({ enableGSAP = true }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !enableGSAP) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Calm visual resting point entrance (y: 30 -> 0, opacity: 0 -> 1)
        gsap.fromTo(footerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, [enableGSAP]);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <a href="#" className="brand-logo">{businessData.name.toUpperCase()}</a>
            <p className="footer-desc">
              Comfortable AC travel from Coimbatore for your journeys near and far. Outstation travel ready to drive anywhere.
            </p>
            <div className="footer-experience-badge">
              <StarIcon size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
              {businessData.experience} of Travel Experience
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#fleet" className="footer-link">Fleet</a></li>
              <li><a href="#pricing" className="footer-link">Pricing</a></li>
              <li><a href="#booking" className="footer-link">Booking</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact-item">
              <CallIcon size={18} className="footer-icon" style={{ flexShrink: 0 }} />
              <div>
                <strong>Phone / WhatsApp:</strong><br/>
                <a href={`tel:${businessData.phoneTel}`} className="footer-link">{businessData.phoneDisplay}</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <LocationIcon size={18} className="footer-icon" style={{ flexShrink: 0 }} />
              <div>
                <strong>Location:</strong><br/>
                {businessData.location}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <a
                href={businessData.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-maps-btn"
              >
                <LocationIcon size={14} style={{ flexShrink: 0 }} />
                <span>View on Google Maps</span>
                <ArrowUpRightIcon size={12} style={{ flexShrink: 0, opacity: 0.75 }} />
              </a>
            </div>
          </div>

          {/* Col 4: Payment Methods */}
          <div>
            <h4 className="footer-title">Payment Options</h4>
            <p className="body-sm" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              We accept convenient payment options for advance and journey settlement:
            </p>
            <div className="footer-payment-tags">
              {businessData.payments.map(p => (
                <span key={p} className="payment-tag">{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {businessData.name}. All rights reserved.</p>
          <p>Saravanampatti, Coimbatore • Outstation Travel Ready</p>
        </div>
      </div>
    </footer>
  );
}
