import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from './Button';
import { createWhatsAppURL } from '../utils/whatsapp';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';

export function BookingPanel({ isOpen, onClose, vehicles, initialVehicleId = null }) {
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicleId);
  const [isMounted, setIsMounted] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');

  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useBodyScrollLock(isOpen);

  // Mount/Unmount lifecycle with responsive Anime.js animation
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isOpen) {
      setIsMounted(true);
      if (initialVehicleId) setSelectedVehicle(initialVehicleId);
      previousFocusRef.current = document.activeElement;
    } else if (isMounted) {
      // Closing animation before unmounting
      if (backdropRef.current && panelRef.current) {
        anime({
          targets: backdropRef.current,
          opacity: [1, 0],
          duration: 250,
          easing: 'easeInQuad'
        });

        anime({
          targets: panelRef.current,
          translateX: isMobile ? '0%' : ['0%', '100%'],
          translateY: isMobile ? ['0%', '100%'] : '0%',
          duration: 300,
          easing: 'easeInCubic',
          complete: () => {
            setIsMounted(false);
            if (previousFocusRef.current) {
              previousFocusRef.current.focus();
            }
          }
        });
      } else {
        setIsMounted(false);
      }
    }
  }, [isOpen, initialVehicleId, isMounted]);

  // Entrance animation when mounted
  useEffect(() => {
    if (isMounted && isOpen) {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      if (backdropRef.current && panelRef.current) {
        anime({
          targets: backdropRef.current,
          opacity: [0, 1],
          duration: 250,
          easing: 'easeOutQuad'
        });

        anime({
          targets: panelRef.current,
          translateX: isMobile ? '0%' : ['100%', '0%'],
          translateY: isMobile ? ['100%', '0%'] : '0%',
          duration: 350,
          easing: 'easeOutCubic',
          complete: () => {
            closeButtonRef.current?.focus();
          }
        });
      }
    }
  }, [isMounted, isOpen]);

  // Keyboard Accessibility: Escape key & Focus Trap
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMounted, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find(v => v.id === selectedVehicle);
    const details = {
      date: travelDate,
      pickup: pickupLocation,
      destination: destination
    };
    const url = createWhatsAppURL(v?.name || '', details);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleVehicleSelect = (id, el) => {
    setSelectedVehicle(id);
    if (el) {
      anime({
        targets: el,
        scale: [0.98, 1],
        duration: 250,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        ref={backdropRef}
        className="booking-backdrop"
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(18, 20, 17, 0.45)',
          backdropFilter: 'blur(4px)',
          zIndex: 9000,
          opacity: 0
        }}
        onClick={onClose}
      />
      
      {/* Side Panel / Bottom Sheet Drawer */}
      <div 
        ref={panelRef}
        className="booking-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-panel-title"
        style={{
          position: 'fixed',
          top: 0, right: 0,
          width: '100%', maxWidth: '440px', height: '100%',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-hover)',
          zIndex: 9100,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Panel Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="eyebrow" style={{ margin: 0 }}>BOOK YOUR RIDE</span>
            <button 
              ref={closeButtonRef} 
              onClick={onClose} 
              style={{ fontSize: '1.5rem', lineHeight: 1, color: 'var(--color-text-dark)', background: 'none', border: 'none', cursor: 'pointer' }} 
              aria-label="Close booking panel"
            >
              &times;
            </button>
          </div>
          <h2 id="booking-panel-title" className="heading-sm" style={{ margin: 0 }}>Enquire or Book via WhatsApp</h2>
        </div>
        
        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Vehicle Selection */}
          <div>
            <label className="eyebrow" style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              SELECT VEHICLE
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {vehicles.map(v => (
                <button 
                  key={v.id}
                  type="button"
                  onClick={(e) => handleVehicleSelect(v.id, e.currentTarget)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${selectedVehicle === v.id ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                    backgroundColor: selectedVehicle === v.id ? 'var(--color-green-light)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.2s, border-color 0.2s'
                  }}
                  aria-pressed={selectedVehicle === v.id}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '16px', height: '16px',
                      borderRadius: '50%',
                      border: `2px solid ${selectedVehicle === v.id ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {selectedVehicle === v.id && (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-green-dark)' }} />
                      )}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>{v.name}</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{v.seats} Seats</span>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Date */}
          <div>
            <label htmlFor="booking-date" className="eyebrow" style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              TRAVEL DATE (OPTIONAL)
            </label>
            <input 
              id="booking-date"
              type="date" 
              value={travelDate} 
              onChange={(e) => setTravelDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '0.9rem',
                color: 'var(--color-text-dark)'
              }}
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label htmlFor="booking-pickup" className="eyebrow" style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              PICKUP LOCATION (OPTIONAL)
            </label>
            <input 
              id="booking-pickup"
              type="text" 
              placeholder="e.g. Saravanampatti, Coimbatore" 
              value={pickupLocation} 
              onChange={(e) => setPickupLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '0.9rem',
                color: 'var(--color-text-dark)'
              }}
            />
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="booking-dest" className="eyebrow" style={{ display: 'block', marginBottom: '6px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              DESTINATION (OPTIONAL)
            </label>
            <input 
              id="booking-dest"
              type="text" 
              placeholder="e.g. Ooty, Munnar, Kodaikanal" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '0.9rem',
                color: 'var(--color-text-dark)'
              }}
            />
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <Button variant="dark" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Continue on WhatsApp →
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
