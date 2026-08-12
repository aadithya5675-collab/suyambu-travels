import React from 'react';
import { businessData } from '../../data/business';

export function MobileFooter() {
  return (
    <footer className="mobile-footer">
      <div className="container">
        <h3 className="heading-sm" style={{ color: 'var(--color-white)', marginBottom: '4px' }}>
          {businessData.name.toUpperCase()}
        </h3>
        <p className="body-sm" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 16px 0', fontSize: '0.82rem' }}>
          {businessData.location} • {businessData.phoneDisplay}
        </p>

        <div className="mobile-footer-links">
          <a href={businessData.mapsUrl} target="_blank" rel="noopener noreferrer">
            Maps ↗
          </a>
          <a href={`tel:${businessData.phoneTel}`}>Call</a>
          <a href="#home">Back to top ↑</a>
        </div>

        <div className="mobile-footer-payments" style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {businessData.payments.map(p => (
            <span key={p} className="payment-tag" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>{p}</span>
          ))}
        </div>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
          © {new Date().getFullYear()} {businessData.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
