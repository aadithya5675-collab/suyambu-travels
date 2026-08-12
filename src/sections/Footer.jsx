import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessData } from '../data/business';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
  }, []);

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
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
              <svg className="footer-icon" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <div>
                <strong>Phone / WhatsApp:</strong><br/>
                <a href={`tel:${businessData.phoneTel}`} className="footer-link">{businessData.phoneDisplay}</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <svg className="footer-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View on Google Maps
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, opacity: 0.7 }}>
                  <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
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
