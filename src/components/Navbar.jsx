import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { businessData } from '../data/business';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';

export function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
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

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
        when: 'afterChildren'
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 16 },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="brand-logo" onClick={closeMenu}>{businessData.name}</a>
          
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-menu" style={{ display: 'flex' }}>
              {navItems.map(item => (
                <li key={item.label}>
                  <a href={item.href} className="nav-link">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <Button variant="white" onClick={() => onBook(null)} className="desktop-book-btn">
              Book Now
            </Button>
            <button
              className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay with Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--bg-page, #F7F5F0)',
              zIndex: 1100,
              display: 'flex',
              flexDirection: 'column',
              padding: '120px 32px 32px'
            }}
          >
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }} aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <motion.a 
                  key={item.label} 
                  href={item.href} 
                  onClick={closeMenu}
                  variants={itemVariants}
                  style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-dark, #1B2E23)', textDecoration: 'none' }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
                <Button variant="dark" onClick={() => { closeMenu(); onBook(null); }} style={{ width: '100%' }}>
                  Book Your Ride
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
