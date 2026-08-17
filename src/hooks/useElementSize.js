import { useState, useEffect, useRef } from 'react';

/**
 * useElementSize hook
 * Safely measures element dimensions via ResizeObserver with debouncing.
 * Never polls or triggers layout loops.
 */
export function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    let frameId;
    const observer = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      // Throttle via requestAnimationFrame to prevent resize feedback loops
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setSize((prev) => {
          if (Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 1) {
            return prev;
          }
          return { width: Math.round(width), height: Math.round(height) };
        });
      });
    });

    observer.observe(el);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return [ref, size];
}
