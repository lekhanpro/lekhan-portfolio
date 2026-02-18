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

export async function fetchProfile(): Promise<GitHubProfile> {
  const cached = getCached<GitHubProfile>('profile');
  if (cached) return cached;

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
}

export async function fetchRepositories(): Promise<GitHubRepository[]> {
  const cached = getCached<GitHubRepository[]>('repos');
  if (cached) return cached;

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
