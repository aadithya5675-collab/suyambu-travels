import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { createWhatsAppURL } from '../utils/whatsapp';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { CloseIcon, SeatIcon } from './icons/Icons';
import { useMediaQuery } from '../utils/useMediaQuery';

export function BookingPanel({ isOpen, onClose, vehicles, initialVehicleId = null }) {
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicleId);
  const [travelDate, setTravelDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen && initialVehicleId) {
      setSelectedVehicle(initialVehicleId);
    }
  }, [isOpen, initialVehicleId]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      // Focus the panel or first focusable element inside
      if (panelRef.current) {
        panelRef.current.focus();
      }
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Simple focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="booking-panel-portal" style={{ position: 'fixed', inset: 0, zIndex: 9100, display: 'flex', justifyContent: 'flex-end' }}>
          {/* Backdrop */}
          <motion.div 
            className="booking-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(18, 20, 17, 0.5)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 9101
            }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Side Panel / Bottom Sheet Drawer */}
          <motion.div 
            ref={panelRef}
            tabIndex={-1}
            className="booking-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-panel-title"
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: '0%' } : { x: '0%' }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 340 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: isMobile ? '100%' : '460px',
              height: isMobile ? 'auto' : '100%',
              maxHeight: isMobile ? '85vh' : '100%',
              marginTop: isMobile ? 'auto' : 0,
              borderRadius: isMobile ? '24px 24px 0 0' : 0,
              backgroundColor: 'var(--bg-surface)',
              boxShadow: 'var(--shadow-hover)',
              zIndex: 9102,
              display: 'flex',
              flexDirection: 'column',
              outline: 'none'
            }}
          >
            {/* Panel Header */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="eyebrow" style={{ margin: 0 }}>BOOK YOUR RIDE</span>
                <button 
                  onClick={onClose} 
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-dark)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} 
                  aria-label="Close booking panel"
                >
                  <CloseIcon size={20} />
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
                  {vehicles.map(v => {
                    const isSelected = selectedVehicle === v.id;
                    return (
                      <motion.button 
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVehicle(v.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${isSelected ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                          backgroundColor: isSelected ? 'var(--color-green-light)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background-color 0.2s, border-color 0.2s'
                        }}
                        aria-pressed={isSelected}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '16px', height: '16px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {isSelected && (
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-green-dark)' }} />
                            )}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>{v.name}</span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <SeatIcon size={13} />
                          {v.seats} Seats
                        </span>
                      </motion.button>
                    );
                  })}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
