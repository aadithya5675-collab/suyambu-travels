import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealUp } from '../components/RevealText';
import { businessData } from '../data/business';
import { motionDistance } from '../motion/motionTokens';

gsap.registerPlugin(ScrollTrigger);

export function BookingProcess() {
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightContentRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Entrance: Split-Screen Convergence — plays once
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });

        entranceTl
          .fromTo(leftImageRef.current,
            { x: -motionDistance.small, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(rightContentRef.current,
            { x: motionDistance.small, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            '<0.05'
          );

        // Active Step ScrollTrigger
        const timelineItems = containerRef.current.querySelectorAll('.booking-timeline-item');
        timelineItems.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 65%',
            end: 'bottom 45%',
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index)
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    { title: "Choose your vehicle", desc: "Select a vehicle suitable for your group size and outstation travel needs.", note: null },
    { title: "Call or WhatsApp", desc: <>Contact Suyambu Travels at <a href={`tel:${businessData.phoneTel}`} style={{ fontWeight: 700, textDecoration: 'underline', color: 'inherit' }}>{businessData.phoneDisplay}</a> to discuss your travel itinerary.</>, note: null },
    { title: "Confirm with advance", desc: `${businessData.advance} advance payment is required to confirm your ride booking.`, note: `*Advance payment is ${businessData.advancePolicy.toLowerCase()}.` },
    { title: "Start your journey", desc: "Complete the remaining booking details and enjoy your drive anywhere you wish.", note: null }
  ];

  return (
    <section className="section-padding booking-section" id="booking" ref={containerRef} style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="booking-layout">
          {/* Sticky Left Image (Enters from Left <-) */}
          <div className="booking-image-sticky" ref={leftImageRef}>
            <img src="/assets/booking/booking-step.jpg" alt="Outstation Journey Suyambu Travels" loading="lazy" />
          </div>

          {/* Right Timeline Steps (Enters from Right ->) */}
          <div className="booking-content" ref={rightContentRef}>
            <RevealUp style={{ marginBottom: '44px' }}>
              <span className="eyebrow">HOW TO BOOK</span>
              <h2 className="heading-lg">Booking your ride<br/>is simple.</h2>
            </RevealUp>

            <div className="booking-timeline" style={{ position: 'relative' }}>
              {/* Vertical Progress Line */}
              <div className="timeline-progress-line" style={{
                position: 'absolute', left: '-20px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--color-border)'
              }}>
                <div style={{
                  width: '100%',
                  height: `${(activeStep / (steps.length - 1)) * 100}%`,
                  backgroundColor: 'var(--color-green-dark)',
                  transition: 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }} />
              </div>

              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`booking-timeline-item ${activeStep === index ? 'active' : ''}`} 
                  style={{ 
                    opacity: activeStep === index ? 1 : 0.35, 
                    transform: activeStep === index ? 'translateY(0)' : 'translateY(8px)', 
                    transition: 'opacity 0.4s ease, transform 0.4s ease' 
                  }}
                >
                  <span className="booking-timeline-num">0{index + 1}</span>
                  <h3 className="booking-timeline-title">{step.title}</h3>
                  <p className="booking-timeline-desc">{step.desc}</p>
                  {step.note && <span className="booking-timeline-note">{step.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
