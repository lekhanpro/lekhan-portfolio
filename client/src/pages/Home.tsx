import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
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

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [projects, setProjects] = useState<GitHubRepository[]>([]);
  const [languages, setLanguages] = useState<LanguageStats[]>([]);
  const [experience, setExperience] = useState<ExperienceEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch profile
        const profileData = await fetchProfile();
        setProfile(profileData);

        // Fetch repositories
        const reposData = await fetchRepositories();
        const topRepos = getTopRepositories(reposData, 6);
        setProjects(topRepos);

        // Get language stats
        const langStats = getLanguageStats(reposData);
        setLanguages(langStats);

        // Generate experience timeline
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="pt-16">
        <Hero profile={profile} isLoading={isLoading} />
        <About profile={profile} languages={languages} isLoading={isLoading} />
        <Skills />
        <Projects projects={projects} isLoading={isLoading} />
        <Experience events={experience} isLoading={isLoading} />
        <Contact profile={profile} isLoading={isLoading} />
      </main>

      <Footer />

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
