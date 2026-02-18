import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitHubProfile, LanguageStats } from '@/lib/github';
import { Users, FolderGit2, Calendar, Code2 } from 'lucide-react';

interface AboutProps {
  profile: GitHubProfile | null;
  languages: LanguageStats[];
  isLoading: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function About({ profile, languages, isLoading }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (isLoading) {
    return (
      <section id="about" className="py-24">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white/5 rounded-2xl w-48" />
            <div className="h-40 bg-white/5 rounded-2xl w-full" />
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    {
      label: 'Followers',
      value: profile?.followers.toLocaleString() || '0',
      icon: Users,
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      label: 'Public Repos',
      value: profile?.repos.toLocaleString() || '0',
      icon: FolderGit2,
      gradient: 'from-indigo-500/20 to-purple-500/20',
    },
    {
      label: 'Joined',
      value: profile?.createdAt ? new Date(profile.createdAt).getFullYear().toString() : '—',
      icon: Calendar,
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      label: 'Top Language',
      value: languages[0]?.name || '—',
      icon: Code2,
      gradient: 'from-pink-500/20 to-rose-500/20',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="orb orb-primary w-[350px] h-[350px] top-0 right-0" />

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
            Get to know me
          </span>
          <h2 className="section-heading">About Me</h2>
          <p className="section-subtitle">
            {profile?.bio || 'Full-Stack Developer with a passion for building innovative solutions'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={index + 1}
                variants={fadeUp}
                className="glass-card p-6 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                  <Icon size={20} className="text-foreground/80" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages + About Text */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Languages */}
          {languages.length > 0 && (
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={5}
              variants={fadeUp}
            >
              <h3 className="text-xl font-bold mb-6">Top Languages</h3>
              <div className="space-y-4">
                {languages.slice(0, 5).map((lang, i) => {
                  const pct = (lang.count / (languages[0]?.count || 1)) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{lang.name}</span>
                        <span className="text-xs text-muted-foreground">{lang.count} repos</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* About Description */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={6}
            variants={fadeUp}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold">Crafting Digital Experiences</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies and artificial intelligence.
              My journey in tech has been driven by a love for solving complex problems and creating elegant, production-ready solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With experience in React, Node.js, Python, and AI/ML, I build scalable applications that make a real impact.
              I actively contribute to open-source projects and am targeting GSoC to deepen my contributions to the developer community.
            </p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { value: '4+', label: 'Projects Built' },
                { value: '100%', label: 'Dedication' },
                { value: 'GSoC', label: 'Aspirant 2025' },
                { value: 'IEEE', label: 'Published' },
              ].map((s, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <div className="text-xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="gradient-divider mt-24" />
    </section>
  );
}
