import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitHubProfile, GitHubRepository } from '@/lib/github';
import { Github, GitPullRequest, Star, GitFork, ExternalLink, Trophy } from 'lucide-react';

interface GSoCShowcaseProps {
  profile: GitHubProfile | null;
  projects: GitHubRepository[];
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

export default function GSoCShowcase({ profile, projects, isLoading }: GSoCShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (isLoading) {
    return (
      <section id="opensource" className="py-24">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white/5 rounded-2xl w-64" />
            <div className="h-60 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);
  const totalForks = projects.reduce((sum, p) => sum + p.forks, 0);
  const topProject = projects.slice().sort((a, b) => b.stars - a.stars)[0];

  const osStats = [
    {
      icon: Github,
      label: 'Public Repos',
      value: profile?.repos.toString() || '0',
      gradient: 'from-indigo-500/20 to-blue-500/20',
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: totalStars.toString(),
      gradient: 'from-amber-500/20 to-yellow-500/20',
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: totalForks.toString(),
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: GitPullRequest,
      label: 'Contributions',
      value: 'Active',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  return (
    <section id="opensource" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="orb orb-primary w-[400px] h-[400px] -top-20 -left-32" />
      <div className="orb orb-accent w-[300px] h-[300px] bottom-0 right-0" />

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
            Open Source & GSoC
          </span>
          <h2 className="section-heading">
            Open Source{' '}
            <span className="gradient-text">Contributions</span>
          </h2>
          <p className="section-subtitle">
            Actively contributing to the open-source ecosystem and preparing for Google Summer of Code
          </p>
        </motion.div>

        {/* GSoC Banner */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
          variants={fadeUp}
          className="glass-card p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
              <Trophy size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">
                GSoC 2025 Aspirant
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Actively exploring organizations and building expertise in open-source development.
                Focused on contributing to projects that align with my skills in full-stack web development,
                AI/ML tooling, and developer experience.
              </p>
            </div>
            <a
              href="https://github.com/lekhanpro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
            >
              <Github size={16} />
              View Profile
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>

        {/* GitHub Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {osStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={i + 2}
                variants={fadeUp}
                className="glass-card p-6 text-center"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={20} className="text-foreground/80" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Open Source Project */}
        {topProject && (
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={6}
            variants={fadeUp}
          >
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
              Featured Repository
            </h3>
            <div className="glass-card p-6 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">
                    {topProject.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {topProject.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400" />
                      {topProject.stars} stars
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} />
                      {topProject.forks} forks
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] uppercase font-semibold tracking-wider">
                      {topProject.language}
                    </span>
                  </div>
                </div>
                <a
                  href={topProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium hover:bg-white/10 transition-all flex-shrink-0"
                >
                  <Github size={16} />
                  View Repo
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contribution Activity hint */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={7}
          variants={fadeUp}
          className="mt-8 text-center"
        >
          <a
            href={`https://github.com/${profile?.login || 'lekhanpro'}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            View all repositories on GitHub
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>

      <div className="gradient-divider mt-24" />
    </section>
  );
}
