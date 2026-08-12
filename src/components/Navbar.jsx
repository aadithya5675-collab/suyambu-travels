import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from './Button';
import { businessData } from '../data/business';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';

export function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const mobileMenuRef = useRef(null);
  const navLinksRef = useRef([]);

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      if (mobileMenuRef.current) {
        mobileMenuRef.current.style.display = 'flex';
        
        anime.timeline({ easing: 'easeOutQuad' })
          .add({
            targets: mobileMenuRef.current,
            opacity: [0, 1],
            duration: 300
          })
          .add({
            targets: navLinksRef.current,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 400
          }, '-=100');
      }
    } else {
      if (mobileMenuRef.current) {
        anime.timeline({ easing: 'easeInQuad' })
          .add({
            targets: navLinksRef.current.slice().reverse(),
            translateY: [0, 20],
            opacity: [1, 0],
            delay: anime.stagger(50),
            duration: 250
          })
          .add({
            targets: mobileMenuRef.current,
            opacity: [1, 0],
            duration: 250,
            complete: () => { mobileMenuRef.current.style.display = 'none'; }
          }, '-=100');
      }
      document.removeEventListener('keydown', handleKeyDown);
    }
    
    return () => { 
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Booking', href: '#booking' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="brand-logo" onClick={closeMenu}>{businessData.name}</a>
          
          <nav className="desktop-nav">
            <ul className="nav-menu" style={{ display: 'flex' }}>
              {navItems.map(item => (
                <li key={item.label}><a href={item.href} className="nav-link">{item.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <Button variant="white" onClick={() => onBook(null)} className="desktop-book-btn">
              Book Now
            </Button>
            <button className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className="mobile-menu-overlay"
        style={{
          display: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'var(--bg-page)', zIndex: 1100,
          flexDirection: 'column', padding: '120px 32px 32px'
        }}
      >
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {navItems.map((item, i) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={closeMenu}
              ref={el => navLinksRef.current[i] = el}
              style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-dark)', textDecoration: 'none', opacity: 0 }}
            >
              {item.label}
            </a>
          ))}
          <div ref={el => navLinksRef.current[navItems.length] = el} style={{ opacity: 0, marginTop: '32px' }}>
            <Button variant="dark" onClick={() => { closeMenu(); onBook(null); }} style={{ width: '100%' }}>
              Book Your Ride
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
