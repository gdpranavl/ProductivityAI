# Notes AI Dashboard

A modern, AI-powered note-taking and productivity app built with Next.js, Supabase, and Tailwind CSS. Manage notes, to-dos, daily summaries, and team collaborations with intuitive UI and real-time data.

## Features

- **User Authentication**: Signup, login, and secure sessions via Supabase Auth.
- **Notes Management**: Create, edit, delete, and view detailed notes. Generate AI summaries on-demand.
- **To-Do List**: Organize tasks with a dedicated to-dos page.
- **Daily Summary**: Quick overview of daily highlights.
- **Team Collaboration**: Invite collaborators, track shared activity, and visualize collaboration stats over time.
- **Responsive Dashboard**: Carousels of cards with icons and previews for each section.

## Tech Stack

- **Framework**: Next.js App Router (v15) with Turbopack
- **UI**: React, Tailwind CSS, Shadcn/ui components
- **State & Data**: Supabase (Auth & Postgres)
- **Charts**: Recharts for data visualization
- **Icons**: React Icons (Heroicons set)
- **AI**: Serverless API route for summary generation
- **Linting & Types**: TypeScript, ESLint

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- A Supabase project (refer to Supabase docs)

### Installation

```bash
git clone https://github.com/yourusername/notes-ai.git
cd notes-ai
npm install
```

### Environment Variables

Create a `.env.local` file at project root with:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/README.md
/app
  /api
    summarize.ts          # AI summary endpoint
  /dashboard
    layout.tsx            # Auth guard & layout
    page.tsx              # Dashboard cards
  /notes
    [id]
      page.tsx            # Note detail & summary
    page.tsx              # Notes list
  /todos
    page.tsx              # To-do list
  /daily-summary
    page.tsx              # Daily summary view
  /collaboration
    page.tsx              # Collaboration stats
/lib
  supabaseClient.ts       # Supabase init
/components/ui           # Reusable UI components (Card, Button, etc.)
/public                  # Static assets
/README.md
```

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

Deploy on Vercel or any Next.js-compatible host:

```bash
npm run build
npm run start
```
- **Vercel Demo**: https://productivity-ai-xi.vercel.app

Follow [Next.js deployment docs](https://nextjs.org/docs/deployment) for more.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

MIT License
