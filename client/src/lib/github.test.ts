import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  getTopRepositories,
  getLanguageStats,
  generateExperienceTimeline,
  GitHubRepository,
  GitHubProfile,
} from './github';

describe('GitHub API Utilities', () => {
  describe('getTopRepositories', () => {
    it('should sort repositories by stars and recency', () => {
      const repos: GitHubRepository[] = [
        {
          id: 1,
          name: 'project-1',
          description: 'Project 1',
          url: 'https://github.com/lekhanpro/project-1',
          homepage: '',
          language: 'TypeScript',
          stars: 5,
          forks: 1,
          updatedAt: '2024-01-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'project-2',
          description: 'Project 2',
          url: 'https://github.com/lekhanpro/project-2',
          homepage: '',
          language: 'Python',
          stars: 20,
          forks: 2,
          updatedAt: '2024-02-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
      ];

      const topRepos = getTopRepositories(repos, 2);

      expect(topRepos[0].stars).toBe(20);
      expect(topRepos[1].stars).toBe(5);
    });

    it('should respect the limit parameter', () => {
      const repos: GitHubRepository[] = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `project-${i}`,
        description: `Project ${i}`,
        url: `https://github.com/lekhanpro/project-${i}`,
        homepage: '',
        language: 'TypeScript',
        stars: i,
        forks: 1,
        updatedAt: '2024-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
      }));

      const topRepos = getTopRepositories(repos, 3);

      expect(topRepos.length).toBe(3);
    });

    it('should return empty array for empty input', () => {
      const topRepos = getTopRepositories([], 5);
      expect(topRepos.length).toBe(0);
    });
  });

  describe('getLanguageStats', () => {
    it('should count and sort languages correctly', () => {
      const repos: GitHubRepository[] = [
        {
          id: 1,
          name: 'project-1',
          description: 'Project 1',
          url: 'https://github.com/lekhanpro/project-1',
          homepage: '',
          language: 'TypeScript',
          stars: 5,
          forks: 1,
          updatedAt: '2024-01-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'project-2',
          description: 'Project 2',
          url: 'https://github.com/lekhanpro/project-2',
          homepage: '',
          language: 'TypeScript',
          stars: 10,
          forks: 2,
          updatedAt: '2024-02-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
        {
          id: 3,
          name: 'project-3',
          description: 'Project 3',
          url: 'https://github.com/lekhanpro/project-3',
          homepage: '',
          language: 'Python',
          stars: 3,
          forks: 1,
          updatedAt: '2024-03-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
      ];

      const stats = getLanguageStats(repos);

      expect(stats[0].name).toBe('TypeScript');
      expect(stats[0].count).toBe(2);
      expect(stats[1].name).toBe('Python');
      expect(stats[1].count).toBe(1);
    });

    it('should limit results to 6 languages', () => {
      const repos: GitHubRepository[] = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `project-${i}`,
        description: `Project ${i}`,
        url: `https://github.com/lekhanpro/project-${i}`,
        homepage: '',
        language: `Language${i}`,
        stars: i,
        forks: 1,
        updatedAt: '2024-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
      }));

      const stats = getLanguageStats(repos);

      expect(stats.length).toBeLessThanOrEqual(6);
    });

    it('should handle repos without language', () => {
      const repos: GitHubRepository[] = [
        {
          id: 1,
          name: 'project-1',
          description: 'Project 1',
          url: 'https://github.com/lekhanpro/project-1',
          homepage: '',
          language: 'TypeScript',
          stars: 5,
          forks: 1,
          updatedAt: '2024-01-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'project-2',
          description: 'Project 2',
          url: 'https://github.com/lekhanpro/project-2',
          homepage: '',
          language: 'Code',
          stars: 10,
          forks: 2,
          updatedAt: '2024-02-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
        },
      ];

      const stats = getLanguageStats(repos);

      expect(stats.length).toBeGreaterThan(0);
    });
  });

  describe('generateExperienceTimeline', () => {
    it('should generate timeline events from profile and repos', () => {
      const profile: GitHubProfile = {
        name: 'Lekhan H R',
        login: 'lekhanpro',
        avatar: 'https://avatars.githubusercontent.com/u/123',
        bio: 'Full-Stack Developer',
        location: 'Bengaluru',
        company: 'Independent',
        blog: '',
        email: '',
        twitter: '',
        followers: 100,
        repos: 20,
        createdAt: '2020-01-01T00:00:00Z',
        url: 'https://github.com/lekhanpro',
      };

      const repos: GitHubRepository[] = [
        {
          id: 1,
          name: 'project-1',
          description: 'Project 1',
          url: 'https://github.com/lekhanpro/project-1',
          homepage: '',
          language: 'TypeScript',
          stars: 50,
          forks: 1,
          updatedAt: '2024-01-01T00:00:00Z',
          createdAt: '2021-01-01T00:00:00Z',
        },
      ];

      const timeline = generateExperienceTimeline(profile, repos);

      expect(timeline.length).toBeGreaterThan(0);
      expect(timeline[0].title).toBe('Joined GitHub');
      expect(timeline.some(e => e.title.includes('repository'))).toBe(true);
    });

    it('should handle empty repository list', () => {
      const profile: GitHubProfile = {
        name: 'Lekhan H R',
        login: 'lekhanpro',
        avatar: 'https://avatars.githubusercontent.com/u/123',
        bio: 'Full-Stack Developer',
        location: 'Bengaluru',
        company: 'Independent',
        blog: '',
        email: '',
        twitter: '',
        followers: 100,
        repos: 0,
        createdAt: '2020-01-01T00:00:00Z',
        url: 'https://github.com/lekhanpro',
      };

      const timeline = generateExperienceTimeline(profile, []);

      expect(timeline.length).toBeGreaterThan(0);
      expect(timeline[0].title).toBe('Joined GitHub');
    });

    it('should include most starred project when available', () => {
      const profile: GitHubProfile = {
        name: 'Lekhan H R',
        login: 'lekhanpro',
        avatar: 'https://avatars.githubusercontent.com/u/123',
        bio: 'Full-Stack Developer',
        location: 'Bengaluru',
        company: 'Independent',
        blog: '',
        email: '',
        twitter: '',
        followers: 100,
        repos: 2,
        createdAt: '2020-01-01T00:00:00Z',
        url: 'https://github.com/lekhanpro',
      };

      const repos: GitHubRepository[] = [
        {
          id: 1,
          name: 'project-1',
          description: 'Project 1',
          url: 'https://github.com/lekhanpro/project-1',
          homepage: '',
          language: 'TypeScript',
          stars: 5,
          forks: 1,
          updatedAt: '2024-01-01T00:00:00Z',
          createdAt: '2021-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'project-2',
          description: 'Project 2',
          url: 'https://github.com/lekhanpro/project-2',
          homepage: '',
          language: 'Python',
          stars: 100,
          forks: 10,
          updatedAt: '2024-02-01T00:00:00Z',
          createdAt: '2021-02-01T00:00:00Z',
        },
      ];

      const timeline = generateExperienceTimeline(profile, repos);

      expect(timeline.some(e => e.title.includes('Most starred'))).toBe(true);
    });
  });
});
