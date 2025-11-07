const columns = [
  { side: "left", offsetClass: "lg:left-[2%]", animation: "animate-column-float-left" },
  { side: "right", offsetClass: "lg:right-[2%]", animation: "animate-column-float-right" },
];

export default function DecorativeColumns() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden>
      {columns.map(({ side, offsetClass, animation }) => (
        <div key={side} className={`hero-column ${offsetClass} ${animation}`}>
          <div className="hero-column-cap" />
          <div className="hero-column-shaft" />
          <div className="hero-column-base" />
        </div>
      ))}
    </div>
  );
}
