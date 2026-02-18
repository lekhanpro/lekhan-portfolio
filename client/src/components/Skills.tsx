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
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderGlow: 'hover:shadow-blue-500/10',
    skills: [
      { name: 'React / Next.js', proficiency: 95 },
      { name: 'TypeScript', proficiency: 90 },
      { name: 'Tailwind CSS', proficiency: 95 },
      { name: 'React Native', proficiency: 85 },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    gradient: 'from-emerald-500/20 to-green-500/20',
    borderGlow: 'hover:shadow-emerald-500/10',
    skills: [
      { name: 'Node.js / Express', proficiency: 90 },
      { name: 'Python / FastAPI', proficiency: 88 },
      { name: 'REST & GraphQL', proficiency: 90 },
      { name: 'Firebase / Supabase', proficiency: 85 },
    ],
  },
  {
    category: 'AI & Data',
    icon: Brain,
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGlow: 'hover:shadow-purple-500/10',
    skills: [
      { name: 'Machine Learning', proficiency: 80 },
      { name: 'Deep Learning', proficiency: 75 },
      { name: 'Data Analysis', proficiency: 85 },
      { name: 'LLMs / RAG', proficiency: 82 },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: Wrench,
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderGlow: 'hover:shadow-orange-500/10',
    skills: [
      { name: 'Git / GitHub', proficiency: 95 },
      { name: 'Docker', proficiency: 80 },
      { name: 'AWS / Cloud', proficiency: 75 },
      { name: 'CI/CD Pipelines', proficiency: 80 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="orb orb-secondary w-[400px] h-[400px] -bottom-32 -left-32" />

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
            What I work with
          </span>
          <h2 className="section-heading">Skills & Expertise</h2>
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
                className={`glass-card p-8 ${cat.borderGlow}`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                    <Icon size={20} className="text-foreground/80" />
                  </div>
                  <h3 className="text-xl font-bold">{cat.category}</h3>
                </div>

                <div className="space-y-5">
                  {cat.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{
                            delay: 0.5 + catIndex * 0.15 + skillIndex * 0.08,
                            duration: 0.8,
                            ease: 'easeOut',
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="gradient-divider mt-24" />
    </section>
  );
}
