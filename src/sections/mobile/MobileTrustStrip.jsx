import React from 'react';

export function MobileTrustStrip() {
  return (
    <section className="mobile-trust-strip">
      <div className="container">
        <div className="mobile-trust-grid">
          <div className="mobile-trust-item">
            <span className="mobile-trust-num">08</span>
            <span className="mobile-trust-lbl">Years Exp</span>
          </div>
          <div className="mobile-trust-divider"></div>
          <div className="mobile-trust-item">
            <span className="mobile-trust-num">AC</span>
            <span className="mobile-trust-lbl">All Fleet</span>
          </div>
          <div className="mobile-trust-divider"></div>
          <div className="mobile-trust-item">
            <span className="mobile-trust-num">24/7</span>
            <span className="mobile-trust-lbl">Outstation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
