interface GreekKeyBorderProps {
  className?: string;
}

export default function GreekKeyBorder({ className = "" }: GreekKeyBorderProps) {
  return (
    <div className={`hero-meander ${className}`} aria-hidden>
      <svg width="100%" height="18" viewBox="0 0 1200 18" preserveAspectRatio="none">
        <defs>
          <linearGradient id="greekKeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#E8C55B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.15" />
          </linearGradient>
          <pattern id="greekKeyPattern" x="0" y="0" width="48" height="18" patternUnits="userSpaceOnUse">
            <path
              d="M0 1 L14 1 L14 14 L34 14 L34 5 L22 5 L22 10 L18 10 L18 17 L48 17"
              fill="none"
              stroke="url(#greekKeyGradient)"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="1200" height="18" fill="url(#greekKeyPattern)" />
      </svg>
    </div>
  );
}
