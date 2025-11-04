import { Skeleton, CardSkeleton } from '@/components/Skeleton';

/**
 * Route-level loading UI shown during page transitions
 * Uses React Suspense under the hood
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-24">
        {/* Hero Skeleton */}
        <div className="space-y-8 text-center">
          <Skeleton variant="text" height={60} className="mx-auto w-3/4" />
          <Skeleton variant="text" height={24} className="mx-auto w-2/3" />
          <Skeleton variant="text" count={2} className="mx-auto w-1/2" />
          <div className="flex justify-center gap-4 mt-8">
            <Skeleton variant="rectangular" width={180} height={56} />
            <Skeleton variant="rectangular" width={180} height={56} />
          </div>
        </div>

        {/* Features Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>

        {/* Content Section Skeleton */}
        <div className="space-y-6">
          <Skeleton variant="text" height={40} className="w-1/2" />
          <Skeleton variant="rectangular" height={300} />
        </div>
      </div>
    </div>
  );
}
