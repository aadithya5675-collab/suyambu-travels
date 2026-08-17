/**
 * Visibility Manager Module
 * Central listener for document visibilitychange to coordinate pausing/resuming visual loops.
 */

const listeners = new Set();
let initialized = false;

function handleVisibilityChange() {
  const isVisible = typeof document !== 'undefined' ? !document.hidden : true;
  listeners.forEach((listener) => {
    try {
      listener(isVisible);
    } catch {
      // Guard individual listener failures
    }
  });
}

export function subscribeTabVisibility(callback) {
  if (typeof document === 'undefined') return () => {};

  listeners.add(callback);

  if (!initialized) {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    initialized = true;
  }

  // Initial call with current state
  callback(!document.hidden);

  return () => {
    listeners.delete(callback);
  };
}

export function isDocumentVisible() {
  if (typeof document === 'undefined') return true;
  return !document.hidden;
}
