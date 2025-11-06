export interface HeroMetric {
  value: string;
  label: string;
  detail: string;
}

type HeroMetricsProps = {
  metrics: HeroMetric[];
};

export default function HeroMetrics({ metrics }: HeroMetricsProps) {
  return (
    <section className="w-full max-w-xl" aria-label="Platform metrics">
      <div role="list" className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            role="listitem"
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white/80 lg:backdrop-blur-sm transition-colors duration-300"
          >
            <p className="text-3xl font-semibold text-white">{metric.value}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">{metric.label}</p>
            <p className="text-xs text-white/55">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
