import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function RevealText({ text, children, as: Component = 'span', className = '', delay = 0, style }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = containerRef.current.querySelectorAll('.reveal-line-inner');
      
      gsap.fromTo(lines, 
        { y: '100%' }, 
        {
          y: '0%',
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  const content = text ? (
    typeof text === 'string' ? text.split('\n').map((line, i) => (
      <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
        <span className="reveal-line-inner" style={{ display: 'block' }}>{line}</span>
      </span>
    )) : (
      <span style={{ display: 'block', overflow: 'hidden' }}>
        <span className="reveal-line-inner" style={{ display: 'block' }}>{text}</span>
      </span>
    )
  ) : (
    React.Children.map(children, (child, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
        <span className="reveal-line-inner" style={{ display: 'inline-block' }}>{child}</span>
      </span>
    ))
  );

  return (
    <Component ref={containerRef} className={className} style={{ display: Component === 'span' ? 'inline-block' : 'block', ...style }}>
      {content}
    </Component>
  );
}

export function RevealUp({ children, className = '', delay = 0, style, as: Component = 'div', ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, 
        { y: 28, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return <Component ref={ref} className={className} style={style} {...rest}>{children}</Component>;
}
