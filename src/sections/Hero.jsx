import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { RevealText } from '../components/RevealText';
import { CinematicShaderImage } from '../motion/shaders/CinematicShaderImage';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the subtle 3D Route Ribbon visual
const HeroRouteRibbon = lazy(() => import('../components/3d/HeroRouteRibbon'));

export function Hero({ onBook, enable3D = false, enableGSAP = true, webglMaxDpr = 1.5, isTabVisible = true }) {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [mounted3D, setMounted3D] = useState(false);

  useEffect(() => {
    if (enable3D) {
      // Delay mounting 3D visual slightly after critical first paint to protect LCP
      const timer = setTimeout(() => setMounted3D(true), 250);
      return () => clearTimeout(timer);
    } else {
      setMounted3D(false);
    }
  }, [enable3D]);

  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '100px' });
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enableGSAP) return;

    let ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, [enableGSAP]);

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
        
        {/* Subtle 3D Route Ribbon (Lazy-loaded, High Tier Desktop only) */}
        {mounted3D && (
          <Suspense fallback={null}>
            <HeroRouteRibbon isVisible={inView && isTabVisible} dpr={webglMaxDpr} />
          </Suspense>
        )}
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
