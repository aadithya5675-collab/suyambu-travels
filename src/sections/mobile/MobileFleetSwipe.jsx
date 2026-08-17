import React, { useState, useRef } from 'react';
import { SeatIcon, AirConditionerIcon } from '../../components/icons/Icons';

export function MobileFleetSwipe({ vehicles, onBook }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const track = scrollRef.current;
    const scrollLeft = track.scrollLeft;

    let minDiff = Infinity;
    let closestIndex = 0;

    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;
      const diff = Math.abs(cardEl.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollToCard = (index) => {
    const targetCard = cardRefs.current[index];
    if (targetCard && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: targetCard.offsetLeft - 20,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mobile-fleet-section" id="fleet">
      <div className="container" style={{ paddingBottom: '16px' }}>
        <span className="eyebrow">OUR FLEET</span>
        <h2 className="heading-md" style={{ marginBottom: '4px' }}>Choose your ride.</h2>
        <p className="body-sm" style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
          Swipe to explore
        </p>
      </div>

      {/* Horizontal Swipe Container */}
      <div 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="mobile-fleet-snap-track"
      >
        {vehicles.map((v, i) => (
          <div 
            key={v.id} 
            ref={el => cardRefs.current[i] = el}
            className="mobile-fleet-card"
          >
            <div className="mobile-fleet-card-img-wrap">
              <img 
                src={v.image} 
                alt={v.name} 
                loading={i === 0 ? 'eager' : 'lazy'} 
              />
            </div>
            <div className="mobile-fleet-card-body">
              <div>
                <h3 className="heading-sm" style={{ margin: 0 }}>{v.name}</h3>
                <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <SeatIcon size={13} />
                  <span>{v.seats} Seater</span>
                  <span>•</span>
                  <AirConditionerIcon size={13} />
                  <span>{v.ac ? 'AC' : 'Non-AC'}</span>
                </span>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-dark)' }}>{v.price}</span>
                  {v.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>/ {v.package}</span>}
                </div>
                <button 
                  onClick={() => onBook(v.id)}
                  className="mobile-fleet-enquire-btn"
                  aria-label={`Enquire about ${v.name}`}
                >
                  Enquire →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Accessible Dot Indicators */}
      <div className="mobile-fleet-dots" role="tablist" aria-label="Fleet vehicle selector">
        {vehicles.map((v, index) => (
          <button 
            key={v.id}
            onClick={() => scrollToCard(index)}
            className={`mobile-fleet-dot ${activeIndex === index ? 'active' : ''}`}
            aria-label={`View ${v.name}`}
            role="tab"
            aria-selected={activeIndex === index}
          />
        ))}
      </div>
    </section>
  );
}
