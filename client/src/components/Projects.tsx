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

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index + 1}
      variants={fadeUp}
      className="solid-card p-6 flex flex-col h-full group"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold leading-tight text-white mb-3 group-hover:text-[#ccc] transition-colors">
            {project.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </h3>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#1a1a1a] border border-[#222] text-[#888]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#888] leading-relaxed mb-5 flex-grow line-clamp-3">
          {project.description || 'A custom built project showcasing modern development practices.'}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-5 text-xs text-[#666]">
          {project.stars > 0 && (
            <div className="flex items-center gap-1">
              <Star size={13} className="text-[#888]" />
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
        <div className="flex gap-2 pt-4 border-t border-[#222]">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a0a] text-sm font-medium hover:bg-[#ededed] transition-all duration-300"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#333] text-[#ededed] text-sm font-medium hover:bg-[#1a1a1a] hover:border-[#444] transition-all duration-300 ${
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
      <section id="projects" className="py-28">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-[#141414] rounded-2xl w-52" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-[#141414] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
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
            My work
          </span>
          <h2 className="section-heading">
            Featured <span className="font-serif italic">Projects</span>
          </h2>
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
          <div className="text-center py-16 solid-card">
            <p className="text-[#888] text-lg">Loading projects from GitHub...</p>
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-[#333] text-[#ededed] font-semibold hover:bg-[#141414] hover:border-[#444] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>

      <div className="gradient-divider mt-28" />
    </section>
  );
}
