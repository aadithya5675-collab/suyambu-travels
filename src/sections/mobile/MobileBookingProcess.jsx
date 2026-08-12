import React from 'react';
import { Button } from '../../components/Button';
import { businessData } from '../../data/business';

export function MobileBookingProcess({ onBook }) {
  const steps = [
    { num: '01', title: 'Choose vehicle', desc: 'Select model for your group size.' },
    { num: '02', title: 'Contact us', desc: `Call or WhatsApp ${businessData.phone}.` },
    { num: '03', title: 'Pay advance', desc: `${businessData.advance} non-refundable advance.` },
    { num: '04', title: 'Start journey', desc: 'Enjoy comfortable outstation travel.' }
  ];

  return (
    <section className="mobile-booking-section" id="booking">
      <div className="container">
        <span className="eyebrow">HOW TO BOOK</span>
        <h2 className="heading-md" style={{ marginBottom: '20px' }}>Booking is simple.</h2>

        <div className="mobile-booking-steps">
          {steps.map(s => (
            <div key={s.num} className="mobile-booking-step-item">
              <span className="mobile-booking-num">{s.num}</span>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text-dark)' }}>{s.title}</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="dark" 
          onClick={() => onBook(null)}
          style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
        >
          Book on WhatsApp
        </Button>
      </div>
    </section>
  );
}
