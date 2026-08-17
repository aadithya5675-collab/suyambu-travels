/**
 * Performance Monitor & Probe Module
 * Runs a lightweight 100-frame FPS sampling probe on initial page load, then stops.
 * Optional PerformanceObserver for longtask detection.
 * Hysteresis safeguards prevent tier bouncing.
 */

import { FPS_THRESHOLDS } from './adaptiveConfig';

/**
 * Runs a temporary 100-frame FPS probe.
 * Resolves with { avgFps, droppedFrames, isStable } and stops completely.
 */
export function runFPSProbe() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.requestAnimationFrame) {
      resolve({ avgFps: 60, droppedFrames: 0, isStable: true });
      return;
    }

    let frames = 0;
    let lastTime = performance.now();
    let totalDuration = 0;
    let droppedFrames = 0;

    const frameCountTarget = FPS_THRESHOLDS.PROBE_FRAME_COUNT;

    function probe(now) {
      const delta = now - lastTime;
      lastTime = now;

      // Ignore huge delta on first frame
      if (frames > 0) {
        totalDuration += delta;
        // Frame took longer than 33ms (~<30fps)
        if (delta > 33.3) {
          droppedFrames += 1;
        }
      }

      frames += 1;

      if (frames < frameCountTarget) {
        requestAnimationFrame(probe);
      } else {
        const avgFrameTime = totalDuration / (frames - 1);
        const avgFps = Math.min(60, Math.round(1000 / avgFrameTime));
        const isStable = droppedFrames < 10 && avgFps >= FPS_THRESHOLDS.STANDARD_MIN_FPS;

        resolve({ avgFps, droppedFrames, isStable });
      }
    }

    // Delay start slightly until Hero critical DOM has settled
    setTimeout(() => {
      lastTime = performance.now();
      requestAnimationFrame(probe);
    }, 400);
  });
}

/**
 * Observes browser long tasks (tasks > 50ms) to trigger graceful degradation if sustained.
 * Uses a 10-second rolling window. If 4+ long tasks occur in this window, triggers downgrade.
 */
export function initLongTaskObserver(onLongTasks) {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return () => {};
  }

  let longTaskTimestamps = [];
  let observer;

  try {
    if (PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
      observer = new PerformanceObserver((list) => {
        const now = performance.now();
        const entries = list.getEntries();
        
        // Add new timestamps
        for (let i = 0; i < entries.length; i++) {
          longTaskTimestamps.push(now);
        }

        // Remove tasks older than 10 seconds
        longTaskTimestamps = longTaskTimestamps.filter(t => now - t <= 10000);

        // If sustained long tasks (4+) in 10s window, notify for downgrade
        if (longTaskTimestamps.length >= 4) {
          onLongTasks(longTaskTimestamps.length);
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    }
  } catch {
    // Graceful fallback for unsupported browsers
  }

  return () => {
    if (observer) observer.disconnect();
  };
}
