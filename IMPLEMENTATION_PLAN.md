# Lobe AI - Marketing Website & Dashboard Implementation Plan

## Overview

Build an MVP marketing website and user dashboard for Lobe AI, a dream capture and completion device. The marketing site will collect waitlist signups, and the dashboard will display dream completions for authenticated users.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| UI | shadcn/ui + Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| Domain | lobe.ai (assumed) |

## Current State

Greenfield project - starting from scratch with only a concept document.

## Desired End State

1. **Marketing Website**: A polished single-page landing site that:
   - Communicates Lobe AI's value proposition
   - Collects waitlist signups (stored in Supabase)
   - Establishes brand identity
   - Is deployed and live on Vercel

2. **User Dashboard**: A functional mockup that:
   - Allows user registration/login via Supabase Auth
   - Displays a list of dream completions (title, narrative, timestamp)
   - Uses seeded mock data for demonstration purposes
   - Is ready to connect to real dream data when hardware ships

## What We're NOT Doing

- Audio playback functionality
- Image/video generation features
- Biometric device integrations
- Real dream capture processing
- Mobile app
- Payment processing (pricing is informational only)
- Admin dashboard

---

## Phase 1: Project Setup & Infrastructure

### Overview
Initialize the Next.js project with all required dependencies, configure Supabase, and set up the development environment.

### Changes Required:

#### 1. Initialize Next.js Project

```bash
npx create-next-app@latest lobe-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

#### 2. Install Dependencies

```bash
# shadcn/ui initialization
npx shadcn@latest init

# Additional dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react
npm install react-hook-form zod @hookform/resolvers
```

#### 3. Project Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx          # Landing page
│   │   └── layout.tsx        # Marketing layout
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Dream completions list
│   │   └── layout.tsx        # Dashboard layout (auth required)
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx            # Root layout
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn components
│   ├── marketing/            # Landing page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── pricing.tsx
│   │   └── waitlist-form.tsx
│   └── dashboard/            # Dashboard components
│       ├── dream-card.tsx
│       ├── dream-list.tsx
│       └── nav.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser client
│   │   ├── server.ts         # Server client
│   │   └── middleware.ts     # Auth middleware
│   └── utils.ts
└── types/
    └── index.ts              # TypeScript types
```

#### 4. Supabase Project Setup

Create a new Supabase project and configure:

**Environment Variables** (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### 5. Database Schema

**File**: Supabase SQL Editor

```sql
-- Waitlist table for marketing signups
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (for waitlist form)
CREATE POLICY "Allow anonymous waitlist signups" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Dreams table for user dream completions
CREATE TABLE dreams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  narrative TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

-- Users can only see their own dreams
CREATE POLICY "Users can view own dreams" ON dreams
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own dreams
CREATE POLICY "Users can insert own dreams" ON dreams
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### 6. Supabase Client Setup

**File**: `src/lib/supabase/client.ts`
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**File**: `src/lib/supabase/server.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component
          }
        },
      },
    }
  )
}
```

**File**: `src/middleware.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Project initializes without errors: `npm run dev`
- [ ] TypeScript compiles: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Supabase connection works (test query)

#### Manual Verification:
- [ ] Dev server runs at localhost:3000
- [ ] Supabase dashboard shows tables created
- [ ] Environment variables are configured correctly

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 2.

---

## Phase 2: Marketing Landing Page

### Overview
Build the single-page marketing website with all sections and waitlist functionality.

### Brand Guidelines

| Element | Value |
|---------|-------|
| Primary Color | Deep purple (#6B21A8) - evokes dreams, night, mystery |
| Secondary Color | Soft blue (#3B82F6) - calm, sleep, trust |
| Accent Color | Warm amber (#F59E0B) - dawn, waking, warmth |
| Background | Dark slate (#0F172A) - nighttime theme |
| Text | White/Gray for dark bg |
| Font | Inter (clean, modern, readable) |

### Changes Required:

#### 1. Install shadcn Components

```bash
npx shadcn@latest add button card input form label toast
```

#### 2. Update Tailwind Config for Brand Colors

**File**: `tailwind.config.ts`
```typescript
// Add custom colors to extend theme
colors: {
  lobe: {
    purple: '#6B21A8',
    blue: '#3B82F6',
    amber: '#F59E0B',
    dark: '#0F172A',
  }
}
```

#### 3. Hero Section

**File**: `src/components/marketing/hero.tsx`

Content:
- Headline: "Remember Every Dream"
- Subhead: "Lobe captures and completes your dreams before they fade. Wake up to the full story."
- CTA: "Join the Waitlist" button (scrolls to waitlist form)
- Visual: Abstract dream-like gradient or illustration placeholder

#### 4. Features Section

**File**: `src/components/marketing/features.tsx`

Feature cards:
1. **Passive Capture** - "Lobe listens during REM sleep, capturing fragments you'd otherwise forget."
2. **Dream Completion** - "AI synthesizes your sleep data and morning recall into a complete narrative."
3. **Share with Loved Ones** - "Play back your completed dreams over morning coffee."
4. **Understand Yourself** - "Discover patterns and meanings in your subconscious."

#### 5. How It Works Section

**File**: `src/components/marketing/how-it-works.tsx`

Steps:
1. "Place Lobe on your nightstand and connect your sleep tracker"
2. "Sleep normally - Lobe activates during REM"
3. "Wake up and share what you remember"
4. "Listen to your complete dream story"

#### 6. Pricing Section

**File**: `src/components/marketing/pricing.tsx`

Tiers (informational only - no purchase):
- **Free Trial** - Basic recording, pattern building
- **Basic** - Dream completion + playback
- **Pro** - Dream interpretation included
- **Premium** - Video generation (coming soon)

Note: "Pricing finalized at launch"

#### 7. Waitlist Form Section

**File**: `src/components/marketing/waitlist-form.tsx`

Form fields:
- Email (required)
- Name (optional)
- Submit button: "Join Waitlist"

Server action to insert into Supabase waitlist table.

**File**: `src/app/actions/waitlist.ts`
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email') as string
  const name = formData.get('name') as string | null

  const supabase = await createClient()

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, name })

  if (error) {
    if (error.code === '23505') {
      return { error: 'You\'re already on the waitlist!' }
    }
    return { error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
```

#### 8. Landing Page Assembly

**File**: `src/app/(marketing)/page.tsx`

Assemble all sections:
```typescript
import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { Pricing } from '@/components/marketing/pricing'
import { WaitlistForm } from '@/components/marketing/waitlist-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-lobe-dark">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <WaitlistForm />
    </main>
  )
}
```

#### 9. Navigation/Header

**File**: `src/components/marketing/header.tsx`

- Logo: "Lobe" text or placeholder
- Nav links: Features, How It Works, Pricing (smooth scroll)
- CTA: "Join Waitlist" button
- Link to Dashboard (for existing users)

#### 10. Footer

**File**: `src/components/marketing/footer.tsx`

- Copyright
- Placeholder links: Privacy, Terms
- Social links (placeholder)

### Success Criteria:

#### Automated Verification:
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] All sections render correctly
- [ ] Waitlist form submits successfully
- [ ] Email appears in Supabase waitlist table
- [ ] Duplicate email shows appropriate error
- [ ] Navigation smooth-scrolls to sections
- [ ] Responsive on mobile, tablet, desktop
- [ ] Brand colors applied consistently

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 3.

---

## Phase 3: Authentication

### Overview
Implement user authentication with Supabase Auth for dashboard access.

### Changes Required:

#### 1. Login Page

**File**: `src/app/(auth)/login/page.tsx`

- Email/password login form
- Link to signup page
- Error handling for invalid credentials
- Redirect to dashboard on success

#### 2. Signup Page

**File**: `src/app/(auth)/signup/page.tsx`

- Email/password signup form
- Link to login page
- Success message / email confirmation flow
- Redirect to dashboard on success

#### 3. Auth Actions

**File**: `src/app/actions/auth.ts`
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
```

#### 4. Auth Layout

**File**: `src/app/(auth)/layout.tsx`

- Centered card layout for auth forms
- Lobe branding
- Dark theme matching marketing site

### Success Criteria:

#### Automated Verification:
- [ ] Build succeeds: `npm run build`
- [ ] Middleware redirects unauthenticated users from /dashboard to /login

#### Manual Verification:
- [ ] Can create new account
- [ ] Can log in with existing account
- [ ] Invalid credentials show error
- [ ] Logout works correctly
- [ ] Protected routes redirect to login when not authenticated
- [ ] Successful login redirects to dashboard

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 4.

---

## Phase 4: User Dashboard

### Overview
Build the dashboard interface showing dream completions for authenticated users.

### Changes Required:

#### 1. Dashboard Layout

**File**: `src/app/(dashboard)/layout.tsx`

- Sidebar or top navigation
- User menu (email, logout)
- Dark theme consistent with marketing site

#### 2. Dashboard Navigation

**File**: `src/components/dashboard/nav.tsx`

- Logo link to home
- "Dreams" nav item (active)
- User dropdown with logout

#### 3. Dreams List Page

**File**: `src/app/(dashboard)/dashboard/page.tsx`

- Fetch user's dreams from Supabase
- Display as cards in a grid/list
- Empty state if no dreams
- Server component for initial load

#### 4. Dream Card Component

**File**: `src/components/dashboard/dream-card.tsx`

Display:
- Title
- Narrative (truncated with "Read more")
- Recorded timestamp (formatted nicely: "Last night at 3:42 AM")
- Created timestamp

#### 5. Dream Detail Modal/Page

**File**: `src/components/dashboard/dream-detail.tsx`

- Full narrative text
- All timestamps
- Close button

#### 6. Seed Mock Data Script

**File**: `scripts/seed-dreams.ts`

Create a script to seed mock dreams for demo users:

```typescript
// Example mock dreams
const mockDreams = [
  {
    title: "The Floating City",
    narrative: "I found myself walking through a city suspended in clouds. The buildings were made of glass and reflected the sunset in impossible colors. I met someone I knew but couldn't place - they handed me a key and said 'You'll need this when you wake up.' The streets shifted like water beneath my feet...",
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
  },
  {
    title: "Ocean of Stars",
    narrative: "I was swimming through space, but it felt like warm water. Stars brushed against my skin like sand. A whale made of light passed beneath me, singing a song I somehow understood. It was telling me about time, about how it moves differently here...",
    recorded_at: new Date(Date.now() - 1000 * 60 * 60 * 32) // Yesterday
  },
  // Add 3-5 more mock dreams
]
```

### Success Criteria:

#### Automated Verification:
- [ ] Build succeeds: `npm run build`
- [ ] TypeScript compiles without errors
- [ ] Dashboard route is protected (middleware test)

#### Manual Verification:
- [ ] Dashboard loads for authenticated users
- [ ] Dream cards display correctly
- [ ] Empty state shows when no dreams
- [ ] Mock data displays properly after seeding
- [ ] Dream detail view works
- [ ] Logout from dashboard works
- [ ] Responsive on mobile

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 5.

---

## Phase 5: Deployment

### Overview
Deploy the application to Vercel and configure production environment.

### Changes Required:

#### 1. Vercel Project Setup

- Connect GitHub repository to Vercel
- Configure environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 2. Supabase Production Configuration

- Ensure RLS policies are correct
- Configure auth redirect URLs for production domain
- Set up email templates (optional)

#### 3. Domain Configuration (if lobe.ai is available)

- Add custom domain in Vercel
- Configure DNS records
- SSL certificate (automatic via Vercel)

#### 4. Pre-launch Checklist

- [ ] All environment variables set in Vercel
- [ ] Supabase auth redirect URLs include production domain
- [ ] Database migrations applied to production
- [ ] Test waitlist signup on production
- [ ] Test auth flow on production
- [ ] Test dashboard on production

### Success Criteria:

#### Automated Verification:
- [ ] Vercel build succeeds
- [ ] Deployment completes without errors

#### Manual Verification:
- [ ] Site loads on production URL
- [ ] Waitlist form works in production
- [ ] Auth flow works in production
- [ ] Dashboard loads with mock data
- [ ] No console errors
- [ ] Mobile responsive on real devices

---

## Testing Strategy

### Manual Testing Steps

1. **Waitlist Flow**
   - Visit landing page
   - Submit waitlist form with new email
   - Verify success message
   - Check Supabase for entry
   - Try same email again - verify duplicate error

2. **Auth Flow**
   - Sign up with new account
   - Log out
   - Log in with same account
   - Try invalid credentials
   - Try accessing /dashboard while logged out

3. **Dashboard Flow**
   - Log in
   - View dream list
   - Click on dream card to see detail
   - Log out

### Responsive Testing

Test on:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1280px+ width)

---

## File Summary

### New Files to Create

```
lobe-web/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── layout.tsx
│   │   ├── actions/
│   │   │   ├── waitlist.ts
│   │   │   └── auth.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── marketing/
│   │   │   ├── header.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── pricing.tsx
│   │   │   ├── waitlist-form.tsx
│   │   │   └── footer.tsx
│   │   └── dashboard/
│   │       ├── nav.tsx
│   │       ├── dream-card.tsx
│   │       ├── dream-list.tsx
│   │       └── dream-detail.tsx
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── server.ts
│   ├── middleware.ts
│   └── types/
│       └── index.ts
├── scripts/
│   └── seed-dreams.ts
├── .env.local
└── tailwind.config.ts (modified)
```

---

## Timeline Summary

| Phase | Description |
|-------|-------------|
| Phase 1 | Project Setup & Infrastructure |
| Phase 2 | Marketing Landing Page |
| Phase 3 | Authentication |
| Phase 4 | User Dashboard |
| Phase 5 | Deployment |

---

## References

- Concept Document: `LOBE_AI_CONCEPT.md`
- Next.js Docs: https://nextjs.org/docs
- shadcn/ui Docs: https://ui.shadcn.com
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
