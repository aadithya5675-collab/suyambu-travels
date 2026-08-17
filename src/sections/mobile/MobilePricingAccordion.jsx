import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDownIcon, SeatIcon } from '../../components/icons/Icons';

export function MobilePricingAccordion({ vehicles, onBook }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mobile-pricing-section" id="pricing">
      <div className="container">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mobile-pricing-toggle"
          aria-expanded={expanded}
          aria-controls="mobile-pricing-panel"
        >
          <div>
            <span className="eyebrow" style={{ display: 'block', margin: 0 }}>FARES & RATES</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)' }}>Starting Fares</strong>
          </div>
          <motion.span 
            className="mobile-pricing-toggle-icon"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <ChevronDownIcon size={20} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div 
              id="mobile-pricing-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
              style={{ overflow: 'hidden' }}
              className="mobile-pricing-content"
            >
              <div className="mobile-pricing-table">
                {vehicles.map(v => (
                  <div key={v.id} className="mobile-pricing-row">
                    <div>
                      <strong style={{ fontSize: '0.95rem', display: 'block' }}>{v.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <SeatIcon size={12} />
                        {v.seats} Seater • {v.ac ? 'AC' : 'Non-AC'}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div>
                        <strong style={{ fontSize: '0.92rem' }}>{v.price}</strong>
                        {v.package && <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>/ {v.package}</span>}
                      </div>
                      <button 
                        onClick={() => onBook(v.id)} 
                        style={{ color: 'var(--color-green-dark)', fontWeight: 700, fontSize: '0.85rem' }}
                        aria-label={`Enquire about ${v.name}`}
                      >
                        Enquire →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="body-sm" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '12px', margin: 0 }}>
                * Fares listed per 100 km where applicable. Final fare confirmed during booking.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
