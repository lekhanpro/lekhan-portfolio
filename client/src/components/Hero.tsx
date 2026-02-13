import { useEffect, useState } from 'react';
import { GitHubProfile } from '@/lib/github';
import { ArrowRight, Github } from 'lucide-react';

interface HeroProps {
  profile: GitHubProfile | null;
  isLoading: boolean;
}

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
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-50" />
        <div className="container relative z-10">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-lg w-3/4" />
            <div className="h-20 bg-white/10 rounded-lg w-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-50" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 slide-in-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-foreground/80">Available for opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight slide-in-up">
            Hi, I'm{' '}
            <span className="gradient-text">{profile?.name || 'Lekhan'}</span>
          </h1>

          {/* Subtitle with typing effect */}
          <p className="text-xl sm:text-2xl text-foreground/70 mb-8 h-8 slide-in-up">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Description */}
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl leading-relaxed slide-in-up">
            {profile?.bio || 'Crafting next-gen digital experiences with code and AI'}
          </p>

          {/* Location */}
          <p className="text-foreground/50 mb-8 slide-in-up">
            📍 {profile?.location || 'Bengaluru'}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-3 mb-12 slide-in-up">
            {['React', 'Node.js', 'Python', 'AI/ML', 'Firebase', 'React Native'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-foreground/80 hover:bg-white/20 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 slide-in-up">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 group"
            >
              Explore My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={profile?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/10 border border-white/20 text-foreground font-semibold hover:bg-white/20 transition-all duration-200"
            >
              <Github size={20} />
              GitHub Profile
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-sm text-foreground/50">Scroll to explore</span>
        <svg className="w-6 h-6 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
