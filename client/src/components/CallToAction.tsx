import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
            className="text-sm font-semibold text-[#888] uppercase tracking-widest mb-4"
          >
            From Idea to Execution
          </motion.p>

          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Let's build something{' '}
            <span className="font-serif italic">real</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            variants={fadeUp}
            className="text-lg text-[#888] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Available for GSoC, open-source collaborations, and selective freelance projects.
            I focus on shipping clean, scalable web solutions that support real users and growing products.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#0a0a0a] font-semibold text-base hover:bg-[#ededed] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              Get in touch
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/lekhanpro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-[#333] text-[#ededed] font-semibold text-base hover:bg-[#141414] hover:border-[#444] transition-all duration-300 hover:-translate-y-0.5"
            >
              View my work
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
