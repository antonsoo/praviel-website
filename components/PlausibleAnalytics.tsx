'use client';

import Script from 'next/script';

export default function PlausibleAnalytics() {
  return (
    <Script
      defer
      data-domain="praviel.com"
      data-api="/api/proxy/api/event"
      src="/api/proxy/js/script.js"
      strategy="afterInteractive"
    />
  );
}
