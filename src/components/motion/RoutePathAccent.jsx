import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export function RoutePathAccent({ className = '', style = {}, isStatic = false }) {
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isStatic || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength ? path.getTotalLength() : 300;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: path,
            strokeDashoffset: [length, 0],
            duration: 1800,
            easing: 'easeInOutCubic',
            delay: 200
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isStatic]);

  return (
    <div ref={containerRef} className={`route-path-accent ${className}`} style={{ pointerEvents: 'none', width: '100%', maxWidth: '200px', ...style }} aria-hidden="true">
      <svg viewBox="0 0 240 48" fill="none" style={{ overflow: 'visible', width: '100%', height: 'auto', display: 'block' }}>
        <path
          ref={pathRef}
          d="M 10 24 C 60 4, 120 44, 180 20 C 200 12, 220 28, 230 24"
          stroke="var(--color-green-dark, #2D3A26)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 4"
          opacity="0.35"
        />
        <circle cx="10" cy="24" r="3.5" fill="var(--color-green-dark, #2D3A26)" opacity="0.6" />
        <circle cx="230" cy="24" r="3.5" fill="var(--color-green-dark, #2D3A26)" opacity="0.8" />
      </svg>
    </div>
  );
}
