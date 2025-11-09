export default function BlogLoading() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Header skeleton */}
        <div className="mb-16 text-center">
          <div className="h-16 w-48 mx-auto mb-6 bg-zinc-800/50 rounded-lg animate-pulse" />
          <div className="h-6 w-96 max-w-full mx-auto bg-zinc-800/30 rounded animate-pulse" />
        </div>

        {/* Blog post cards skeleton */}
        <div className="space-y-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-8"
            >
              <div className="space-y-4">
                {/* Tags skeleton */}
                <div className="flex gap-2">
                  <div className="h-6 w-24 bg-zinc-800/50 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-zinc-800/50 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-zinc-800/50 rounded-full animate-pulse" />
                </div>

                {/* Title skeleton */}
                <div className="h-8 w-3/4 bg-zinc-800/50 rounded animate-pulse" />

                {/* Meta skeleton */}
                <div className="h-4 w-48 bg-zinc-800/30 rounded animate-pulse" />

                {/* Excerpt skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-zinc-800/30 rounded animate-pulse" />
                  <div className="h-4 w-full bg-zinc-800/30 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-zinc-800/30 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
