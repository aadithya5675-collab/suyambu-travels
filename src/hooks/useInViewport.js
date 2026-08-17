import { useState, useEffect, useRef } from 'react';

/**
 * useInViewport hook
 * Uses IntersectionObserver to detect when an element enters or leaves viewport.
 * Supports rootMargin, threshold, and triggerOnce options.
 */
export function useInViewport(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '100px',
    triggerOnce = false,
    initialInView = false
  } = options;

  const ref = useRef(null);
  const [inView, setInView] = useState(initialInView);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([obsEntry]) => {
        setEntry(obsEntry);
        if (obsEntry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView, entry];
}
