# React Server Components (RSC) Pattern Guide

**Critical Architecture Pattern for Tag Tani**

---

## Overview

Tag Tani follows **React Server Components (RSC)** pattern using Next.js 15 App Router. This document explains how to build pages correctly.

**Golden Rule**:
- ✅ **Pages are SERVER components** (fetch data here)
- ✅ **Interactive components are CLIENT components** (handle user interactions)
- ✅ **Always create `loading.tsx`** for loading states

---

## Key Concepts

### Server Components (Pages)
- No `'use client'` directive
- Can use `async/await`
- Can directly access databases, APIs
- Data fetched BEFORE rendering
- Cannot use browser APIs (localStorage, etc.)
- Good for: Data fetching, rendering HTML

### Client Components (Interactive)
- Start with `'use client'` directive
- Can use hooks (`useState`, `useEffect`, etc.)
- Can use browser APIs
- Cannot directly access databases
- Good for: User interactions, state management

---

## File Structure Pattern

```
app/feature/
├── page.tsx                    # Server component - fetch & layout
├── loading.tsx                 # Loading skeleton
├── error.tsx                   # Error boundary (optional)
├── FeatureListClient.tsx       # Client component - list & filters
├── FeatureFormClient.tsx       # Client component - form
└── [id]/
    ├── page.tsx                # Server component - single item
    ├── loading.tsx             # Loading skeleton
    └── FeatureDetailClient.tsx # Client component - detail & actions
```

---

## Example 1: Simple List Page

### Structure
```
app/penyuluh/
├── page.tsx              # Server - fetch list
├── loading.tsx           # Loading skeleton
└── PenyuluhListClient.tsx # Client - display & filter
```

### page.tsx (Server Component)
```typescript
// ✅ NO 'use client' - This is a server component
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PenyuluhListClient } from './PenyuluhListClient';
import { PENYULUH_LIST } from '@/constants/penyuluh';

// Fetch data BEFORE rendering
// In production: const data = await fetch('API_URL/penyuluh')

export default async function PenyuluhPage() {
  const penyuluhList = PENYULUH_LIST;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[220px] mt-16">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Penyuluh</h1>
          {/* Pass data to client component */}
          <PenyuluhListClient initialData={penyuluhList} />
        </div>
      </main>
    </div>
  );
}
```

### loading.tsx (Skeleton)
```typescript
// Show while page.tsx is loading
export default function PenyuluhLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-6">
        <div className="animate-pulse space-y-4">
          {/* Header skeleton */}
          <div className="h-10 w-48 bg-gray-200 rounded" />

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### PenyuluhListClient.tsx (Client Component)
```typescript
// ✅ Has 'use client' - This handles interactivity
'use client';

import { useState } from 'react';
import { PenyuluhCard } from '@/components/PenyuluhCard/PenyuluhCard';

interface PenyuluhListClientProps {
  initialData: Penyuluh[];
}

export function PenyuluhListClient({ initialData }: PenyuluhListClientProps) {
  const [penyuluhList, setPenyuluhList] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = penyuluhList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search penyuluh..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
      />

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map(item => (
          <PenyuluhCard key={item.id} penyuluh={item} />
        ))}
      </div>
    </div>
  );
}
```

---

## Example 2: Detail Page with Dynamic Route

### Structure
```
app/penyuluh/[id]/
├── page.tsx                   # Server - fetch single item
├── loading.tsx                # Loading skeleton
└── PenyuluhDetailClient.tsx   # Client - edit form
```

### page.tsx (Server Component)
```typescript
// ✅ Server component - fetch single item
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PenyuluhDetailClient } from './PenyuluhDetailClient';
import { PENYULUH_LIST } from '@/constants/penyuluh';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PenyuluhDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch data for this item
  const penyuluh = PENYULUH_LIST.find(p => p.id === id);

  if (!penyuluh) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[220px] mt-16">
          <div className="p-6">
            <h1>Not Found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[220px] mt-16">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{penyuluh.name}</h1>
          {/* Pass data to client component */}
          <PenyuluhDetailClient penyulah={penyuluh} />
        </div>
      </main>
    </div>
  );
}
```

### loading.tsx (Skeleton)
```typescript
export default function PenyuluhDetailLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 bg-gray-200 rounded" />
          <div className="h-96 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
```

### PenyuluhDetailClient.tsx (Client Component)
```typescript
// ✅ Client component - handles edit form
'use client';

import { useState } from 'react';

interface PenyuluhDetailClientProps {
  penyuluh: Penyuluh;
}

export function PenyuluhDetailClient({ penyuluh }: PenyuluhDetailClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(penyuluh);

  const handleSubmit = async () => {
    // TODO: Call API to update
    console.log('Update:', formData);
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        // Edit form
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        // Display mode
        <div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {/* Display details */}
        </div>
      )}
    </div>
  );
}
```

---

## Example 3: Create Page

### Structure
```
app/penyuluh/create/
├── page.tsx              # Server - layout
├── loading.tsx           # Loading skeleton
└── PenyuluhFormClient.tsx # Client - form
```

### page.tsx (Server Component)
```typescript
// ✅ Server component - simple layout
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PenyuluhFormClient } from './PenyuluhFormClient';

export default async function CreatePenyuluhPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[220px] mt-16">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Create Penyuluh</h1>
          <PenyuluhFormClient />
        </div>
      </main>
    </div>
  );
}
```

### PenyuluhFormClient.tsx (Client Component)
```typescript
// ✅ Client component - handles form
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PenyuluhFormClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialization: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Call API to create
    console.log('Create:', formData);

    // Redirect to list
    router.push('/penyuluh');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {/* Form fields */}
      <button type="submit">Create</button>
    </form>
  );
}
```

---

## Best Practices

### ✅ DO

- ✅ Fetch data in server components (pages)
- ✅ Pass data to client components as props
- ✅ Create `loading.tsx` for all pages
- ✅ Use `async/await` in server components
- ✅ Keep client components small and focused
- ✅ Use client components only for interactivity

### ❌ DON'T

- ❌ Use `'use client'` in page.tsx
- ❌ Fetch data in client components (use server components instead)
- ❌ Skip `loading.tsx` files
- ❌ Use `useState` in server components
- ❌ Make large components with both server and client logic

---

## Common Patterns

### Pattern 1: List + Filter
```
page.tsx (server)          → fetch list
  └─ ListClient.tsx (client) → filter, search, pagination
  └─ loading.tsx             → skeleton
```

### Pattern 2: Detail + Edit
```
page.tsx (server)            → fetch item
  └─ DetailClient.tsx (client) → edit form
  └─ loading.tsx               → skeleton
```

### Pattern 3: Create Form
```
page.tsx (server)        → layout
  └─ FormClient.tsx (client) → form with validation
  └─ loading.tsx             → skeleton
```

### Pattern 4: Dashboard with Multiple Sections
```
page.tsx (server)
  ├─ fetch stats data
  ├─ fetch recent items
  └─ return
      ├─ StatsClient.tsx (client) → interactive charts
      ├─ RecentItemsClient.tsx (client) → list
      └─ loading.tsx → skeleton for all sections
```

---

## Data Flow

```
USER REQUEST
     ↓
[page.tsx] SERVER COMPONENT
     ├─ Fetch data from API/DB
     ├─ Do any server-side logic
     └─ Render UI with data
     ↓
  PASS DATA AS PROPS
     ↓
[FeatureClient.tsx] CLIENT COMPONENT
     ├─ Handle interactions
     ├─ Manage local state
     └─ Update UI on user action
```

---

## Loading States

### Show loading.tsx while server component renders:
1. User navigates to `/penyuluh`
2. Next.js renders `loading.tsx` immediately
3. `page.tsx` fetches data in background
4. Once data is ready, `page.tsx` replaces loading skeleton
5. Smooth transition for user

This provides **instant UI feedback** while data is loading.

---

## Error Handling

Optional: Create `error.tsx` for error boundaries:

```typescript
// app/penyuluh/error.tsx
'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PenyuluhError({ error, reset }: ErrorProps) {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-6">
        <h2>Something went wrong</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
```

---

## Checklist for New Pages

When creating a new page, ensure:

- [ ] `page.tsx` is a server component (no `'use client'`)
- [ ] `page.tsx` fetches data before rendering
- [ ] `loading.tsx` provides skeleton UI
- [ ] Interactive features are in separate client components
- [ ] Client components receive data as props
- [ ] File naming: `FeatureClient.tsx` for client components
- [ ] No `useState` in server components
- [ ] No direct database calls in client components

---

## Useful Links

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Next.js Loading UI Documentation](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

---

## Summary

**RSC Pattern in Tag Tani**:
1. Pages fetch data on server (`page.tsx`)
2. Pages show loading skeleton while fetching (`loading.tsx`)
3. Pages pass data to client components as props
4. Client components handle user interactions (`FeatureClient.tsx`)
5. Result: Fast, secure, scalable applications

This pattern ensures:
- ✅ Data is fetched server-side (secure, fast)
- ✅ Minimal JavaScript sent to browser
- ✅ Good user experience (instant loading state)
- ✅ Scalable architecture for growth
