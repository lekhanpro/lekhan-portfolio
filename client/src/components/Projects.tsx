import { GitHubRepository } from '@/lib/github';
import { ExternalLink, Github, Star } from 'lucide-react';

interface ProjectsProps {
  projects: GitHubRepository[];
  isLoading: boolean;
}

export default function Projects({ projects, isLoading }: ProjectsProps) {
  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white/5">
        <div className="container">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-lg w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-white/10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            A selection of my recent work showcasing my skills in full-stack development and problem-solving
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/20 flex flex-col h-full"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {project.name.replace(/-/g, ' ')}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-xs font-medium text-indigo-300 mb-4">
                      {project.language}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm text-foreground/60">
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks > 0 && (
                    <div className="flex items-center gap-1">
                      <span>🔀</span>
                      <span>{project.forks}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{new Date(project.updatedAt).getFullYear()}</span>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
                      title="Visit project"
                    >
                      <ExternalLink size={16} />
                      <span className="hidden sm:inline">Live</span>
                    </a>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40 transition-all duration-200 text-sm font-medium ${
                      !project.homepage ? 'flex-1' : ''
                    }`}
                    title="View on GitHub"
                  >
                    <Github size={16} />
                    <span className="hidden sm:inline">Code</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-foreground/60 text-lg">Loading projects from GitHub...</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/lekhanpro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/10 border border-white/20 text-foreground font-semibold hover:bg-white/20 transition-all duration-200"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
