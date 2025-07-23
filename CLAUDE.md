# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run type checking and generate types
npm run typecheck

# Run linting and type checking
npm run lint
```

## Project Architecture

This is a React Starter Kit (RSK) built with React Router v7 as a full-stack React framework, featuring a complete SaaS template with authentication, payments, AI chat, and real-time data capabilities.

### Core Framework & Tools
- **React Router v7**: Full-stack React framework with SSR enabled by default
- **TypeScript**: Strict mode enabled with path alias `~/*` mapping to `./app/*`
- **Vite**: Build tool with TailwindCSS v4 plugin and tsconfig path resolution
- **TailwindCSS v4**: Modern utility-first CSS with PostCSS integration
- **shadcn/ui**: Component library configured with "new-york" style and Lucide icons

### Key Integrations
- **Convex**: Real-time database and serverless backend functions
- **Clerk**: Authentication and user management via `@clerk/react-router`
- **Polar.sh**: Subscription billing and payment handling via `@polar-sh/sdk`
- **OpenAI**: AI chat capabilities via `@ai-sdk/openai` and `ai` SDK
- **Vercel**: Deployment preset configured in `react-router.config.ts`

### Project Structure
```
app/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── homepage/           # Homepage sections (navbar, pricing, footer)
│   ├── dashboard/          # Dashboard components (sidebar, charts, nav)
│   └── logos/              # Brand logo components
├── routes/
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   ├── index.tsx       # Main dashboard
│   │   ├── chat.tsx        # AI chat interface
│   │   └── settings.tsx    # User settings
│   ├── home.tsx            # Homepage route
│   ├── pricing.tsx         # Pricing page
│   ├── sign-in.tsx         # Authentication
│   ├── sign-up.tsx         # Registration
│   └── success.tsx         # Post-checkout success
├── hooks/                  # React hooks (use-mobile.ts)
├── lib/                    # Utilities (utils.ts)
└── root.tsx               # App root with providers

convex/                    # Convex backend functions and schema
```

### Authentication & Route Protection
- Protected routes use Clerk authentication
- Dashboard routes are grouped under `/dashboard` with shared layout
- Server-side user data loading via React Router loaders
- Automatic user synchronization between Clerk and Convex

### Subscription & Payment Flow
- Dynamic pricing fetched from Polar.sh API
- Secure checkout with redirect handling
- Webhook endpoint at `/webhook/polar` for payment events
- Real-time subscription status updates via Convex

### AI Chat System
- OpenAI-powered chat interface in `/dashboard/chat`
- Real-time message streaming with `@ai-sdk/react`
- Chat history persistence via Convex database
- Responsive chat UI components

### Development Notes
- TypeScript paths use `~/*` alias for `./app/*`
- Components follow shadcn/ui patterns with Radix UI primitives
- Uses React 19 with latest React Router v7 patterns
- TailwindCSS v4 with CSS variables and neutral base color
- Motion library for animations, Recharts for data visualization