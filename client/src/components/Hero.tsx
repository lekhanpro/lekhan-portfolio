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
            <div className="h-6 bg-[#141414] rounded-full w-48" />
            <div className="h-16 bg-[#141414] rounded-2xl w-3/4" />
            <div className="h-8 bg-[#141414] rounded-xl w-1/2" />
            <div className="h-5 bg-[#141414] rounded-lg w-2/3" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="container relative z-10 pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Status Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#222] bg-[#141414] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-sm text-[#888] font-medium">
                Available for GSoC 2025
              </span>
            </div>
          </motion.div>

          {/* Main Heading — serif/sans mix */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6 text-white"
          >
            Hi, I'm{' '}
            <span className="font-serif italic">{profile?.name || 'Lekhan H R'}</span>
          </motion.h1>

          {/* Subtitle with typing */}
          <motion.div variants={item} className="mb-6">
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#888] font-medium">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="text-white ml-0.5"
              >
                |
              </motion.span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-lg text-[#888] mb-10 max-w-2xl leading-relaxed"
          >
            {profile?.bio ||
              'Building production-grade applications with modern web technologies and contributing to open-source. Passionate about AI and scalable systems.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#0a0a0a] font-semibold text-base hover:bg-[#ededed] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              Explore My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={profile?.url || 'https://github.com/lekhanpro'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-[#333] text-[#ededed] font-semibold text-base hover:bg-[#141414] hover:border-[#444] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Github size={18} />
              GitHub Profile
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-[#222] text-[#888] font-medium text-base hover:border-[#333] hover:text-[#ededed] hover:bg-[#141414]/50 transition-all duration-300"
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
        <span className="text-xs text-[#555] uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-[#555]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
