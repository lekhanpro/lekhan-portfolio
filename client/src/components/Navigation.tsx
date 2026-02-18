import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#opensource' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 border-b border-[#222]'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-2.5 group"
        >
          <span className="font-serif text-2xl font-bold text-white tracking-tight">
            L
          </span>
          <span className="font-medium text-lg text-[#ededed] hidden sm:inline tracking-tight">
            Lekhan
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isActive
                    ? 'text-white'
                    : 'text-[#888] hover:text-[#ededed]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-[#1a1a1a] border border-[#222]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#contact')}
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-lg border border-[#333] text-[#ededed] text-sm font-medium hover:bg-[#1a1a1a] hover:border-[#444] transition-all duration-300"
          >
            Get in Touch
            <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:hidden overflow-hidden bg-[#0a0a0a] border-t border-[#222]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container py-4 flex flex-col gap-1" role="menu">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl text-left transition-all ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-white bg-[#1a1a1a]'
                      : 'text-[#888] hover:text-[#ededed] hover:bg-[#141414]'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                >
                  {item.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="mt-2 px-4 py-3 rounded-xl border border-[#333] text-[#ededed] text-sm font-semibold text-center hover:bg-[#1a1a1a] transition-all"
                aria-label="Navigate to contact section"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
