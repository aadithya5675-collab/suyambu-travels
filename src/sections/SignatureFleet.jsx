import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { RevealText } from '../components/RevealText';
import { SeatIcon, AirConditionerIcon } from '../components/icons/Icons';

gsap.registerPlugin(ScrollTrigger);

export function SignatureFleet({ vehicles, onBook, enableSpatial = true, preloadImages = true }) {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [shouldUseSimpleLayout, setShouldUseSimpleLayout] = useState(false);

  // Preload fleet images during idle time
  useEffect(() => {
    if (typeof window === 'undefined' || !preloadImages) return;

    const preload = () => {
      vehicles.forEach(v => {
        const img = new Image();
        img.src = v.image;
        if (img.decode) {
          img.decode().catch(() => {});
        }
      });
    };

    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(preload, 1500);
      return () => clearTimeout(timer);
    }
  }, [vehicles, preloadImages]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkLayout = () => {
      setShouldUseSimpleLayout(!enableSpatial || window.innerWidth < 1024 || mediaQuery.matches);
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    mediaQuery.addEventListener('change', checkLayout);

    return () => {
      window.removeEventListener('resize', checkLayout);
      mediaQuery.removeEventListener('change', checkLayout);
    };
  }, [enableSpatial]);

  useEffect(() => {
    if (shouldUseSimpleLayout) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        if (!track) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

        // Horizontal Track Scrub: Moves Right -> Left (Dzire <- Crysta <- Hycross <- Tempo <- Urbania)
        const horizontalTween = gsap.to(track, {
          x: getScrollAmount,
          ease: 'none'
        });

        ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
          pin: true,
          animation: horizontalTween,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * vehicles.length),
              vehicles.length - 1
            );
            setActiveVehicleIndex(idx);
          }
        });

        // Image Depth Parallax (Subtle internal shift in opposite direction)
        const images = track.querySelectorAll('.fleet-spatial-img');
        images.forEach((img) => {
          gsap.fromTo(img,
            { x: -25, scale: 1.05 },
            {
              x: 25,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                containerAnimation: horizontalTween,
                start: 'left right',
                end: 'right left',
                scrub: true
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldUseSimpleLayout, vehicles.length]);

  // Clean, High-Performance Static Fallback for Light & Static Tiers & Reduced Motion
  if (shouldUseSimpleLayout) {
    return (
      <section className="section-padding fleet-static-section" id="fleet">
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <RevealText as="span" className="eyebrow" text="OUR FLEET" />
            <h2 className="heading-lg" style={{ margin: 0 }}>Choose your ride.</h2>
          </div>

          <div className="fleet-static-grid">
            {vehicles.map((v, index) => (
              <div key={v.id} className="fleet-spatial-card fleet-static-card">
                <div className="fleet-spatial-info">
                  <span className="eyebrow" style={{ color: 'var(--color-text-muted)' }}>
                    VEHICLE 0{index + 1}
                  </span>
                  <h3 className="heading-lg" style={{ marginBottom: '8px' }}>{v.name}</h3>
                  
                  {/* Kokonut-inspired Spec Badges */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <span className="body-md" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <SeatIcon size={16} />
                      {v.seats} Seater
                    </span>
                    <span style={{ color: 'var(--color-border)' }}>•</span>
                    <span className="body-md" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <AirConditionerIcon size={16} />
                      {v.ac ? 'AC' : 'Non-AC'}
                    </span>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <span className="heading-md" style={{ color: 'var(--color-green-dark)' }}>{v.price}</span>
                    {v.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'block' }}>/ {v.package}</span>}
                  </div>
                  
                  <motion.button 
                    className="btn-pill btn-pill-dark"
                    onClick={() => onBook(v.id)}
                    whileHover={{ y: -2, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Enquire</span>
                    <span className="arrow-icon" style={{ marginLeft: '6px' }}>→</span>
                  </motion.button>
                </div>

                {/* Kokonut-inspired Image Framing Container */}
                <div className="fleet-spatial-image-container">
                  <img 
                    src={v.image} 
                    alt={v.name} 
                    className="fleet-spatial-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Pinned Horizontal Canvas Layout (Right -> Left)
  return (
    <section className="fleet-spatial-desktop" id="fleet" ref={sectionRef}>
      <div className="fleet-spatial-pin-wrapper" ref={pinWrapperRef}>
        {/* Fixed Header Bar inside pinned viewport */}
        <div className="container fleet-spatial-header-bar">
          <div>
            <span className="eyebrow">OUR FLEET</span>
            <h2 className="heading-lg" style={{ margin: 0 }}>Choose your ride.</h2>
          </div>
          <div className="fleet-spatial-progress">
            <span className="fleet-spatial-counter">
              0{activeVehicleIndex + 1} / 05
            </span>
          </div>
        </div>

        {/* Horizontal Track Canvas */}
        <div className="fleet-spatial-track-container">
          <div className="fleet-spatial-track" ref={trackRef}>
            {vehicles.map((v, index) => (
              <div key={v.id} className="fleet-spatial-panel">
                <div className="fleet-spatial-card">
                  <div className="fleet-spatial-info">
                    <span className="eyebrow" style={{ color: 'var(--color-text-muted)' }}>
                      VEHICLE 0{index + 1}
                    </span>
                    <h3 className="heading-lg" style={{ marginBottom: '8px' }}>{v.name}</h3>
                    
                    {/* Kokonut-inspired Spec Badges */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                      <span className="body-md" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <SeatIcon size={16} />
                        {v.seats} Seater
                      </span>
                      <span style={{ color: 'var(--color-border)' }}>•</span>
                      <span className="body-md" style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <AirConditionerIcon size={16} />
                        {v.ac ? 'AC' : 'Non-AC'}
                      </span>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                      <span className="heading-md" style={{ color: 'var(--color-green-dark)' }}>{v.price}</span>
                      {v.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'block' }}>/ {v.package}</span>}
                    </div>
                    
                    {/* Motion micro-press on button */}
                    <motion.button 
                      className="btn-pill btn-pill-dark"
                      onClick={() => onBook(v.id)}
                      whileHover={{ y: -2, transition: { duration: 0.18 } }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>Enquire</span>
                      <span className="arrow-icon" style={{ marginLeft: '6px' }}>→</span>
                    </motion.button>
                  </div>

                  {/* Kokonut-inspired Image Framing Container */}
                  <div className="fleet-spatial-image-container">
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="fleet-spatial-img"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
