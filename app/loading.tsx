// Global loading state with skeleton screens for better perceived performance
export default function Loading() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        {/* Hero skeleton */}
        <div className="text-center space-y-8 mb-24">
          <div className="h-4 w-48 mx-auto bg-zinc-800/50 rounded-full animate-pulse" />
          <div className="space-y-4">
            <div className="h-16 w-full max-w-3xl mx-auto bg-zinc-800/50 rounded-lg animate-pulse" />
            <div className="h-12 w-full max-w-2xl mx-auto bg-zinc-800/50 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-64 mx-auto bg-zinc-800/50 rounded-lg animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-8 w-64 bg-zinc-800/50 rounded animate-pulse" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-zinc-800/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
