const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'lekhanpro';
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

async function fetchGitHub<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
}

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export interface GitHubProfile {
  name: string;
  login: string;
  avatar: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  email: string;
  twitter: string;
  followers: number;
  repos: number;
  createdAt: string;
  url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
}

// Fallback data so the site renders even when GitHub API is unreachable
export const FALLBACK_PROFILE: GitHubProfile = {
  name: 'Lekhan H R',
  login: 'lekhanpro',
  avatar: 'https://avatars.githubusercontent.com/u/lekhanpro',
  bio: 'Full-Stack Developer & AI Enthusiast',
  location: 'Bengaluru',
  company: 'Independent',
  blog: 'https://lekhan.vercel.app',
  email: '',
  twitter: '',
  followers: 5,
  repos: 25,
  createdAt: '2022-06-01T00:00:00Z',
  url: 'https://github.com/lekhanpro',
};

export const FALLBACK_REPOS: GitHubRepository[] = [
  {
    id: 1,
    name: 'chess-post-game-analyst',
    description: 'AI-powered chess game analysis with Stockfish engine integration. Detects blunders, missed tactics, and provides personalized coaching.',
    url: 'https://github.com/lekhanpro/chess-post-game-analyst',
    homepage: '',
    language: 'Python',
    stars: 4,
    forks: 1,
    updatedAt: '2025-12-01T00:00:00Z',
    createdAt: '2025-03-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'CodeGuard',
    description: 'Real-time code quality monitoring platform that analyzes codebases for security vulnerabilities, code smells, and best practice violations.',
    url: 'https://github.com/lekhanpro/CodeGuard',
    homepage: '',
    language: 'TypeScript',
    stars: 3,
    forks: 1,
    updatedAt: '2025-11-20T00:00:00Z',
    createdAt: '2025-04-10T00:00:00Z',
  },
  {
    id: 3,
    name: 'spendwisev2',
    description: 'Full-featured personal finance tracker with expense categorization, budget planning, and visual analytics.',
    url: 'https://github.com/lekhanpro/spendwisev2',
    homepage: '',
    language: 'TypeScript',
    stars: 2,
    forks: 0,
    updatedAt: '2025-10-15T00:00:00Z',
    createdAt: '2025-05-20T00:00:00Z',
  },
  {
    id: 4,
    name: 'scholarsync',
    description: 'Academic collaboration platform connecting students for group study, resource sharing, and project coordination.',
    url: 'https://github.com/lekhanpro/scholarsync',
    homepage: '',
    language: 'TypeScript',
    stars: 2,
    forks: 1,
    updatedAt: '2025-09-10T00:00:00Z',
    createdAt: '2025-01-25T00:00:00Z',
  },
  {
    id: 5,
    name: 'chaos-dock',
    description: 'Lightweight container orchestration tool with chaos engineering principles — inject failures, test resilience.',
    url: 'https://github.com/lekhanpro/chaos-dock',
    homepage: '',
    language: 'Go',
    stars: 1,
    forks: 0,
    updatedAt: '2025-08-05T00:00:00Z',
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'curesync',
    description: 'Healthcare platform streamlining patient-doctor communication with appointment scheduling and telemedicine integration.',
    url: 'https://github.com/lekhanpro/curesync',
    homepage: '',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    updatedAt: '2025-07-20T00:00:00Z',
    createdAt: '2024-11-10T00:00:00Z',
  },
  {
    id: 7,
    name: 'lekhan-portfolio',
    description: 'Editorial monochrome portfolio with React 19, Vite 7, Tailwind CSS 4, Framer Motion, and live GitHub API integration.',
    url: 'https://github.com/lekhanpro/lekhan-portfolio',
    homepage: 'https://lekhan.vercel.app',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    updatedAt: '2025-12-15T00:00:00Z',
    createdAt: '2025-07-01T00:00:00Z',
  },
];

export async function fetchProfile(): Promise<GitHubProfile> {
  const cached = getCached<GitHubProfile>('profile');
  if (cached) return cached;

  try {
    const data = await fetchGitHub<any>(`/users/${GITHUB_USERNAME}`);

    const profile: GitHubProfile = {
      name: data.name || data.login,
      login: data.login,
      avatar: data.avatar_url,
      bio: data.bio || 'Full-Stack Developer & AI Enthusiast',
      location: data.location || 'Bengaluru',
      company: data.company || 'Independent',
      blog: data.blog || '',
      email: data.email || '',
      twitter: data.twitter_username || '',
      followers: data.followers || 0,
      repos: data.public_repos || 0,
      createdAt: data.created_at,
      url: data.html_url,
    };

    setCached('profile', profile);
    return profile;
  } catch (err) {
    console.warn('GitHub API failed for profile, using fallback data:', err);
    return FALLBACK_PROFILE;
  }
}

export async function fetchRepositories(): Promise<GitHubRepository[]> {
  const cached = getCached<GitHubRepository[]>('repos');
  if (cached) return cached;

  try {
    const data = await fetchGitHub<any[]>(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);

    const repos: GitHubRepository[] = data
      .filter(repo => !repo.fork && !repo.archived)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'A custom built project',
        url: repo.html_url,
        homepage: repo.homepage || '',
        language: repo.language || 'Code',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
      }));

    setCached('repos', repos);
    return repos;
  } catch (err) {
    console.warn('GitHub API failed for repositories, using fallback data:', err);
    return FALLBACK_REPOS;
  }
}

export function getTopRepositories(repos: GitHubRepository[], limit: number = 6): GitHubRepository[] {
  return repos
    .slice()
    .sort((a, b) => {
      const scoreA = a.stars * 10 + new Date(a.updatedAt).getTime() / 1000000000;
      const scoreB = b.stars * 10 + new Date(b.updatedAt).getTime() / 1000000000;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export interface LanguageStats {
  name: string;
  count: number;
}

export function getLanguageStats(repos: GitHubRepository[]): LanguageStats[] {
  const counts: Record<string, number> = {};

  repos.forEach(repo => {
    if (!repo.language) return;
    counts[repo.language] = (counts[repo.language] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export interface ExperienceEvent {
  title: string;
  date: string;
  detail: string;
}

export function generateExperienceTimeline(profile: GitHubProfile, repos: GitHubRepository[]): ExperienceEvent[] {
  const events: ExperienceEvent[] = [];

  // Joined GitHub
  events.push({
    title: 'Joined GitHub',
    date: formatDate(profile.createdAt),
    detail: `Started as @${profile.login}`,
  });

  if (repos.length > 0) {
    // First repository
    const sortedByCreated = repos.slice().sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    const firstRepo = sortedByCreated[0];
    events.push({
      title: 'First public repository',
      date: formatDate(firstRepo.createdAt),
      detail: firstRepo.name,
    });

    // Most starred project
    const mostStarred = repos.slice().sort((a, b) => b.stars - a.stars)[0];
    if (mostStarred.stars > 0) {
      events.push({
        title: 'Most starred project',
        date: formatDate(mostStarred.createdAt),
        detail: `${mostStarred.name} (${mostStarred.stars} stars)`,
      });
    }

    // Latest update
    const latest = repos[0];
    events.push({
      title: 'Latest update',
      date: formatDate(latest.updatedAt),
      detail: `Updated ${latest.name}`,
    });
  }

  return events;
}

function formatDate(dateString: string): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
