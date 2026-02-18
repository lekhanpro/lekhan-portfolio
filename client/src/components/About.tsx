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
      <section id="about" className="py-28">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-[#141414] rounded-2xl w-48" />
            <div className="h-40 bg-[#141414] rounded-2xl w-full" />
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
    },
    {
      label: 'Public Repos',
      value: profile?.repos.toLocaleString() || '0',
      icon: FolderGit2,
    },
    {
      label: 'Joined',
      value: profile?.createdAt ? new Date(profile.createdAt).getFullYear().toString() : '—',
      icon: Calendar,
    },
    {
      label: 'Top Language',
      value: languages[0]?.name || '—',
      icon: Code2,
    },
  ];

  return (
    <section id="about" className="py-28 relative" ref={ref}>
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
            Get to know me
          </span>
          <h2 className="section-heading">
            About <span className="font-serif italic">Me</span>
          </h2>
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
                className="solid-card p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#888]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#888]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* About Text */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Editorial Text */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={5}
            variants={fadeUp}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">
              Crafting <span className="font-serif italic">Digital</span> Experiences
            </h3>
            <p className="text-[#888] leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies and artificial intelligence.
              My journey in tech has been driven by a love for solving complex problems and creating elegant, production-ready solutions.
            </p>
            <p className="text-[#888] leading-relaxed">
              With experience in React, Node.js, Python, and AI/ML, I build scalable applications that make a real impact.
              I actively contribute to open-source projects and am targeting GSoC to deepen my contributions to the developer community.
            </p>
          </motion.div>

          {/* Quick stats grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={6}
            variants={fadeUp}
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '4+', label: 'Projects Built' },
                { value: '100%', label: 'Dedication' },
                { value: 'GSoC', label: 'Aspirant 2025' },
                { value: 'IEEE', label: 'Published' },
              ].map((s, i) => (
                <div key={i} className="solid-card p-5 text-center">
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-[#888] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="gradient-divider mt-28" />
    </section>
  );
}
