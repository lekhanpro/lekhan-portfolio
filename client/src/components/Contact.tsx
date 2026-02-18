import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitHubProfile } from '@/lib/github';
import { Mail, Github, Linkedin, Twitter, MapPin, Globe, Send, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  profile: GitHubProfile | null;
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

export default function Contact({ profile, isLoading }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const subject = encodeURIComponent('Portfolio Contact Form');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${profile?.email || 'contact@example.com'}?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: profile?.url || 'https://github.com/lekhanpro',
      hoverColor: 'hover:border-white/30 hover:text-white',
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${profile?.email || 'contact@example.com'}`,
      hoverColor: 'hover:border-red-400/30 hover:text-red-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      hoverColor: 'hover:border-blue-400/30 hover:text-blue-400',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: profile?.twitter ? `https://twitter.com/${profile.twitter}` : '#',
      hoverColor: 'hover:border-sky-400/30 hover:text-sky-400',
    },
  ];

  if (isLoading) {
    return (
      <section id="contact" className="py-24">
        <div className="container">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white/5 rounded-2xl w-48 mx-auto" />
            <div className="h-60 bg-white/5 rounded-2xl max-w-4xl mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="orb orb-primary w-[400px] h-[400px] -bottom-20 -right-32" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3 block">
            Get in touch
          </span>
          <h2 className="section-heading">Let's Connect</h2>
          <p className="section-subtitle mx-auto">
            I'm always interested in hearing about new projects, opportunities, and open-source collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Contact Info */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            variants={fadeUp}
            className="space-y-8"
          >
            <div className="space-y-5">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-red-500/10 transition-shadow">
                    <Mail size={18} className="text-foreground/80" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm font-medium group-hover:text-indigo-300 transition-colors">
                      {profile.email}
                    </p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}

              {profile?.location && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-foreground/80" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm font-medium">{profile.location}</p>
                  </div>
                </div>
              )}

              {profile?.blog && (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-shadow">
                    <Globe size={18} className="text-foreground/80" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Website</p>
                    <p className="text-sm font-medium group-hover:text-indigo-300 transition-colors">
                      {profile.blog.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                Socials
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground transition-all duration-300 ${link.hoverColor}`}
                      title={link.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            variants={fadeUp}
          >
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all text-sm resize-none"
                    placeholder="Tell me about your project or opportunity..."
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
