import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubProfile } from '@/lib/github';
import { ArrowRight, Github, Download, ChevronDown } from 'lucide-react';

interface HeroProps {
  profile: GitHubProfile | null;
  isLoading: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'Python', color: '#FFD43B' },
  { name: 'AI/ML', color: '#FF6F61' },
  { name: 'Firebase', color: '#FFA611' },
  { name: 'Tailwind', color: '#38BDF8' },
];

export default function Hero({ profile, isLoading }: HeroProps) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Full-Stack Developer & AI Enthusiast';

  useEffect(() => {
    if (isLoading) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container relative z-10 pt-24">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-white/5 rounded-full w-48" />
            <div className="h-16 bg-white/5 rounded-2xl w-3/4" />
            <div className="h-8 bg-white/5 rounded-xl w-1/2" />
            <div className="h-5 bg-white/5 rounded-lg w-2/3" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-primary w-[500px] h-[500px] -top-20 -right-32"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-secondary w-[400px] h-[400px] bottom-0 -left-24"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-accent w-[300px] h-[300px] top-1/3 left-1/3"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Status Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm text-foreground/70 font-medium">
                Open to GSoC 2025 & opportunities
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="gradient-text">{profile?.name || 'Lekhan H R'}</span>
          </motion.h1>

          {/* Subtitle with typing */}
          <motion.div variants={item} className="mb-6">
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="text-indigo-400 ml-0.5"
              >
                |
              </motion.span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-lg text-muted-foreground/80 mb-8 max-w-2xl leading-relaxed"
          >
            {profile?.bio ||
              'Building production-grade applications with modern web technologies and contributing to open-source. Passionate about AI and scalable systems.'}
          </motion.p>

          {/* Tech Stack Pills */}
          <motion.div variants={item} className="flex flex-wrap gap-2.5 mb-10">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground/80 hover:bg-white/10 transition-all duration-300 group"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 group-hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}40` }}
                />
                {tech.name}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              Explore My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={profile?.url || 'https://github.com/lekhanpro'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl glass text-foreground font-semibold text-base hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Github size={18} />
              GitHub Profile
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-white/10 text-foreground/80 font-medium text-base hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
            >
              <Download size={18} />
              Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/50 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
