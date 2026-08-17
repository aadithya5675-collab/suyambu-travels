import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { RevealUp } from '../components/RevealText';
import { motionDistance } from '../motion/motionTokens';
import { SeatIcon, AirConditionerIcon } from '../components/icons/Icons';

gsap.registerPlugin(ScrollTrigger);

function PricingRow({ vehicle, onBook, rowRef }) {
  return (
    <motion.div 
      ref={rowRef}
      className="pricing-list-row"
      whileHover="hover"
      initial="initial"
      style={{ position: 'relative' }}
    >
      <motion.div 
        variants={{
          initial: { x: 0 },
          hover: { x: 8, transition: { duration: 0.2, ease: 'easeOut' } }
        }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', flexWrap: 'wrap', gap: '16px' }}
      >
        <div style={{ flex: '1 1 200px' }}>
          <h3 className="heading-sm" style={{ margin: 0, fontSize: '1.25rem' }}>{vehicle.name}</h3>
          <p className="body-sm" style={{ color: 'var(--color-text-muted)', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <SeatIcon size={14} />
            <span>{vehicle.seats} Seater</span>
            <span>•</span>
            <AirConditionerIcon size={14} />
            <span>{vehicle.ac ? 'AC' : 'Non-AC'}</span>
          </p>
        </div>
        
        <div style={{ flex: '1 1 150px', textAlign: 'left' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{vehicle.price}</span>
          {vehicle.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'block' }}>/ {vehicle.package}</span>}
        </div>

        <div style={{ flex: '0 0 auto' }}>
          <motion.button 
            onClick={() => onBook(vehicle.id)}
            whileTap={{ scale: 0.96 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'var(--color-text-dark)',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)'
            }}
            aria-label={`Enquire about ${vehicle.name}`}
          >
            <span>Enquire</span>
            <motion.span 
              variants={{
                initial: { x: 0 },
                hover: { x: 4, transition: { duration: 0.2, ease: 'easeOut' } }
              }}
              style={{ display: 'inline-block' }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Lightswind-inspired refined subtle divider accent */}
      <motion.div 
        variants={{
          initial: { backgroundColor: 'rgba(0,0,0,0.1)' },
          hover: { backgroundColor: 'var(--color-green-dark, #2D3A26)', transition: { duration: 0.2 } }
        }}
        style={{ width: '100%', height: '1px' }} 
      />
    </motion.div>
  );
}

export function Pricing({ vehicles, onBook, enableGSAP = true }) {
  const sectionRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !enableGSAP) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const rows = rowRefs.current.filter(Boolean);

        // Entrance: rows slide in from left, plays once
        gsap.fromTo(rows,
          { x: -motionDistance.small, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowsContainerRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [enableGSAP]);

  return (
    <section className="section-padding pricing-section" id="pricing" ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header-flex" style={{ borderBottom: '2px solid var(--color-text-dark)', paddingBottom: '32px', marginBottom: '16px' }}>
          <RevealUp>
            <span className="eyebrow">STARTING FARES</span>
            <h2 className="heading-lg" style={{ margin: 0 }}>Transparent, minimal pricing.</h2>
          </RevealUp>
        </div>

        <div className="pricing-list-container" ref={rowsContainerRef}>
          {vehicles.map((v, i) => (
            <PricingRow 
              key={v.id} 
              vehicle={v} 
              onBook={onBook} 
              rowRef={el => rowRefs.current[i] = el}
            />
          ))}
        </div>

        <RevealUp style={{ marginTop: '32px' }}>
          <p className="body-sm" style={{ color: 'var(--color-text-muted)' }}>
            * Please confirm the final fare while booking.
          </p>
        </RevealUp>
      </div>
    </section>
  );
}
