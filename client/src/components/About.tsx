import { GitHubProfile, LanguageStats } from '@/lib/github';

interface AboutProps {
  profile: GitHubProfile | null;
  languages: LanguageStats[];
  isLoading: boolean;
}

export default function About({ profile, languages, isLoading }: AboutProps) {
  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white/5">
        <div className="container">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-lg w-1/4" />
            <div className="h-40 bg-white/10 rounded-lg w-full" />
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    {
      label: 'Followers',
      value: profile?.followers.toLocaleString() || '0',
      icon: '👥',
    },
    {
      label: 'Public Repos',
      value: profile?.repos.toLocaleString() || '0',
      icon: '📦',
    },
    {
      label: 'Joined',
      value: profile?.createdAt ? new Date(profile.createdAt).getFullYear() : '—',
      icon: '📅',
    },
    {
      label: 'Top Language',
      value: languages[0]?.name || '—',
      icon: '💻',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            {profile?.bio || 'Full-Stack Developer with a passion for building innovative solutions'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        {languages.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">Top Programming Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="font-semibold mb-2">{lang.name}</div>
                  <div className="text-sm text-foreground/60">{lang.count} repositories</div>
                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      style={{
                        width: `${(lang.count / (languages[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Text */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Crafting Digital Experiences</h3>
            <p className="text-foreground/70 leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies and artificial intelligence. 
              My journey in tech has been driven by a love for solving complex problems and creating elegant solutions.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              With experience in React, Node.js, Python, and AI/ML, I build scalable applications that make a real impact. 
              I'm constantly learning and exploring new technologies to stay at the forefront of innovation.
            </p>
            <div className="pt-4">
              <a
                href={profile?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-foreground font-medium hover:bg-white/20 transition-all duration-200"
              >
                View Full Profile →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-4xl font-bold gradient-text mb-2">4+</div>
              <div className="text-foreground/60">Projects Built</div>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <div className="text-foreground/60">Dedication</div>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-4xl font-bold gradient-text mb-2">∞</div>
              <div className="text-foreground/60">Learning</div>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-4xl font-bold gradient-text mb-2">🚀</div>
              <div className="text-foreground/60">Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
