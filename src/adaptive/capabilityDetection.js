/**
 * Capability Detection Module
 * Privacy-preserving, non-invasive runtime capability measurement.
 * Zero fingerprinting, zero remote tracking.
 */

function testWebGLSupport() {
  if (typeof window === 'undefined' || !window.WebGLRenderingContext) {
    return { webgl: false, webgl2: false };
  }

  let webgl = false;
  let webgl2 = false;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    // Test WebGL 2 first
    const gl2 = canvas.getContext('webgl2', { powerPreference: 'low-power' });
    if (gl2) {
      webgl2 = true;
      webgl = true;
      const loseExt = gl2.getExtension('WEBGL_lose_context');
      if (loseExt) loseExt.loseContext();
    } else {
      // Test WebGL 1
      const gl = canvas.getContext('webgl', { powerPreference: 'low-power' }) ||
                 canvas.getContext('experimental-webgl', { powerPreference: 'low-power' });
      if (gl) {
        webgl = true;
        const loseExt = gl.getExtension('WEBGL_lose_context');
        if (loseExt) loseExt.loseContext();
      }
    }
  } catch {
    webgl = false;
    webgl2 = false;
  }

  return { webgl, webgl2 };
}

export function detectCapabilities() {
  if (typeof window === 'undefined') {
    return {
      reducedMotion: false,
      highContrast: false,
      saveData: false,
      dpr: 1,
      hardwareConcurrency: 4,
      deviceMemory: 4,
      webgl: true,
      webgl2: true,
      viewportWidth: 1440,
      viewportHeight: 900,
      isTouch: false
    };
  }

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  const highContrast = window.matchMedia?.('(prefers-contrast: more)')?.matches ?? false;

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(conn?.saveData);

  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
  const hardwareConcurrency = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 4;
  const deviceMemory = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : 4;

  const { webgl, webgl2 } = testWebGLSupport();

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768;
  const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0;

  return {
    reducedMotion,
    highContrast,
    saveData,
    dpr,
    hardwareConcurrency,
    deviceMemory,
    webgl,
    webgl2,
    viewportWidth,
    viewportHeight,
    isTouch
  };
}
