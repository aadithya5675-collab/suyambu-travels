import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/Button';
import { RevealText } from '../components/RevealText';
import { motionDistance } from '../motion/motionTokens';
import { SeatIcon } from '../components/icons/Icons';

gsap.registerPlugin(ScrollTrigger);

export function VehicleChooser({ vehicles, onBook, enableGSAP = true }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const [activeGroup, setActiveGroup] = useState('1-4');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const groups = [
    { id: '1-4', label: '1–4' },
    { id: '5-7', label: '5–7' },
    { id: '8-12', label: '8–12' }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !enableGSAP) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(containerRef.current,
          { y: motionDistance.small, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [enableGSAP]);

  const getRecommendations = (groupId) => {
    if (groupId === '1-4') return vehicles.filter(v => v.seats <= 4);
    if (groupId === '5-7') return vehicles.filter(v => v.seats > 4 && v.seats <= 7);
    if (groupId === '8-12') return vehicles.filter(v => v.seats > 7);
    return [];
  };

  const handleGroupChange = (groupId) => {
    if (groupId === activeGroup) return;
    setActiveGroup(groupId);
    setSelectedVehicleId(null);
  };

  const recommendations = getRecommendations(activeGroup);
  const selectedVehicleObj = vehicles.find(v => v.id === selectedVehicleId);

  return (
    <section className="section-padding chooser-section" id="chooser" ref={sectionRef}>
      <div ref={containerRef} className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <RevealText className="eyebrow" text="FIND YOUR RIDE" style={{ justifyContent: 'center' }} />
        <h2 className="heading-lg" style={{ marginBottom: '32px' }}>How many passengers?</h2>

        {/* Originkit-inspired Shared Layout Passenger Segmented Control */}
        <div 
          role="tablist"
          aria-label="Passenger count"
          className="chooser-pills" 
          style={{ 
            display: 'inline-flex', 
            justifyContent: 'center', 
            gap: '8px', 
            marginBottom: '48px', 
            padding: '6px',
            backgroundColor: 'var(--color-bg-card, rgba(0,0,0,0.03))',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)'
          }}
        >
          {groups.map(group => {
            const isActive = activeGroup === group.id;
            return (
              <button 
                key={group.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleGroupChange(group.id)}
                className={`segmented-tab-pill ${isActive ? 'is-active' : ''}`}
                style={{ 
                  position: 'relative',
                  minWidth: '88px', 
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: 'transparent',
                  color: isActive ? 'var(--color-text-dark, #1B2E23)' : 'var(--color-text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  zIndex: 1,
                  transition: 'color 0.2s ease',
                  outline: 'none'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="chooser-active-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--bg-surface, #ffffff)',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
                      zIndex: -1,
                      border: '1px solid var(--color-border)'
                    }}
                  />
                )}
                <span>{group.label}</span>
              </button>
            );
          })}
        </div>

        <div className="chooser-results" style={{ textAlign: 'left', backgroundColor: 'var(--color-green-light)', padding: '32px', borderRadius: 'var(--radius-md)' }}>
          <p className="eyebrow" style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>SUITABLE OPTIONS</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeGroup}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {recommendations.map(v => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <motion.button 
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '20px 24px',
                        borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${isSelected ? 'var(--color-green-dark)' : 'var(--color-border)'}`,
                        backgroundColor: isSelected ? 'var(--bg-surface)' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        transition: 'background-color 0.25s, border-color 0.25s'
                      }}
                      aria-pressed={isSelected}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '20px', height: '20px',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? 'var(--color-green-dark)' : 'var(--color-text-muted)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {isSelected && (
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-green-dark)' }} />
                          )}
                        </div>

                        <div>
                          <h4 className="heading-sm" style={{ marginBottom: '2px', color: 'var(--color-text-dark)' }}>{v.name}</h4>
                          <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <SeatIcon size={14} />
                            {v.seats} Seater • {v.ac ? 'AC' : 'Non-AC'}
                          </span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span className="body-sm" style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>{v.price}</span>
                        {v.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>/ {v.package}</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <Button 
            variant="dark" 
            onClick={() => selectedVehicleId && onBook(selectedVehicleId)} 
            disabled={!selectedVehicleId}
            style={{ 
              width: '100%', 
              justifyContent: 'center',
              opacity: selectedVehicleId ? 1 : 0.5,
              cursor: selectedVehicleId ? 'pointer' : 'not-allowed'
            }}
          >
            {selectedVehicleObj ? `Enquire About ${selectedVehicleObj.name} →` : 'Select a Vehicle to Enquire'}
          </Button>
        </div>
      </div>
    </section>
  );
}
