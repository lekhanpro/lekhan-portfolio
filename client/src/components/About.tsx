import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitHubProfile, LanguageStats } from '@/lib/github';
import { Users, FolderGit2, Calendar, Code2, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

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
      value: profile?.followers.toLocaleString() || '4',
      icon: Users,
    },
    {
      label: 'Public Repos',
      value: profile?.repos.toLocaleString() || '25',
      icon: FolderGit2,
    },
    {
      label: 'Since',
      value: profile?.createdAt ? new Date(profile.createdAt).getFullYear().toString() : '2024',
      icon: Calendar,
    },
    {
      label: 'Top Language',
      value: languages[0]?.name || 'TypeScript',
      icon: Code2,
    },
  ];

  const socials = [
    { icon: Github, href: profile?.url || 'https://github.com/lekhanpro', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/lekhan-h-r', label: 'LinkedIn' },
    { icon: Twitter, href: profile?.twitter ? `https://twitter.com/${profile.twitter}` : 'https://twitter.com/lekhu4405', label: 'Twitter' },
  ];

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      <div className="container">
        {/* Section Header — editorial style like "A QUICK GLANCE" */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="mb-16"
        >
          <span className="text-sm font-semibold text-[#888] uppercase tracking-widest mb-3 block">
            A Quick Glance
          </span>
          <h2 className="section-heading">
            Building the bridge between{' '}
            <span className="font-serif italic">ideas</span> and{' '}
            <span className="font-serif italic">experiences</span>
          </h2>
        </motion.div>

        {/* Editorial Body */}
        <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            variants={fadeUp}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-lg text-[#aaa] leading-relaxed">
              I'm a full-stack developer from{' '}
              <span className="text-white font-medium">Bangalore</span>{' '}
              with deep expertise in{' '}
              <span className="text-white font-medium">TypeScript, Python, and JavaScript</span>.
              I build production-grade web applications, edge AI systems, and developer tools —
              from Stockfish-powered chess analysis to healthcare platforms and smart money managers.
            </p>
            <p className="text-lg text-[#aaa] leading-relaxed">
              Currently pursuing Computer Science at{' '}
              <span className="text-white font-medium">DBIT</span>{' '}
              with IEEE-published research, I'm focused on open-source contributions
              and targeting{' '}
              <span className="text-white font-medium">Google Summer of Code 2025</span>.
              My code ships across{' '}
              <span className="text-white font-medium">{profile?.repos || 25}+ repositories</span>{' '}
              spanning React, Next.js, Node.js, FastAPI, Go, and AI/ML tooling.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#141414] border border-[#222] flex items-center justify-center text-[#888] hover:text-white hover:border-[#333] transition-all"
                    title={s.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
              <a
                href="#about"
                className="text-sm text-[#888] hover:text-white transition-colors inline-flex items-center gap-1 ml-2"
              >
                Dive in deeper
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Quick stats grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            variants={fadeUp}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '10+', label: 'Production Apps' },
                { value: '25+', label: 'Repositories' },
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

        {/* GitHub Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={index + 3}
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
      </div>

      <div className="gradient-divider mt-28" />
    </section>
  );
}
