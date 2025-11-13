const REPOSITORIES = [
  {
    href: "https://github.com/antonsoo/praviel",
    label: "Core platform (API + apps)",
    aria: "View the PRAVIEL core platform repository on GitHub",
  },
  {
    href: "https://github.com/antonsoo/praviel-website",
    label: "Marketing site",
    aria: "View the PRAVIEL marketing site repository on GitHub",
  },
];

export default function OpenSourceBadge() {
  return (
    <div className="rounded-2xl border border-white/15 bg-zinc-900/80 p-4 text-sm text-zinc-100 shadow-inner shadow-black/20">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-300">
        <svg className="h-4 w-4 text-zinc-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.46 2.87 8.22 6.84 9.54.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.35-3.37-1.35-.45-1.16-1.11-1.47-1.11-1.47-.91-.63.07-.62.07-.62 1.01.07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.12-4.56-4.97 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.5 9.5 0 015-.14c1.91-1.3 2.75-1.03 2.75-1.03.54 1.39.2 2.41.1 2.66.64.7 1.02 1.6 1.02 2.69 0 3.86-2.34 4.72-4.57 4.97.36.31.68.93.68 1.88 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.05 10.05 0 0022 12.17C22 6.58 17.52 2 12 2z" />
        </svg>
        <span>Open Source</span>
      </div>
      <p className="mt-2 text-xs text-zinc-300">Both the learning engine and marketing site ship publicly on GitHub.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {REPOSITORIES.map((repo) => (
          <a
            key={repo.href}
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={repo.aria}
            className="group inline-flex items-center gap-1 rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:border-[#D4AF37] hover:text-[#E8C55B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60"
          >
            <span>{repo.label}</span>
            <span aria-hidden className="text-[#E8C55B]/70 transition-transform duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
