# SDSU Parking App

A modern parking management application built with Next.js 15, React 19, and Tailwind CSS v4, designed to help SDSU students track parking availability and save time.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Contributing](#contributing)

## Project Overview

The SDSU Parking App provides real-time parking lot availability tracking, user authentication, and a comprehensive design system for consistent UI/UX across the application.

### Key Features

- Real-time parking lot tracking
- Supabase authentication (Google OAuth + Email/Password)
- Custom design system with component tokens
- Responsive mobile-first design
- Next.js 15 with Turbopack for fast development
- Storybook for component documentation

## Tech Stack

| Technology       | Version     | Purpose                         |
| ---------------- | ----------- | ------------------------------- |
| **Next.js**      | 15.0.3      | React framework with App Router |
| **React**        | 19.0.0-rc   | UI library                      |
| **TypeScript**   | 5.x         | Type safety                     |
| **Tailwind CSS** | 4.0.0-alpha | Styling with CSS variables      |
| **Supabase**     | 2.46.2      | Backend & Authentication        |
| **Storybook**    | 9.0.0-alpha | Component documentation         |
| **Vitest**       | 2.1.8       | Testing framework               |

## Project Structure

```
reactrepo-group3-sdsu-parking-app/
│
├── src/
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # Reusable UI components
│   │   └── ui/                  # UI component library
│   ├── features/                # Feature-specific components
│   ├── lib/                     # Utility functions and clients
│   │   └── supabase/            # Supabase configurations
│   └── styles/                  # Global styles and design tokens
│       └── globals.css
│
├── actions/                     # Server actions
│   └── auth/                    # Authentication actions
│
├── public/                      # Static assets
├── storybook-static/            # Storybook build output
│
├── middleware.ts                # Next.js middleware
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Design System

### Architecture Illustration

```
┌─────────────────────────────────────────────────────────────┐
│                      globals.css                            │
│                   (Design Token Layers)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Layer 1: Primitive Tokens                            │  │
│  │  • Colors: --color-gray-50 through --color-gray-950   │  │
│  │  • Spacing: --spacing-xs, --spacing-sm, etc.          │  │
│  │  • Typography: --font-size-*, --font-weight-*         │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Layer 2: Semantic Tokens                             │  │
│  │  • --semantic-text-primary                            │  │
│  │  • --semantic-bg-default                              │  │
│  │  • --semantic-border-default                          │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Layer 3: Component Tokens                            │  │
│  │  • --component-button-bg-primary-default              │  │
│  │  • --component-input-border-default                   │  │
│  │  • --component-badge-bg-success                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    UI Components                            │
│  (Button, Badge, Input, etc.)                               │
│  • Use component tokens via CSS variables                   │
│  • Array-based class organization                           │
│  • TypeScript for type safety                               │
└─────────────────────────────────────────────────────────────┘
```

### Token Hierarchy

1. **Primitive Tokens** - Raw values (colors, sizes)
2. **Semantic Tokens** - Context-based (primary, secondary)
3. **Component Tokens** - Component-specific (button-bg, input-border)

### Example Usage

```tsx
// Don't use primitive tokens directly
className = "bg-[var(--color-blue-500)]";

// Use semantic tokens
className = "bg-[var(--semantic-bg-primary)]";

// Best: Use component tokens
className = "bg-[var(--component-button-bg-primary-default)]";
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager
- Git

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/jeffbradley4177/ReactRepo_Group3_SDSU-Parking-App.git
   cd reactrepo-group3-sdsu-parking-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open in browser
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run storybook    # Start Storybook on port 6006
npm run storybook build  # Build Storybook for deployment
```

## Development Workflow

### File System Routing (Next.js App Router)

```
src/app/
├── page.tsx              → /
├── layout.tsx            → Root layout (wraps all pages)
├── home/
│   └── page.tsx          → /home
├── empty-state/
│   └── page.tsx          → /empty-state
└── [dynamic]/
    └── page.tsx          → /[dynamic] (dynamic route)
```

### Creating a New Page

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Export a default React component

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page Content</div>;
}
```

### Creating a New Component

1. Create a new folder in `src/components/ui/`
2. Follow this structure:

```
src/components/ui/my-component/
├── MyComponent.tsx          # Component implementation
├── MyComponent.stories.tsx  # Storybook stories
└── index.ts                 # Exports
```

3. Use the component template pattern:

```tsx
import { cn } from "@/lib/cn";
import { forwardRef, memo, type ComponentPropsWithoutRef } from "react";

export interface MyComponentProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "secondary";
}

// Base styles using component tokens
const BASE_CLASSES = [
  "flex",
  "items-center",
  "gap-[var(--component-mycomponent-gap)]",
].join(" ");

export const MyComponent = memo(
  forwardRef<HTMLDivElement, MyComponentProps>(
    ({ variant = "default", className, children, ...props }, ref) => {
      const classes = [
        BASE_CLASSES,
        // Add variant-specific classes
        className,
      ].join(" ");

      return (
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      );
    },
  ),
);

MyComponent.displayName = "MyComponent";
```

## Component Guidelines

### Coding Standards

1. Use Array-Based Class Organization

   ```tsx
   const BASE_CLASSES = ["flex", "items-center", "gap-4"].join(" ");
   ```

2. Use Component Tokens

   ```tsx
   className = "bg-[var(--component-button-bg-primary-default)]";
   ```

3. TypeScript Types

   ```tsx
   export interface ComponentProps extends ComponentPropsWithoutRef<"button"> {
     variant?: "primary" | "secondary";
   }
   ```

4. Memoization and forwardRef

   ```tsx
   export const Component = memo(
     forwardRef<HTMLButtonElement, ComponentProps>((props, ref) => {
       /* ... */
     }),
   );
   ```

5. Proper Imports
   ```tsx
   import Link from "next/link";
   import { cn } from "@/lib/cn";
   import { Button } from "@/components/ui/button/Button";
   ```

### Component Checklist

- Uses array-based class organization
- Uses component tokens from globals.css
- Includes TypeScript types
- Uses memo + forwardRef pattern
- Has Storybook stories
- Exports through index.ts
- Follows naming conventions

## Branch Strategy

- `main` - Production-ready code
- `frontend_development_1` - Active development branch
- Feature branches: `feature/component-name`

### Workflow

1. Create a feature branch from `frontend_development_1`
2. Make your changes
3. Commit with clear messages
4. Push and create a Pull Request
5. Merge after review

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes and commit
git add .
git commit -m "feat: add new component"

# Push to remote
git push origin feature/new-component

# Create PR on GitHub
```

## Contributing

### Code Style

- Use TypeScript for all new files
- Follow the component template pattern
- Use Tailwind CSS with component tokens
- Write Storybook stories for all components
- Keep components small and focused

### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update Storybook stories
4. Request review from team members
5. Squash commits before merging

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)

## License

This project is part of CS250 Fall 2025 at SDSU.

## Team

Group 3 - SDSU Parking App

Repository: [ReactRepo_Group3_SDSU-Parking-App](https://github.com/jeffbradley4177/ReactRepo_Group3_SDSU-Parking-App)

Current Supabase Project: You will need likely help in getting ownership, or copying the data to your own -  [Supabase-Database](https://supabase.com/dashboard/project/tiptomffqqzcuwqabfry)
