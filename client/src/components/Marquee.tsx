const marqueeItems = [
  'Open Source',
  'Full-Stack',
  'AI / ML',
  'GSoC Ready',
  'Production-Grade',
  'TypeScript',
  'Scalable',
  'User-Friendly',
  'Adaptive',
  'Fluid',
];

function StarSeparator() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#333] flex-shrink-0 mx-8"
    >
      <path
        d="M8 0L9.79 6.21L16 8L9.79 9.79L8 16L6.21 9.79L0 8L6.21 6.21L8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Marquee() {
  return (
    <section className="py-8 border-y border-[#222] overflow-hidden" aria-label="Skills marquee">
      <div className="marquee-track flex items-center whitespace-nowrap w-max">
        {/* Duplicate items for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="text-sm sm:text-base font-medium text-[#888] uppercase tracking-widest">
              {text}
            </span>
            <StarSeparator />
          </span>
        ))}
      </div>
    </section>
  );
}
