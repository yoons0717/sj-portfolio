# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `sj-portfolio`, a Next.js 15 portfolio application using React 19, TypeScript, and Tailwind CSS 4. The project integrates with Supabase for database operations and features a creative dark-themed portfolio design with project categorization.

## Commands

### Development
```bash
npm run dev      # Development server with Turbopack (--turbopack flag)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint linting
```

## Architecture

### Database Integration
- **Supabase**: PostgreSQL database with TypeScript integration
- **Tables**: `projects` and `profiles` with full CRUD operations
- **Environment Variables**: 
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Key Directories

#### `/src/lib/`
- `supabase.ts` - Supabase client configuration
- `supabase-server.ts` - Server-side Supabase client
- `api/projects.ts` - Complete CRUD operations for projects

#### `/src/types/`
- `database.ts` - TypeScript definitions for Supabase tables with Row, Insert, and Update types

#### `/src/app/`
- Next.js 15 App Router structure
- Dynamic routing: `/projects/[category]/` and `/projects/[category]/[id]/`
- Layout uses Geist fonts (Sans and Mono variants)

### Project Data Model
```typescript
projects: {
  id: string
  title: string
  content: string | null
  category: string | null
  thumbnail_url: string | null
  created_at: string
  updated_at: string
  author_id: string
}

profiles: {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}
```

### UI Features
- **Design**: Dark theme with purple accent color (`#c893c8`)
- **Loading States**: Custom spinner with "Loading amazing projects..." message
- **Error Handling**: User-friendly error messages with retry functionality
- **Category System**: Dynamic project categorization with thumbnail previews
- **Responsive**: Mobile-first design with Tailwind CSS

### Component Structure
- `Header.tsx` and `Footer.tsx` - Shared layout components
- `HeroBanner.tsx` - Main homepage hero section
- Portfolio displays profile information with avatar and description
- Category grid with hover effects and project counts

### API Functions (src/lib/api/projects.ts)
- `getProjects()` - Fetch all projects
- `getProjectsByCategory(category)` - Fetch projects by category
- `getProject(id)` - Fetch single project
- `createProject(project)` - Create new project
- `updateProject(id, project)` - Update existing project
- `deleteProject(id)` - Delete project
- `getCategoriesWithCount()` - Get categories with project counts and fallback thumbnails

### Fallback Data
The app includes fallback mock data for categories (Development, Design, VR/AR Production, Proposals) when Supabase data is unavailable, ensuring the portfolio remains functional during development or database issues.