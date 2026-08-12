import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import { Button } from '../components/Button';
import { RevealText } from '../components/RevealText';
import { motionDistance } from '../motion/motionTokens';

gsap.registerPlugin(ScrollTrigger);

export function VehicleChooser({ vehicles, onBook }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const resultsRef = useRef(null);
  const optionRefs = useRef({});

  const [activeGroup, setActiveGroup] = useState('1-4');
  const [selectedVehicleId, setSelectedVehicleId] = useState('swift-dzire');

  const groups = [
    { id: '1-4', label: '1–4' },
    { id: '5-7', label: '5–7' },
    { id: '8-12', label: '8–12' }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
  }, []);

  const getRecommendations = (groupId) => {
    if (groupId === '1-4') return vehicles.filter(v => v.seats <= 4);
    if (groupId === '5-7') return vehicles.filter(v => v.seats > 4 && v.seats <= 7);
    if (groupId === '8-12') return vehicles.filter(v => v.seats > 7);
    return [];
  };

  const handleGroupChange = (groupId) => {
    if (groupId === activeGroup) return;

    const newRecs = getRecommendations(groupId);
    const initialSelection = newRecs.length === 1 ? newRecs[0].id : null;

    // Anime.js micro-interaction for group change
    anime({
      targets: resultsRef.current,
      opacity: [1, 0],
      translateY: [0, 10],
      duration: 180,
      easing: 'easeInQuad',
      complete: () => {
        setActiveGroup(groupId);
        setSelectedVehicleId(initialSelection);

        anime({
          targets: resultsRef.current,
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 250,
          easing: 'easeOutQuad'
        });
      }
    });
  };

  const handleSelectVehicle = (id) => {
    setSelectedVehicleId(id);

    const targetEl = optionRefs.current[id];
    if (targetEl) {
      anime({
        targets: targetEl,
        scale: [0.98, 1],
        duration: 300,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  const recommendations = getRecommendations(activeGroup);
  const selectedVehicleObj = vehicles.find(v => v.id === selectedVehicleId);

  return (
    <section className="section-padding chooser-section" id="chooser" ref={sectionRef}>
      <div ref={containerRef} className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <RevealText className="eyebrow" text="FIND YOUR RIDE" style={{ justifyContent: 'center' }} />
        <h2 className="heading-lg" style={{ marginBottom: '32px' }}>How many passengers?</h2>

        <div className="chooser-pills" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {groups.map(group => (
            <button 
              key={group.id}
              onClick={() => handleGroupChange(group.id)}
              className={`btn-pill ${activeGroup === group.id ? 'btn-pill-dark' : 'btn-pill-outline'}`}
              style={{ minWidth: '80px', justifyContent: 'center' }}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div ref={resultsRef} className="chooser-results" style={{ textAlign: 'left', backgroundColor: 'var(--color-green-light)', padding: '32px', borderRadius: 'var(--radius-md)' }}>
          <p className="eyebrow" style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>SUITABLE OPTIONS</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {recommendations.map(v => {
              const isSelected = selectedVehicleId === v.id;
              return (
                <button 
                  key={v.id}
                  ref={el => optionRefs.current[v.id] = el}
                  onClick={() => handleSelectVehicle(v.id)}
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
                      <span className="body-sm" style={{ color: 'var(--color-text-muted)' }}>{v.seats} Seater • {v.ac ? 'AC' : 'Non-AC'}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="body-sm" style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>{v.price}</span>
                    {v.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>/ {v.package}</span>}
                  </div>
                </button>
              );
            })}
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
