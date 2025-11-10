'use client';

import { useEffect } from 'react';

export default function PlausibleAnalytics() {
  useEffect(() => {
    // Only load in browser environment
    if (typeof window === 'undefined') return;

    // Check if script already loaded
    if (document.querySelector('script[data-domain="praviel.com"]')) {
      return;
    }

    // Create and configure script element
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', 'praviel.com');
    script.setAttribute('data-api', '/api/proxy/api/event');
    script.src = '/api/proxy/js/script.js';

    // Add to document head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[data-domain="praviel.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []); // Empty dependency array - run once on mount

  return null; // This component doesn't render anything
}
