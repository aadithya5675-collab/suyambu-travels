import React, { useState } from 'react';

export function MobilePricingAccordion({ vehicles, onBook }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mobile-pricing-section" id="pricing">
      <div className="container">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mobile-pricing-toggle"
          aria-expanded={expanded}
        >
          <div>
            <span className="eyebrow" style={{ display: 'block', margin: 0 }}>FARES & RATES</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-text-dark)' }}>Starting Fares</strong>
          </div>
          <span className="mobile-pricing-toggle-icon">{expanded ? '−' : '+'}</span>
        </button>

        {expanded && (
          <div className="mobile-pricing-content">
            <div className="mobile-pricing-table">
              {vehicles.map(v => (
                <div key={v.id} className="mobile-pricing-row">
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block' }}>{v.name}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{v.seats} Seater • {v.ac ? 'AC' : 'Non-AC'}</span>
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
          </div>
        )}
      </div>
    </section>
  );
}
