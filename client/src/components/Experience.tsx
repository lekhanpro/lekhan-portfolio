import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExperienceEvent } from '@/lib/github';
import { GraduationCap, FileText, Briefcase } from 'lucide-react';

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
      <section id="experience" className="py-24">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white/5 rounded-2xl w-52" />
            <div className="space-y-6 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="orb orb-secondary w-[350px] h-[350px] top-20 -left-32" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="mb-16"
        >
          <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3 block">
            My journey
          </span>
          <h2 className="section-heading">Experience Timeline</h2>
          <p className="section-subtitle">
            Key milestones and achievements tracked through my development journey
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        {events.length > 0 && (
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px">
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
              />
            </div>

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
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 ring-4 ring-background" />
                    </div>

                    {/* Card */}
                    <div
                      className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:pr-8' : 'md:pl-8'
                      }`}
                    >
                      <div className={`glass-card p-6 ${isLeft ? 'md:text-right' : ''}`}>
                        <span className="text-xs font-mono text-indigo-400 mb-2 block">
                          {event.date}
                        </span>
                        <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.detail}</p>
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
            className="glass-card p-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
              <GraduationCap size={20} className="text-foreground/80" />
            </div>
            <h3 className="text-xl font-bold mb-2 gradient-text">Education</h3>
            <p className="font-semibold mb-1">DBIT Student</p>
            <p className="text-sm text-muted-foreground">
              Pursuing studies in Computer Science with focus on full-stack development and AI/ML
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={events.length + 3}
            variants={fadeUp}
            className="glass-card p-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
              <FileText size={20} className="text-foreground/80" />
            </div>
            <h3 className="text-xl font-bold mb-2 gradient-text">Publications</h3>
            <p className="font-semibold mb-1">IEEE Published</p>
            <p className="text-sm text-muted-foreground">
              Research contributions published in IEEE conferences and journals
            </p>
          </motion.div>
        </div>
      </div>

      <div className="gradient-divider mt-24" />
    </section>
  );
}
