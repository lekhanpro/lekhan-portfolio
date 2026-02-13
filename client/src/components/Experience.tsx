import { ExperienceEvent } from '@/lib/github';

interface ExperienceProps {
  events: ExperienceEvent[];
  isLoading: boolean;
}

export default function Experience({ events, isLoading }: ExperienceProps) {
  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-white/5">
        <div className="container">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-lg w-1/4" />
            <div className="space-y-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-white/10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-purple-500/5 via-transparent to-indigo-500/5" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience Timeline</h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            My journey as a developer, tracked through GitHub milestones and achievements
          </p>
        </div>

        {/* Timeline */}
        {events.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

            {/* Timeline events */}
            <div className="space-y-12">
              {events.map((event, index) => (
                <div key={index} className={`relative flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transform -translate-x-1.5 md:-translate-x-1/2 md:translate-y-6 border-4 border-background" />

                  {/* Content */}
                  <div className="flex-1 md:w-1/2 pl-8 md:pl-0">
                    <div className={`p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/10 ${
                      index % 2 === 0 ? 'md:text-right' : ''
                    }`}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                          <p className="text-foreground/70">{event.detail}</p>
                        </div>
                      </div>
                      <div className="text-sm text-foreground/50 font-medium">{event.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-foreground/60 text-lg">Loading experience timeline...</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Education</h3>
            <p className="text-foreground/70 mb-2">
              <strong>DBIT Student</strong>
            </p>
            <p className="text-foreground/60 text-sm">
              Pursuing studies in computer science with focus on full-stack development and AI/ML
            </p>
          </div>

          <div className="p-8 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Publications</h3>
            <p className="text-foreground/70 mb-2">
              <strong>IEEE Published</strong>
            </p>
            <p className="text-foreground/60 text-sm">
              Research contributions published in IEEE conferences and journals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
