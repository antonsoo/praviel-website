/**
 * Skeleton Loading Component
 * 2025 best practices: lightweight, smooth animations, respects prefers-reduced-motion
 * @see https://www.freecodecamp.org/news/the-nextjs-15-streaming-handbook/
 */

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClasses = 'skeleton animate-pulse bg-gradient-to-r from-zinc-800/50 via-zinc-700/50 to-zinc-800/50';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

/**
 * Skeleton for card components
 */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 ${className}`}>
      <Skeleton variant="circular" width={48} height={48} className="mb-4" />
      <Skeleton variant="text" height={24} className="mb-2 w-3/4" />
      <Skeleton variant="text" count={3} />
    </div>
  );
}

/**
 * Skeleton for text content
 */
export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for interactive demo
 */
export function DemoSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 space-y-6">
      <div className="flex items-center justify-center gap-4">
        <Skeleton variant="rectangular" width={100} height={60} />
        <Skeleton variant="rectangular" width={100} height={60} />
        <Skeleton variant="rectangular" width={100} height={60} />
      </div>
      <Skeleton variant="rectangular" height={200} />
      <div className="flex justify-center gap-4">
        <Skeleton variant="rectangular" width={120} height={44} />
        <Skeleton variant="rectangular" width={120} height={44} />
      </div>
    </div>
  );
}
