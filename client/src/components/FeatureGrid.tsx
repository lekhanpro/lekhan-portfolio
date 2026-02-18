import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const attributes = [
  'User-Friendly',
  'Adaptive',
  'Fluid',
  'Future-Proof',
  'SEO-Ready',
  'Immersive',
  'Production-Grade',
  'Scalable',
  'Open Source',
];

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#444] flex-shrink-0"
    >
      <path
        d="M8 0L9.79 6.21L16 8L9.79 9.79L8 16L6.21 9.79L0 8L6.21 6.21L8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="py-16" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3">
          {attributes.map((attr, i) => (
            <motion.div
              key={attr}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
              variants={fadeUp}
              className="solid-card px-4 py-3 flex items-center justify-center gap-2 text-center"
            >
              <StarIcon />
              <span className="text-xs sm:text-sm font-medium text-[#888] whitespace-nowrap">
                {attr}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
