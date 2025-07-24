# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
## Development Commands
*`bash
# Start development server with Turbopack
npm run dev
# Build for production
npm run build
# Start production server
npm run start
# Run linting
npm run lint I
## Project Architecture
This is a Next.js application using the react Router architecture with React 19 and TypeScript.
### Key Configuration
- **TypeScript**: Strict mode enabled with path alias @/* mapping to ./src/**
- **Styling**: Tailwind CSS v4 with PostCSS
- **Font**: Uses Inter font family (recently switched from Geist)
- **Build**: Turbopack enabled for development server
- **Deployment**: Configured for Netlify deployment
- **UI Components**: Configured to import elements from shadcn ui
###23 Project Structure
/src/app/ Next.js App Router pages and layouts
(authenticated)/Protected route group for dashboard features
login/ Authentication page
/src/components/ React components