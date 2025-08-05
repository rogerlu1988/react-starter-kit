# React Starter Kit (RSK) - Codebase Overview

This document provides a detailed explanation of how the React Starter Kit codebase works, its architecture, key components, and implementation details.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Structure](#frontend-structure)
3. [Backend & Data Management](#backend--data-management)
4. [Authentication Flow](#authentication-flow)
5. [Subscription System](#subscription-system)
6. [Routing System](#routing-system)
7. [UI Components](#ui-components)
8. [AI Chat Implementation](#ai-chat-implementation)
9. [Development & Deployment](#development--deployment)

## Architecture Overview

The React Starter Kit implements a modern full-stack architecture with the following core technologies:

- **React Router v7**: Provides server-side rendering (SSR) capabilities and a unified routing system
- **Convex**: Backend database and serverless functions
- **Clerk**: Authentication and user management
- **Polar.sh**: Subscription and payment handling
- **TypeScript**: End-to-end type safety

The application follows a feature-based architecture where components, routes, and backend logic are organized around specific features like authentication, dashboard, chat, and subscriptions.

### Key Technical Decisions

1. **Server-Side Rendering**: Using React Router v7 for improved SEO and performance
2. **Real-time Data**: Leveraging Convex for seamless data synchronization
3. **Authentication as a Service**: Offloading auth complexity to Clerk
4. **Subscription Management**: Using Polar.sh to handle payments and subscriptions
5. **Type Safety**: TypeScript throughout for improved developer experience

## Frontend Structure

The frontend code is primarily located in the `/app` directory with the following structure:

```
app/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   ├── homepage/      # Homepage-specific components
│   └── dashboard/     # Dashboard-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and shared logic
├── routes/            # React Router route components
│   ├── dashboard/     # Protected dashboard routes
│   ├── home.tsx       # Homepage route
│   ├── pricing.tsx    # Pricing page route
│   ├── sign-in.tsx    # Authentication routes
│   └── ...            # Other routes
├── app.css            # Global styles
└── root.tsx           # Application root component
```

### Key Frontend Files

- **`root.tsx`**: The application entry point that sets up:
  - Clerk authentication provider
  - Convex database connection
  - Global layout structure
  - Error boundaries
  
- **`routes.ts`**: Defines the application's routing structure using React Router v7's routing conventions

## Backend & Data Management

The backend functionality is primarily provided by Convex, with files located in the `/convex` directory:

```
convex/
├── _generated/        # Auto-generated API types
├── schema.ts          # Database schema definition
├── subscriptions.ts   # Subscription management logic
├── users.ts           # User management functions
└── http.ts            # HTTP endpoints (including webhooks)
```

### Convex Schema

The database schema (`schema.ts`) defines three main tables:

1. **Users**: Stores user information synced with Clerk
   - Fields: name, email, image, tokenIdentifier
   - Indexed by tokenIdentifier for quick lookup

2. **Subscriptions**: Manages subscription data from Polar.sh
   - Fields: userId, polarId, status, interval, amount, etc.
   - Indexed by userId and polarId for efficient queries

3. **WebhookEvents**: Tracks incoming webhook events
   - Fields: type, polarEventId, createdAt, data
   - Used for audit and event processing

### Backend Functions

The backend includes several serverless functions:
- User management (users.ts)
- Subscription handling (subscriptions.ts)
- Webhook processing (http.ts)

## Authentication Flow

The authentication flow is powered by Clerk and integrated with React Router:

1. **Initial Load**: The `root.tsx` file initializes ClerkProvider
2. **Protected Routes**: Dashboard routes use a loader function that:
   - Checks for authenticated user via `getAuth()`
   - Redirects to sign-in if no user is found
   - Loads user data if authenticated

3. **User Data Sync**: When users authenticate, their data is synchronized with Convex

Example from `dashboard/layout.tsx`:
```typescript
export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);
  
  // Redirect to sign-in if not authenticated
  if (!userId) {
    throw redirect("/sign-in");
  }
  
  // Parallel data fetching
  const [subscriptionStatus, user] = await Promise.all([
    fetchQuery(api.subscriptions.checkUserSubscriptionStatus, { userId }),
    createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    }).users.getUser(userId)
  ]);
  
  // Redirect to subscription page if needed
  if (!subscriptionStatus?.hasActiveSubscription) {
    throw redirect("/subscription-required");
  }
  
  return { user };
}
```

## Subscription System

The subscription system integrates with Polar.sh for payment processing:

1. **Pricing Page**: Displays subscription tiers (`pricing.tsx`)
2. **Checkout Flow**: Redirects to Polar.sh checkout
3. **Webhook Handling**: Processes subscription events via webhook endpoint
4. **Subscription Status**: Checks subscription status for protected routes
5. **Database Sync**: Keeps subscription data in sync with Polar.sh

The `subscriptions.ts` file in the Convex backend handles subscription validation, database updates, and status checking.

## Routing System

The application uses React Router v7's file-based routing with a centralized `routes.ts` configuration:

```typescript
export default [
  index("routes/home.tsx"),
  route("sign-in/*", "routes/sign-in.tsx"),
  route("sign-up/*", "routes/sign-up.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("success", "routes/success.tsx"),
  route("subscription-required", "routes/subscription-required.tsx"),
  layout("routes/dashboard/layout.tsx", [
    route("dashboard", "routes/dashboard/index.tsx"),
    route("dashboard/chat", "routes/dashboard/chat.tsx"),
    route("dashboard/settings", "routes/dashboard/settings.tsx"),
  ]),
] satisfies RouteConfig;
```

Key routing patterns:
- **Layouts**: Used for shared UI elements (like dashboard navigation)
- **Loaders**: Pre-fetch data before rendering routes
- **Error Boundaries**: Handle errors at the route level
- **Nested Routes**: Organize related functionality

## UI Components

The UI is built with a combination of TailwindCSS v4 and shadcn/ui components (based on Radix UI):

### Component Organization

- **Base Components** (`/app/components/ui`): Reusable primitives like buttons, inputs, etc.
- **Feature Components**: Higher-level components for specific features
- **Layout Components**: Structural elements like headers, sidebars, etc.

### Styling Approach

- **TailwindCSS**: Utility-first CSS framework
- **Class Variance Authority (CVA)**: For component variants
- **clsx/tailwind-merge**: For conditional class composition

Example component pattern from the codebase:
```typescript
// Button component with variants
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "font-medium transition-colors focus-visible:outline-none",
          // Variant styles applied conditionally
          // Size styles applied conditionally
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
```

## AI Chat Implementation

The chat functionality is implemented using AI SDK and OpenAI:

### Components

1. **Chat UI** (`/app/routes/dashboard/chat.tsx`):
   - Message display with user/assistant styling
   - Input form with submission handling
   - Real-time message streaming

2. **Backend Integration**:
   - Uses Convex HTTP endpoints to proxy OpenAI calls
   - Manages chat history and message threading

### Implementation Details

The chat feature leverages:
- `@ai-sdk/react` for React hooks to manage chat state
- `@ai-sdk/openai` for OpenAI API integration
- Markdown rendering for formatted messages
- Stream processing for real-time responses

## Development & Deployment

### Development Workflow

The application uses Vite for fast development:
- **Hot Module Replacement (HMR)** for instant updates
- **TypeScript** for type checking
- **React Router Dev Server** for SSR in development

### Deployment Options

1. **Vercel Deployment**:
   - Optimized with `@vercel/react-router` preset
   - Environment variable configuration
   - Automatic deployments

2. **Docker Deployment**:
   - Containerized application
   - Multi-stage build process for optimization
   - Compatible with various container platforms

3. **Manual Deployment**:
   - Build output with client and server bundles
   - Static file serving + server-side rendering

## Conclusion

The React Starter Kit provides a comprehensive foundation for modern SaaS applications with:

- **Full-stack TypeScript**: End-to-end type safety
- **Authentication & Authorization**: Complete user management
- **Subscription & Payments**: Production-ready billing
- **Real-time Database**: Instant updates and synchronization
- **AI Integration**: Ready-to-use chat functionality
- **Modern UI**: Beautiful, responsive design with TailwindCSS
- **Deployment Ready**: Multiple deployment options

This architecture allows developers to focus on building unique features rather than reinventing common SaaS infrastructure.
