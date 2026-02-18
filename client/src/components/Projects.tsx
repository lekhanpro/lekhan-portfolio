import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitHubRepository } from '@/lib/github';
import { ExternalLink, Github, Star, GitFork, Calendar } from 'lucide-react';

interface ProjectsProps {
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

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#ED8B00',
  'C++': '#00599C',
  C: '#A8B9CC',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Dart: '#0175C2',
  Kotlin: '#7F52FF',
  Swift: '#FA7343',
  Ruby: '#CC342D',
  PHP: '#777BB4',
  Shell: '#89E051',
  Code: '#6366F1',
};

function getTechStack(project: GitHubRepository): string[] {
  const stack: string[] = [];
  if (project.language) stack.push(project.language);

  const name = project.name.toLowerCase();
  const desc = (project.description || '').toLowerCase();
  const combined = name + ' ' + desc;

  if (combined.includes('react') && !stack.includes('React')) stack.push('React');
  if (combined.includes('next') && !stack.includes('Next.js')) stack.push('Next.js');
  if (combined.includes('node') && !stack.includes('Node.js')) stack.push('Node.js');
  if (combined.includes('python') && !stack.includes('Python')) stack.push('Python');
  if (combined.includes('tailwind')) stack.push('Tailwind');
  if (combined.includes('firebase')) stack.push('Firebase');
  if (combined.includes('mongo')) stack.push('MongoDB');
  if (combined.includes('ai') || combined.includes('ml') || combined.includes('machine learning'))
    stack.push('AI/ML');
  if (combined.includes('docker')) stack.push('Docker');

  return Array.from(new Set(stack)).slice(0, 4);
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: GitHubRepository;
  index: number;
  isInView: boolean;
}) {
  const techStack = getTechStack(project);
  const langColor = LANG_COLORS[project.language] || '#6366F1';

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index + 1}
      variants={fadeUp}
      className="glass-card p-6 flex flex-col h-full group relative overflow-hidden"
    >
      {/* Glow accent on hover */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        style={{ background: `${langColor}20` }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold leading-tight group-hover:text-indigo-300 transition-colors">
              {project.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </h3>
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
              style={{ backgroundColor: langColor }}
              title={project.language}
            />
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-white/[0.06] border border-white/[0.08] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow line-clamp-3">
          {project.description || 'A custom built project showcasing modern development practices.'}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground">
          {project.stars > 0 && (
            <div className="flex items-center gap-1">
              <Star size={13} className="text-amber-400" />
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks > 0 && (
            <div className="flex items-center gap-1">
              <GitFork size={13} />
              <span>{project.forks}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={13} />
            <span>{new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-4 border-t border-white/[0.06]">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 hover:from-indigo-500/25 hover:to-purple-500/25 border border-indigo-500/20 text-sm font-medium transition-all duration-300"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium transition-all duration-300 ${
              !project.homepage ? 'flex-1' : ''
            }`}
          >
            <Github size={14} />
            Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects, isLoading }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (isLoading) {
    return (
      <section id="projects" className="py-24">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white/5 rounded-2xl w-52" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="orb orb-accent w-[350px] h-[350px] top-20 -right-24" />

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
            My work
          </span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-subtitle">
            Production-grade applications built with modern technologies and best practices
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card">
            <p className="text-muted-foreground text-lg">Loading projects from GitHub...</p>
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={8}
          variants={fadeUp}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/lekhanpro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl glass text-foreground font-semibold hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>

      <div className="gradient-divider mt-24" />
    </section>
  );
}
