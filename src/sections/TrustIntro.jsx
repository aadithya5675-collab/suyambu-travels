import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../components/RevealText';
import { motionDistance } from '../motion/motionTokens';

gsap.registerPlugin(ScrollTrigger);

export function TrustIntro() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Entrance: Split Horizontal Reveal — plays once, never reverses
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });

        entranceTl
          .fromTo(leftRef.current, 
            { x: -motionDistance.small, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(rightRef.current,
            { x: motionDistance.small, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            '<0.05'
          )
          .fromTo(dividerRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.7, ease: 'power3.out' },
            '<0.1'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding trust-section" id="about" ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="trust-grid">
          {/* Left: Large Typography */}
          <div className="trust-left" ref={leftRef}>
            <div className="trust-large-num">08</div>
            <div style={{ marginLeft: '16px' }}>
              <RevealText as="span" delay={0} className="heading-md" style={{ marginBottom: 0 }}>YEARS</RevealText>
              <RevealText as="span" delay={0} className="heading-md" style={{ color: 'var(--color-text-muted)' }}>ON THE ROAD</RevealText>
            </div>
          </div>

          <div className="trust-divider" ref={dividerRef}></div>

          {/* Right: Editorial Copy */}
          <div className="trust-right" ref={rightRef}>
            <h2 className="heading-lg" style={{ marginBottom: '24px' }}>
              <RevealText as="span" delay={0} text="Travel without" />
              <RevealText as="span" delay={0} text="the usual hassle." />
            </h2>
            
            <RevealText as="p" delay={0} className="body-lg" style={{ color: 'var(--color-text-muted)', maxWidth: '480px', marginBottom: '48px' }}>
              For eight years, Suyambu Travels has been helping passengers travel from Coimbatore with comfortable AC vehicles.
            </RevealText>

            <div className="trust-stats-flex">
              <RevealText as="div" delay={0} className="trust-stat">
                <span className="trust-stat-val">08</span>
                <span className="trust-stat-lbl">Years Experience</span>
              </RevealText>
              <RevealText as="div" delay={0} className="trust-stat">
                <span className="trust-stat-val">05</span>
                <span className="trust-stat-lbl">Vehicle Options</span>
              </RevealText>
              <RevealText as="div" delay={0} className="trust-stat">
                <span className="trust-stat-val">AC</span>
                <span className="trust-stat-lbl">Across the Fleet</span>
              </RevealText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
