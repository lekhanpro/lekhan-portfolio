import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExperienceEvent } from '@/lib/github';
import { GraduationCap, FileText } from 'lucide-react';

interface ExperienceProps {
  events: ExperienceEvent[];
  isLoading: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Experience({ events, isLoading }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (isLoading) {
    return (
      <section id="experience" className="py-28">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-[#141414] rounded-2xl w-52" />
            <div className="space-y-6 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-[#141414] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-28 relative" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="mb-16"
        >
          <span className="text-sm font-semibold text-[#888] uppercase tracking-widest mb-3 block">
            My journey
          </span>
          <h2 className="section-heading">
            Experience <span className="font-serif italic">Timeline</span>
          </h2>
          <p className="section-subtitle">
            Key milestones and achievements tracked through my development journey
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        {events.length > 0 && (
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line — simple thin line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#222]" />

            <div className="space-y-12">
              {events.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    custom={index + 1}
                    variants={fadeUp}
                    className={`relative flex items-start gap-6 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <div className="w-3 h-3 rounded-full bg-white ring-4 ring-[#0a0a0a]" />
                    </div>

                    {/* Card */}
                    <div
                      className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:pr-8' : 'md:pl-8'
                      }`}
                    >
                      <div className={`solid-card p-6 ${isLeft ? 'md:text-right' : ''}`}>
                        <span className="text-xs font-mono text-[#666] mb-2 block">
                          {event.date}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                        <p className="text-sm text-[#888]">{event.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Education & Publications */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={events.length + 2}
            variants={fadeUp}
            className="solid-card p-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center mb-4">
              <GraduationCap size={20} className="text-[#888]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              <span className="font-serif italic">Education</span>
            </h3>
            <p className="font-semibold mb-1 text-[#ccc]">DBIT Student</p>
            <p className="text-sm text-[#888]">
              Pursuing studies in Computer Science with focus on full-stack development and AI/ML
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={events.length + 3}
            variants={fadeUp}
            className="solid-card p-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center mb-4">
              <FileText size={20} className="text-[#888]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              <span className="font-serif italic">Publications</span>
            </h3>
            <p className="font-semibold mb-1 text-[#ccc]">IEEE Published</p>
            <p className="text-sm text-[#888]">
              Research contributions published in IEEE conferences and journals
            </p>
          </motion.div>
        </div>
      </div>

      <div className="gradient-divider mt-28" />
    </section>
  );
}
