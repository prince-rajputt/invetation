import { useEffect, useState } from 'react';

/**
 * Returns a coarse device bucket: 'mobile' | 'tablet' | 'desktop'.
 * Used to scale particle counts and parallax so mobile stays smooth.
 */
function bucket(w) {
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function useResponsive() {
  const [device, setDevice] = useState(() =>
    typeof window !== 'undefined' ? bucket(window.innerWidth) : 'mobile'
  );

  useEffect(() => {
    let frame;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setDevice(bucket(window.innerWidth)));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return device;
}

export default useResponsive;
