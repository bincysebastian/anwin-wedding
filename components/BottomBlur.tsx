const LAYERS = [
  { blur: 1, from: 0, to: 40 },
  { blur: 2, from: 20, to: 60 },
  { blur: 4, from: 40, to: 80 },
  { blur: 8, from: 60, to: 100 },
];

/** Progressive blur fixed to the bottom of the viewport, as on the Framer reference. */
export function BottomBlur() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[90px]">
      {LAYERS.map((l) => {
        const mask = `linear-gradient(to bottom, transparent ${l.from}%, black ${l.to}%)`;
        return (
          <div
            key={l.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${l.blur}px)`,
              WebkitBackdropFilter: `blur(${l.blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
