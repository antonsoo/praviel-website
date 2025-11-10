'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function FundError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (Sentry already configured)
    console.error('Funding page error:', error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-6">
          {/* Error icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Error message */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">
              Error loading funding page
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mx-auto">
              We encountered an error while loading the funding information. This has been logged and we'll investigate.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={reset}
              className="px-6 py-3 rounded-lg bg-[#E8C55B] hover:bg-[#D4AF37] text-black font-semibold transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-white font-semibold transition-colors"
            >
              Go to homepage
            </Link>
          </div>

          {/* Error details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-zinc-500 hover:text-zinc-400">
                Error details (dev only)
              </summary>
              <pre className="mt-4 p-4 bg-zinc-900 rounded-lg text-xs text-red-400 overflow-auto">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
