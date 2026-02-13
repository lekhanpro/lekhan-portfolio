export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', icon: '⚛️', proficiency: 95 },
        { name: 'TypeScript', icon: '📘', proficiency: 90 },
        { name: 'Tailwind CSS', icon: '🎨', proficiency: 95 },
        { name: 'React Native', icon: '📱', proficiency: 85 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: '🟢', proficiency: 90 },
        { name: 'Python', icon: '🐍', proficiency: 88 },
        { name: 'Express', icon: '⚡', proficiency: 90 },
        { name: 'Firebase', icon: '🔥', proficiency: 85 },
      ],
    },
    {
      category: 'AI & Data',
      skills: [
        { name: 'Machine Learning', icon: '🤖', proficiency: 80 },
        { name: 'Deep Learning', icon: '🧠', proficiency: 75 },
        { name: 'Data Analysis', icon: '📊', proficiency: 85 },
        { name: 'LLMs', icon: '💡', proficiency: 82 },
      ],
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git', icon: '📦', proficiency: 95 },
        { name: 'Docker', icon: '🐳', proficiency: 80 },
        { name: 'AWS', icon: '☁️', proficiency: 75 },
        { name: 'CI/CD', icon: '🔄', proficiency: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-purple-500/5 via-transparent to-indigo-500/5" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            A comprehensive toolkit of technologies and frameworks I use to build exceptional digital products
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="p-8 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <h3 className="text-2xl font-bold mb-8 gradient-text">{category.category}</h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-sm text-foreground/60">{skill.proficiency}%</span>
                    </div>

                    {/* Proficiency Bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50"
                        style={{
                          width: `${skill.proficiency}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
            <div className="text-3xl mb-3">🎓</div>
            <h4 className="font-semibold mb-2">Continuous Learning</h4>
            <p className="text-sm text-foreground/60">
              Always exploring new technologies and best practices in web development and AI
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
            <div className="text-3xl mb-3">🏆</div>
            <h4 className="font-semibold mb-2">Best Practices</h4>
            <p className="text-sm text-foreground/60">
              Following industry standards for clean code, testing, and performance optimization
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="font-semibold mb-2">Problem Solving</h4>
            <p className="text-sm text-foreground/60">
              Passionate about tackling complex challenges with innovative and scalable solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
