import React, { useState, useEffect, useRef } from 'react';
import { Efecto } from '@toriistudio/shader-ui';
import { ShaderErrorBoundary } from '../../components/ShaderErrorBoundary';

export function CinematicShaderImage({ src, alt, className = '', eager = false, enableShader = true }) {
  const containerRef = useRef(null);
  const [shaderFailed, setShaderFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [inView, setInView] = useState(eager);
  const [isSettled, setIsSettled] = useState(false);
  const [shouldRenderShader, setShouldRenderShader] = useState(true);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to activate shader ONLY when approaching viewport
  useEffect(() => {
    if (!enableShader || eager || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [eager, inView, enableShader]);

  // Shader animation lifecycle: activate -> 2.5s playback -> fade -> unmount
  useEffect(() => {
    if (!enableShader || !inView || prefersReducedMotion || shaderFailed || !shouldRenderShader) return;

    // 1. Play shader for 2.5s
    const playTimer = setTimeout(() => {
      setIsSettled(true);
    }, 2500);

    // 2. Unmount shader from DOM 800ms after opacity transition completes
    const unmountTimer = setTimeout(() => {
      setShouldRenderShader(false);
    }, 3300);

    return () => {
      clearTimeout(playTimer);
      clearTimeout(unmountTimer);
    };
  }, [inView, prefersReducedMotion, shaderFailed, shouldRenderShader, enableShader]);

  return (
    <div 
      ref={containerRef}
      className={className} 
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* 1. Primary Reliable Native Fallback Image - always present, visible. */}
      <img 
        src={src} 
        alt={alt} 
        loading={eager ? 'eager' : 'lazy'}
        style={{ 
          width: '100%', height: '100%', objectFit: 'cover', 
          position: 'absolute', top: 0, left: 0, zIndex: 1 
        }} 
      />

      {/* 2. Shader UI Layer - mounts only when in view, fades out and unmounts after playback */}
      {enableShader && inView && shouldRenderShader && !prefersReducedMotion && !shaderFailed && (
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2,
            opacity: isSettled ? 0 : 1, transition: 'opacity 0.8s ease-out',
            pointerEvents: 'none'
          }}
        >
          <ShaderErrorBoundary onError={() => setShaderFailed(true)}>
            <Efecto 
              src={src} 
              colorMode={true} 
              style="minimal" 
              cellSize={2} 
              invert={false}
              postProcessing={{ 
                waveAmplitude: 0.05, 
                noiseIntensity: 0.1, 
                glitchIntensity: 0, 
                scanlineIntensity: 0,
                aberrationStrength: 0.02
              }} 
              className="cinematic-shader-canvas"
            />
          </ShaderErrorBoundary>
        </div>
      )}
    </div>
  );
}
