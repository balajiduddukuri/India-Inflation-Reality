/**
 * Triggers a light haptic feedback vibration on supported mobile devices.
 * useful for enhancing UI interactions like button clicks or toggle switches.
 */
export const triggerHaptic = (pattern: number | number[] = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
