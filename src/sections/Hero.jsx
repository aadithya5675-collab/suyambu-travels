import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { RevealText } from '../components/RevealText';
import { CinematicShaderImage } from '../motion/shaders/CinematicShaderImage';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onBook }) {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Scroll Parallax (Subtle depth on scroll down)
        gsap.to(bgRef.current, {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
        
        gsap.to(contentRef.current, {
          y: '25%',
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: true
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-bg-container">
        <div ref={bgRef} style={{ width: '100%', height: '100%' }}>
          <CinematicShaderImage 
            src="/assets/hero/hero-bg.jpg" 
            alt="Outstation Journey" 
            className="hero-bg-image" 
            eager={true} 
            enableShader={false}
          />
        </div>
        <div ref={overlayRef} className="hero-overlay"></div>
      </div>

      <div className="container">
        <div ref={contentRef} className="hero-content">
          <RevealText as="span" delay={0} className="eyebrow hero-eyebrow" text="COIMBATORE • OUTSTATION TRAVEL" />
          
          <h1 className="heading-xl">
            <RevealText as="span" delay={0} text="Your Journey." />
            <RevealText as="span" delay={0} text="Our Drive." />
          </h1>

          <div style={{ overflow: 'hidden', marginBottom: '44px' }}>
            <RevealText as="p" className="hero-subtitle" delay={0} style={{ marginBottom: 0 }}>
              Comfortable AC travel from Coimbatore,<br/>wherever your journey takes you.
            </RevealText>
          </div>

          <div className="hero-cta-group">
            <RevealText as="span" delay={0}>
              <Button variant="white" onClick={() => onBook(null)}>
                Book Your Ride
              </Button>
            </RevealText>
            <RevealText as="span" delay={0}>
              <Button variant="outline-light" href="#fleet">
                Explore Fleet
              </Button>
            </RevealText>
          </div>

          <div className="hero-bottom-bar">
            {['Saravanampatti, Coimbatore', 'Outstation Travel', 'Call / WhatsApp Booking'].map((text) => (
              <RevealText as="div" delay={0} key={text} className="hero-chip">
                {text}
              </RevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
