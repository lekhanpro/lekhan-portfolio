import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Monitor,
  Server,
  Brain,
  Wrench,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const skillCategories = [
  {
    category: 'Frontend',
    icon: Monitor,
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'],
  },
  {
    category: 'Backend',
    icon: Server,
    skills: ['Node.js / Express', 'Python / FastAPI', 'REST & GraphQL', 'Firebase / Supabase'],
  },
  {
    category: 'AI & Data',
    icon: Brain,
    skills: ['Machine Learning', 'Deep Learning', 'Data Analysis', 'LLMs / RAG'],
  },
  {
    category: 'Tools & DevOps',
    icon: Wrench,
    skills: ['Git / GitHub', 'Docker', 'AWS / Cloud', 'CI/CD Pipelines'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-28 relative" ref={ref}>
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
            What I work with
          </span>
          <h2 className="section-heading">
            Skills & <span className="font-serif italic">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive toolkit of technologies and frameworks I use to build exceptional digital products
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIndex) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={catIndex}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={catIndex + 1}
                variants={fadeUp}
                className="solid-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center">
                    <Icon size={20} className="text-[#888]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{cat.category}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cat.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#222] text-sm font-medium text-[#ccc]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="gradient-divider mt-28" />
    </section>
  );
}
