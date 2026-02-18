import { useEffect, useState, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import FeatureGrid from '@/components/FeatureGrid';
import CallToAction from '@/components/CallToAction';
import SEO from '@/components/SEO';
import LoadingSkeleton, { CardSkeleton, TimelineSkeleton, SkillSkeleton } from '@/components/LoadingSkeleton';
import Footer from '@/components/Footer';
import {
  fetchProfile,
  fetchRepositories,
  getTopRepositories,
  getLanguageStats,
  generateExperienceTimeline,
  GitHubProfile,
  GitHubRepository,
  LanguageStats,
  ExperienceEvent,
} from '@/lib/github';

// Lazy load heavy components for better initial page load
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const GSoCShowcase = lazy(() => import('@/components/GSoCShowcase'));
const Experience = lazy(() => import('@/components/Experience'));
const Contact = lazy(() => import('@/components/Contact'));

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [projects, setProjects] = useState<GitHubRepository[]>([]);
  const [allRepos, setAllRepos] = useState<GitHubRepository[]>([]);
  const [languages, setLanguages] = useState<LanguageStats[]>([]);
  const [experience, setExperience] = useState<ExperienceEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const profileData = await fetchProfile();
        setProfile(profileData);

        const reposData = await fetchRepositories();
        setAllRepos(reposData);
        const topRepos = getTopRepositories(reposData, 6);
        setProjects(topRepos);

        const langStats = getLanguageStats(reposData);
        setLanguages(langStats);

        const experienceEvents = generateExperienceTimeline(profileData, reposData);
        setExperience(experienceEvents);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load portfolio data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* SEO Meta Tags */}
      <SEO
        title={profile ? `${profile.name} | Full-Stack Developer & AI Enthusiast` : 'Lekhan H R | Full-Stack Developer & AI Enthusiast'}
        description={profile?.bio || 'Portfolio of Lekhan H R, a Full-Stack Developer & AI Enthusiast specializing in React, TypeScript, Node.js, and AI/ML.'}
        image={profile?.avatar || '/og-image.png'}
        url="https://lekhan.vercel.app/"
      />

      <Navigation />

      <main id="main-content" className="pt-16">
        <Hero profile={profile} isLoading={isLoading} />

        <Marquee />

        <FeatureGrid />

        {/* About Section with Lazy Loading */}
        <Suspense fallback={<section id="about" className="py-20"><div className="container"><CardSkeleton count={1} /></div></section>}>
          <About profile={profile} languages={languages} isLoading={isLoading} />
        </Suspense>

        {/* Skills Section with Lazy Loading */}
        <Suspense fallback={<section id="skills" className="py-20"><div className="container"><SkillSkeleton /></div></section>}>
          <Skills />
        </Suspense>

        {/* Projects Section with Lazy Loading */}
        <Suspense fallback={<section id="projects" className="py-20"><div className="container"><CardSkeleton count={3} /></div></section>}>
          <Projects projects={projects} isLoading={isLoading} />
        </Suspense>

        {/* GSoC Showcase with Lazy Loading */}
        <Suspense fallback={<section id="opensource" className="py-20"><div className="container"><CardSkeleton count={2} /></div></section>}>
          <GSoCShowcase profile={profile} projects={allRepos} isLoading={isLoading} />
        </Suspense>

        {/* Experience Section with Lazy Loading */}
        <Suspense fallback={<section id="experience" className="py-20"><div className="container"><TimelineSkeleton count={4} /></div></section>}>
          <Experience events={experience} isLoading={isLoading} />
        </Suspense>

        {/* Contact Section with Lazy Loading */}
        <Suspense fallback={<section id="contact" className="py-20"><div className="container"><CardSkeleton count={1} /></div></section>}>
          <Contact profile={profile} isLoading={isLoading} />
        </Suspense>
        <CallToAction />
      </main>

      <Footer />

      {/* Error Toast - Improved accessibility */}
      {error && (
        <div
          className="fixed bottom-4 right-4 p-4 rounded-xl bg-[#141414] border border-[#333] text-red-300 text-sm max-w-sm shadow-lg z-50"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-medium mb-1">Error</p>
          <p className="text-red-300/80 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
