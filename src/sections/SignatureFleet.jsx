import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../components/RevealText';

gsap.registerPlugin(ScrollTrigger);

export function SignatureFleet({ vehicles, onBook }) {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [shouldUseSimpleLayout, setShouldUseSimpleLayout] = useState(false);

  // Preload fleet images during idle time
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadImages = () => {
      vehicles.forEach(v => {
        const img = new Image();
        img.src = v.image;
        if (img.decode) {
          img.decode().catch(() => {});
        }
      });
    };

    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(preloadImages, { timeout: 3000 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(preloadImages, 1500);
      return () => clearTimeout(timer);
    }
  }, [vehicles]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkLayout = () => {
      setShouldUseSimpleLayout(window.innerWidth < 1024 || mediaQuery.matches);
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    mediaQuery.addEventListener('change', checkLayout);

    return () => {
      window.removeEventListener('resize', checkLayout);
      mediaQuery.removeEventListener('change', checkLayout);
    };
  }, []);

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

  if (shouldUseSimpleLayout) {
    return (
      <section className="section-padding fleet-signature-mobile" id="fleet">
        <div className="container">
          <RevealText as="span" className="eyebrow" text="OUR FLEET" />
          <h2 className="heading-lg" style={{ marginBottom: '48px' }}>
            Choose the right ride<br/>for every journey.
          </h2>

          <div className="fleet-mobile-list">
            {vehicles.map((v, i) => (
              <div key={v.id} className={`fleet-mobile-item ${i % 2 !== 0 ? 'align-right' : ''}`}>
                <h3 className="heading-md">{v.name}</h3>
                <p className="body-sm" style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  {v.seats} Seater • {v.ac ? 'AC' : 'Non-AC'}
                </p>
                <div className="image-reveal-wrap">
                  <img src={v.image} alt={v.name} loading="lazy" />
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
                    <p className="body-md" style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                      {v.seats} Seater • {v.ac ? 'AC' : 'Non-AC'}
                    </p>
                    <div style={{ marginBottom: '32px' }}>
                      <span className="heading-md" style={{ color: 'var(--color-green-dark)' }}>{v.price}</span>
                      {v.package && <span className="body-sm" style={{ color: 'var(--color-text-muted)', display: 'block' }}>/ {v.package}</span>}
                    </div>
                    <button 
                      className="btn-pill btn-pill-dark"
                      onClick={() => onBook(v.id)}
                    >
                      Enquire →
                    </button>
                  </div>

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
