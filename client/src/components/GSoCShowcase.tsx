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
      <section id="opensource" className="py-28">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-[#141414] rounded-2xl w-64" />
            <div className="h-60 bg-[#141414] rounded-2xl" />
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
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: totalStars.toString(),
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: totalForks.toString(),
    },
    {
      icon: GitPullRequest,
      label: 'Contributions',
      value: 'Active',
    },
  ];

  return (
    <section id="opensource" className="py-28 relative" ref={ref}>
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
            Open Source & GSoC
          </span>
          <h2 className="section-heading">
            Open Source <span className="font-serif italic">Contributions</span>
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
          className="solid-card-lg p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center flex-shrink-0">
              <Trophy size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-white">
                GSoC 2025 <span className="font-serif italic">Aspirant</span>
              </h3>
              <p className="text-[#888] leading-relaxed">
                Actively exploring organizations and building expertise in open-source development.
                Focused on contributing to projects that align with my skills in full-stack web development,
                AI/ML tooling, and developer experience.
              </p>
            </div>
            <a
              href="https://github.com/lekhanpro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0a0a0a] font-semibold text-sm hover:bg-[#ededed] transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
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
                className="solid-card p-6 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-[#888]" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-[#888]">{stat.label}</div>
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
            <h3 className="text-lg font-semibold mb-4 text-[#888]">
              Featured Repository
            </h3>
            <div className="solid-card p-6 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white group-hover:text-[#ccc] transition-colors">
                    {topProject.name}
                  </h4>
                  <p className="text-sm text-[#888] leading-relaxed max-w-xl">
                    {topProject.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-[#666]">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-[#888]" />
                      {topProject.stars} stars
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} />
                      {topProject.forks} forks
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#1a1a1a] border border-[#222] text-[10px] uppercase font-semibold tracking-wider text-[#888]">
                      {topProject.language}
                    </span>
                  </div>
                </div>
                <a
                  href={topProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#333] text-[#ededed] text-sm font-medium hover:bg-[#1a1a1a] hover:border-[#444] transition-all flex-shrink-0"
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
            className="text-sm text-[#666] hover:text-[#ededed] transition-colors inline-flex items-center gap-1.5"
          >
            View all repositories on GitHub
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>

      <div className="gradient-divider mt-28" />
    </section>
  );
}
