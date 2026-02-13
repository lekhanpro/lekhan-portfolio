import { useState } from 'react';
import { GitHubProfile } from '@/lib/github';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

interface ContactProps {
  profile: GitHubProfile | null;
  isLoading: boolean;
}

export default function Contact({ profile, isLoading }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link
      const subject = encodeURIComponent('Portfolio Contact Form');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${profile?.email || 'contact@example.com'}?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: profile?.url || '#',
      color: 'hover:text-white',
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${profile?.email || 'contact@example.com'}`,
      color: 'hover:text-red-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      color: 'hover:text-blue-400',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: profile?.twitter ? `https://twitter.com/${profile.twitter}` : '#',
      color: 'hover:text-blue-300',
    },
  ];

  if (isLoading) {
    return (
      <section id="contact" className="py-20 bg-white/5">
        <div className="container">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-lg w-1/4" />
            <div className="h-40 bg-white/10 rounded-lg w-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg text-foreground/60">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Email</p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-foreground hover:text-indigo-400 transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile?.location && (
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">📍</span>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Location</p>
                      <p className="text-foreground">{profile.location}</p>
                    </div>
                  </div>
                )}

                {profile?.blog && (
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">🌐</span>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Website</p>
                      <a
                        href={profile.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-indigo-400 transition-colors"
                      >
                        {profile.blog.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {contactLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-white/10 border border-white/20 text-foreground/70 transition-all duration-200 hover:bg-white/20 ${link.color}`}
                      title={link.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Your message..."
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
