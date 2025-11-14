"use client";

export default function WaitlistButton({ className }: { className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      href="#waitlist"
      onClick={handleClick}
      className={className}
    >
      Join the waitlist
    </a>
  );
}
