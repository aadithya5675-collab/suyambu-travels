/**
 * Network Detection Module
 * Safely guards Network Information API and connectivity changes.
 */

export function getNetworkProfile() {
  if (typeof window === 'undefined') {
    return {
      online: true,
      effectiveType: 'unknown',
      saveData: false,
      downlink: null,
      rtt: null
    };
  }

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  return {
    online: navigator.onLine !== false,
    effectiveType: conn?.effectiveType || 'unknown',
    saveData: Boolean(conn?.saveData),
    downlink: typeof conn?.downlink === 'number' ? conn.downlink : null,
    rtt: typeof conn?.rtt === 'number' ? conn.rtt : null
  };
}

export function subscribeNetworkChanges(callback) {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => {
    callback(getNetworkProfile());
  };

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  window.addEventListener('online', handleUpdate);
  window.addEventListener('offline', handleUpdate);
  conn?.addEventListener?.('change', handleUpdate);

  return () => {
    window.removeEventListener('online', handleUpdate);
    window.removeEventListener('offline', handleUpdate);
    conn?.removeEventListener?.('change', handleUpdate);
  };
}
