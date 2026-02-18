import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
  ];

  const openSource = [
    { label: 'GitHub Profile', href: 'https://github.com/lekhanpro' },
    { label: 'Open Source', href: '#opensource' },
    { label: 'Experience', href: '#experience' },
  ];

  const connect = [
    { label: 'Contact', href: '#contact' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/lekhanpro', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="border-t border-[#222] py-16">
      <div className="container">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-serif text-2xl font-bold text-white">L</span>
              <span className="font-medium text-lg text-[#ededed] tracking-tight">Lekhan H R</span>
            </div>
            <p className="text-sm text-[#888] leading-relaxed mb-4">
              Full-Stack Developer & AI Enthusiast building production-grade applications.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#141414] border border-[#222] flex items-center justify-center text-[#888] hover:text-white hover:border-[#333] transition-all"
                    title={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#ededed] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#888] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Open Source */}
          <div>
            <h4 className="text-sm font-semibold text-[#ededed] uppercase tracking-wider mb-4">
              Open Source
            </h4>
            <nav className="flex flex-col gap-2.5">
              {openSource.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-[#888] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-[#ededed] uppercase tracking-wider mb-4">
              Connect
            </h4>
            <nav className="flex flex-col gap-2.5">
              {connect.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#888] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="gradient-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <p>&copy; {currentYear} Lekhan H R. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={12} className="text-[#888]" /> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
