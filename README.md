# Lekhan H R - Portfolio

A modern, professional portfolio website built with React, TypeScript, and Tailwind CSS. Showcases projects, skills, experience, and GitHub contributions with a beautiful dark-themed design.

![Portfolio Preview](./preview.png)

## Features

- **Dynamic GitHub Integration** - Automatically fetches profile, repositories, and contribution data from GitHub
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark Theme** - Elegant dark mode with glass morphism effects
- **Smooth Animations** - Powered by Framer Motion for engaging user experience
- **Type-Safe** - Built with TypeScript for better development experience
- **SEO Optimized** - Meta tags, Open Graph data, and structured data
- **Accessible** - ARIA labels, keyboard navigation, screen reader support
- **Performance Optimized** - Code splitting, lazy loading, and efficient caching

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4 |
| **UI Components** | shadcn/ui, Radix UI |
| **Build Tool** | Vite 7 |
| **Animation** | Framer Motion |
| **Routing** | wouter |
| **State Management** | TanStack Query |
| **Backend** | Node.js, Express, tRPC |
| **Database** | MySQL with Drizzle ORM |
| **Deployment** | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- MySQL database (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lekhanpro/lekhan-portfolio.git
   cd lekhan-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the variables:
   - `GITHUB_USERNAME` - Your GitHub username
   - `DATABASE_URL` - MySQL connection string (optional for frontend-only)

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

This portfolio is optimized for Vercel deployment:

1. Install Vercel CLI: `pnpm i -g vercel`
2. Deploy: `vercel`

For detailed deployment instructions, see [README_DEPLOY.md](./README_DEPLOY.md).

## Project Structure

```
lekhan-portfolio/
├── api/                    # Vercel serverless functions
├── client/
│   ├── index.html          # HTML entry point
│   └── src/
│       ├── App.tsx         # Root component
│       ├── main.tsx        # Application entry
│       ├── index.css       # Global styles
│       ├── components/     # React components
│       │   ├── ui/         # shadcn/ui components
│       │   ├── Hero.tsx
│       │   ├── About.tsx
│       │   ├── Skills.tsx
│       │   ├── Projects.tsx
│       │   └── ...
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       ├── lib/            # Utilities and API clients
│       └── pages/          # Page components
├── server/                 # Express backend
├── drizzle/                # Database migrations
├── shared/                 # Shared code
├── .env.example            # Environment template
├── vercel.json             # Vercel configuration
├── vite.config.ts          # Vite configuration
└── package.json
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run tests |
| `pnpm check` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm db:push` | Push database schema |

## Customization

### Update Personal Information

1. **GitHub Profile** - Update `GITHUB_USERNAME` in `.env` to fetch your GitHub data
2. **Skills** - Edit `client/src/components/Skills.tsx`
3. **Tech Stack** - Modify the `techStack` array in `client/src/components/Hero.tsx`

### Styling

- Colors and themes are defined in `client/src/index.css`
- Customize Tailwind config in `tailwind.config.ts`
- Component styles use Tailwind utility classes

## Performance

The portfolio implements several performance optimizations:

- **Code Splitting** - Lazy loading for heavy components
- **Image Optimization** - Via Vercel's Image Optimization
- **Caching** - 10-minute cache for GitHub API responses
- **Tree Shaking** - Only used code is bundled

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Skip to content link
- Semantic HTML structure
- Color contrast compliance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this template for your own portfolio.

## Connect

- **GitHub**: [@lekhanpro](https://github.com/lekhanpro)
- **LinkedIn**: [Lekhan H R](https://linkedin.com/in/lekhan-h-r)
- **Website**: [lekhan.vercel.app](https://lekhan.vercel.app)
