# Tag Tani - Claude Code Configuration

**Project**: Agricultural Management System for Indonesian Farmer Groups (Kelompok Tani)
**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Radix UI
**Last Updated**: October 26, 2025

---

## Quick Context

Tag Tani manages farmer groups (Kelompok Tani), individual farmers (Petani), agricultural lands (Lahan), and commodities. Built on Next.js Enterprise Boilerplate with Indonesian agricultural focus.

---

## Tech Stack

### Framework & Core
- Next.js 15.3.3 (App Router)
- React 19.1.0
- TypeScript 5.8.3 (strict mode)
- Node.js >= 20.0.0

### Styling & UI
- Tailwind CSS v4.1.5 (utility-first)
- CVA 0.7.0 (component variants)
- Radix UI (headless components)
- Lucide React 0.548.0 (icons)

### Mapping & Geolocation
- Leaflet 1.9.4
- Leaflet Draw 1.0.4 (polygon drawing)
- React Leaflet 5.0.0

### Utilities
- Zod 3.24.4 (validation - ready to integrate)
- Lodash 4.17.21
- Tailwind Merge 2.6.0

### Testing & Quality
- Vitest 3.2.4
- React Testing Library 14.3.1
- Playwright 1.52.0 (E2E)
- ESLint 9.26.0
- Prettier 3.0.3
- Storybook 8.6.12

---

## Project Structure

```
app/
  page.tsx                          # Dashboard
  layout.tsx                        # Root layout with Sidebar + Header
  api/health/route.ts               # Health check
  kelompok-tani/
    page.tsx                        # Kelompok list
    create/page.tsx                 # Create form
    [id]/
      page.tsx                      # Detail
      edit/page.tsx                 # Edit form
      anggota/
        page.tsx                    # Farmer members list
        create/page.tsx             # Add member
        [petaniId]/
          page.tsx                  # Member detail
          edit/page.tsx             # Edit member
  lahan/
    page.tsx                        # Land list with map
    [kelompok-id]/tambah/page.tsx   # Add land
    [kelompok-id]/[lahan-id]/
      page.tsx                      # Land detail
      edit/page.tsx                 # Edit land

components/
  Sidebar/Sidebar.tsx               # Fixed left navigation
  Header/Header.tsx                 # Fixed top bar
  KelompokTaniForm/                 # Farmer group form
  PetaniForm/                       # Farmer/member form
  LahanForm/                        # Land form
  LahanMap/LahanMapClient.tsx       # Map visualization (Leaflet)
  LahanDrawMap/                     # Map with polygon drawing
  Button/, StatCard/, OrderCard/    # UI primitives
  HorizontalBarChart/               # Data visualization
  DateRangeFilter/                  # Filter component

constants/
  dashboard.ts                      # Mock dashboard data
  kelompokTani.ts                   # Mock farmer groups
  petani.ts                         # Mock farmers/members
  lahan.ts                          # Mock lands

styles/
  tailwind.css                      # Tailwind entry point
```

---

## Data Structures

### KelompokTani (Farmer Groups)
```typescript
{
  id: string;
  name: string;
  code: string;
  kecamatan: string;                // District
  village: string;
  address: string;
  leaderName: string;
  phone: string;
  memberCount: number;
  landArea: number;                 // hectares
  commodities: string[];
  establishmentDate: string;
}
```

### Petani (Farmers/Members)
```typescript
{
  id: string;
  name: string;
  phone: string;
  email: string;
  ktp: string;                      // National ID
  address: string;
  kelompokTaniId: string;
  memberSince: string;
  landArea: number;
}
```

### Lahan (Agricultural Land)
```typescript
{
  id: string;
  name: string;
  kelompokTaniId: string;
  kelompokTaniName: string;
  petaniId?: string;
  petaniName?: string;
  coordinates: [number, number][];  // Polygon
  area: number;                     // hectares
  commodities: string[];
  createdAt: string;
  updatedAt: string;
}
```

---

## Code Patterns & Conventions

### React Server Components (RSC) Pattern

**CRITICAL**: Follow the RSC pattern for Next.js 15:

```typescript
// ✅ PAGES ARE ALWAYS SERVER COMPONENTS (NO 'use client')
// app/feature/page.tsx
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Header } from '@/components/Header/Header';
import { FeatureListClient } from './FeatureListClient';
import { getFeatureData } from '@/lib/data';  // Server-side data fetch

export default async function FeaturePage() {
  // ✅ Fetch data here on the server BEFORE rendering
  const data = await getFeatureData();

  // Server-side render UI with data
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[220px] mt-16">
        <div className="p-6">
          {/* Pass data to client components as props */}
          <FeatureListClient initialData={data} />
        </div>
      </main>
    </div>
  );
}

// ✅ INTERACTIVE COMPONENTS ARE CLIENT COMPONENTS
// app/feature/FeatureListClient.tsx
'use client';

interface FeatureListClientProps {
  initialData: FeatureData[];
}

export function FeatureListClient({ initialData }: FeatureListClientProps) {
  const [items, setItems] = useState(initialData);

  return (
    // Interactive content here
  );
}
```

### Page Structure (Server Components)
- ✅ Pages are **always** server components (no `'use client'`)
- ✅ Fetch data on the server BEFORE rendering
- ✅ Pass data to client components as props
- ✅ Create `loading.tsx` in the same directory for loading states
- ✅ Use `async/await` for server-side operations

Example structure:
```
app/feature/
├── page.tsx              # Server component (fetches data, renders layout)
├── loading.tsx           # Loading skeleton (shown while page.tsx loads)
├── FeatureListClient.tsx # Client component (handles interactions)
└── FeatureFormClient.tsx # Client component (handles form submission)
```

### loading.tsx Pattern

Create a loading skeleton for better UX:

```typescript
// app/feature/loading.tsx
export default function FeatureLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-6">
        <div className="animate-pulse">
          {/* Skeleton loading UI */}
          <div className="h-8 w-32 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Component Structure

#### Server Components (Pages)
```typescript
// ✅ Pages and data-fetching components are SERVER components
// NO 'use client' directive
// CAN use async/await
// CAN call databases directly

import { getDataFromAPI } from '@/lib/api';

export default async function PageComponent() {
  const data = await getDataFromAPI();

  return (
    <ClientComponent data={data} />
  );
}
```

#### Client Components (Interactive)
```typescript
// ✅ Interactive components use 'use client' directive
'use client';

import { useState, useCallback } from 'react';

interface ComponentProps {
  initialData: DataType[];
}

export function ClientComponent({ initialData }: ComponentProps) {
  const [items, setItems] = useState(initialData);

  const handleAction = useCallback(() => {
    // Handle user interactions
  }, []);

  return (
    // Interactive JSX
  );
}
```

### Forms
- ✅ Form components use `'use client'` directive
- Use `useState` for form state (controlled components)
- Organize fields into logical sections
- Use HTML5 validation attributes (`required`, `type`)
- Server action for submission OR `onChange` handlers
- Example: `/components/KelompokTaniForm/KelompokTaniForm.tsx`

### Lists & Cards
- ✅ List pages are server components (fetch data)
- Create client component for interactivity (filtering, pagination)
- Use card components for visual grouping
- Include action buttons (View, Edit, Delete)
- Example: `/app/kelompok-tani/page.tsx` (server) → passes data to client component

### Maps
- Use Leaflet with React Leaflet wrapper
- Maps are client-side only (`'use client'`)
- Polygon click handlers for selection
- Example: `/components/LahanMap/LahanMapClient.tsx`

### Styling
- **NEVER** use inline `style` prop except for dynamic colors
- **ALWAYS** use Tailwind utilities
- Use `cn()` from tailwind-merge for conditional classes
- Use CVA for component variants (see Button component)
- Design system colors: Green (#22c55e), neutrals (gray-50 to gray-800)
- Spacing: Tailwind defaults (p-4, mb-6, etc.)

### State Management
- Use `useState` for local component state
- Use `useRouter` for navigation
- Use `usePathname` for current route detection
- No external store needed currently; scalable to Zustand/Redux

### Navigation
- Sidebar: `/components/Sidebar/Sidebar.tsx` - Fixed 220px left nav
- Header: `/components/Header/Header.tsx` - Fixed 64px top bar
- Main content: Account for margins in all pages

---

## Design System

### Colors
- **Primary Green**: `#22c55e` (500), `#16a34a` (600), `#15803d` (700)
- **Grays**: gray-50, gray-200, gray-400, gray-500, gray-600, gray-800
- **Accent**: Blue, Amber, Violet, Pink (from Radix/Tailwind)

### Spacing
- Use Tailwind spacing scale: `p-4`, `mb-6`, `gap-2`, etc.

### Borders & Shadows
- Border color: `border-gray-200`
- Border radius: `rounded-lg` (8px), `rounded-xl` (12px)
- Subtle shadows for depth

### Typography
- System fonts via Tailwind
- Use semantic HTML (h1, h2, h3, p, span)

---

## Implemented Pages

✅ Dashboard (`/`) - Stats, trends, date filters
✅ Kelompok Tani (`/kelompok-tani`) - List, Create, Edit, Detail
✅ Anggota/Farmers (`/kelompok-tani/[id]/anggota`) - List, Create, Edit, Detail
✅ Lahan/Land (`/lahan`) - Map view, grouped list, Add, Edit, Detail
✅ Penyuluh (Agricultural Advisors) - `/penyuluh` - List, Create, Edit, Detail

---

## Planned Pages (In Sidebar)

⏳ Komoditi (Commodities) - `/komoditi`
⏳ Bantuan Petani (Farmer Assistance) - `/bantuan-petani`

---

## Development Commands

```bash
pnpm dev              # Dev server (http://localhost:3000)
pnpm build           # Production build
pnpm lint            # ESLint check
pnpm format          # Prettier format
pnpm test            # Vitest run
pnpm test:ui         # Vitest with UI
pnpm storybook       # Start Storybook
```

---

## Adding New Pages (RSC Pattern)

### Step-by-Step

1. **Create directory** in `app/` following Next.js conventions
2. **Create `page.tsx`** as server component (fetch data here)
3. **Create `loading.tsx`** for loading skeleton
4. **Create client components** (e.g., `FeatureListClient.tsx`, `FeatureFormClient.tsx`) for interactivity
5. **Use mock data** from `/constants/` (ready for API swap)
6. **Follow styling** with Tailwind only
7. **Test responsiveness** on mobile/tablet/desktop

### Example Structure for New Page

```
app/penyuluh/
├── page.tsx                 # Server component - fetches data
├── loading.tsx              # Loading skeleton
├── PenyuluhListClient.tsx   # Client component - list with filters
├── PenyuluhFormClient.tsx   # Client component - form handling
└── [id]/
    ├── page.tsx             # Server component - fetches single item
    ├── loading.tsx          # Loading skeleton
    └── PenyuluhDetailClient.tsx
```

### Example Page Implementation

```typescript
// ✅ app/penyuluh/page.tsx - Server component
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PenyuluhListClient } from './PenyuluhListClient';
import { PENYULUH_LIST } from '@/constants/penyuluh';

// Currently using mock data; ready for API integration:
// const data = await fetch('API_URL/penyuluh')

export default async function PenyuluhPage() {
  // ✅ Fetch data here on server (before rendering)
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

```typescript
// ✅ app/penyuluh/loading.tsx - Loading skeleton
export default function PenyuluhLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-6">
        <div className="animate-pulse space-y-4">
          {/* Header skeleton */}
          <div className="h-10 w-32 bg-gray-200 rounded" />

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

```typescript
// ✅ app/penyuluh/PenyuluhListClient.tsx - Client component
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
        {filteredList.map(penyuluh => (
          <PenyuluhCard key={penyuluh.id} penyuluh={penyuluh} />
        ))}
      </div>
    </div>
  );
}
```

---

## Adding New Components

1. **Create directory** in `components/ComponentName/`
2. **Create `ComponentName.tsx`** with clear exports
3. **Add `'use client'`** if interactive
4. **(Optional) Add Storybook** story for documentation
5. **(Optional) Add tests** with Vitest + React Testing Library

Follow existing component patterns (Button, Card, Form components).

---

## Testing

### Unit Tests
```bash
pnpm test                 # Run Vitest
pnpm test:ui             # Vitest UI dashboard
```

### E2E Tests
```bash
npx playwright test       # Run Playwright tests
```

### Storybook
```bash
pnpm storybook           # Visual component development
pnpm storybook:build     # Build static version
```

---

## Environment Configuration

- **env.mjs**: T3 Env for type-safe environment variables
- **API integration**: Ready (TODO comments in code show integration points)
- **Authentication**: Not yet implemented
- **Database**: Not yet integrated (using mock data)

---

## Important Notes

### Mock Data Approach
- All data in `/constants/` files
- Client-side filtering and state
- Ready for API replacement (zero-copy, just swap endpoints)

### Ready to Integrate
- Zod validation schemas
- API calls (replace console.log statements)
- Database/ORM
- Authentication (session management)
- Real-time updates

### Current Limitations
- No real API backend (using mock data)
- No authentication/authorization
- No database persistence
- No file uploads

---

## Git Workflow

- **Main branch**: `main`
- **Commit format**: Semantic commits recommended (feat:, fix:, refactor:)
- **Pre-commit hooks**: Configured (linting, formatting)
- **Modified files tracking**: `pnpm-lock.yaml` currently modified

---

## Consistency Checklist (IMPORTANT - Must Check for Every New Page!)

### Detail Pages (`/app/[feature]/[id]/page.tsx`)
- ✅ Use `useRouter` hook to access router
- ✅ Back button uses `onClick={() => router.back()}` (NOT Link to parent)
- ✅ Page header structure:
  ```typescript
  <div className="mb-8">
    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
      <ArrowLeftIcon className="w-4 h-4" />
      Kembali
    </button>
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <Link href={`/feature/${id}/edit`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        <PencilIcon className="w-4 h-4" />
        Edit
      </Link>
    </div>
  </div>
  ```
- ✅ Content sections use: `<div className="space-y-6">` with white cards
- ✅ Each card: `<div className="bg-white rounded-xl border border-gray-200 p-6">`
- ✅ Card headers: `<h2 className="text-lg font-semibold text-gray-900 mb-4">`
- ✅ Field labels: `<p className="text-sm text-gray-500 mb-1">`
- ✅ Field values: `<p className="text-sm font-medium text-gray-900">`
- ✅ Use `md:col-span-2` for full-width fields in 2-column grid

### Form Pages (Create/Edit)
- ✅ Create page (`/app/[feature]/create/page.tsx`):
  ```typescript
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah [Feature]</h1>
    <p className="text-gray-600">Isi formulir di bawah untuk menambah [feature] baru</p>
  </div>
  <FormComponent mode="create" />
  ```
- ✅ Edit page includes back button with `router.back()`
- ✅ Edit page shows subtitle with entity name: `<p className="text-gray-600">Perbarui informasi [feature] {item.name}</p>`
- ✅ **Form component must be separate** (e.g., `KelompokTaniForm`, `PenyuluhForm`)
- ✅ Form sections use: `<div className="bg-white rounded-xl border border-gray-200 p-6">`
- ✅ Form action buttons (NO white box, just flex container):
  ```typescript
  <div className="flex items-center justify-end gap-3">
    <button type="button" onClick={handleCancel} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
      Batal
    </button>
    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      {mode === 'create' ? 'Tambah [Feature]' : 'Simpan Perubahan'}
    </button>
  </div>
  ```

### List Pages (`/app/[feature]/page.tsx`)
- ✅ Page header:
  ```typescript
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">[Feature Title]</h1>
      <p className="text-gray-600">[Description]</p>
    </div>
    <Link href="/feature/create" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      <PlusIcon className="w-5 h-5" />
      Tambah [Feature]
    </Link>
  </div>
  ```
- ✅ Search bar with SearchIcon
- ✅ Use Card component for each list item with action buttons
- ✅ Empty state message in white box

### Card Components (List Items)
- ✅ Shows entity name prominently
- ✅ Shows key identifier (NIK, NIP, code, etc.)
- ✅ Shows 2-3 key fields in middle section
- ✅ **Do NOT show status in list view** (for cleaner display)
- ✅ Action buttons on right: Eye (view), Pencil (edit), Trash (delete)
- ✅ Links use correct paths to detail/edit pages

### Loading Skeleton
- ✅ Must exist for every list page (`/app/[feature]/loading.tsx`)
- ✅ Matches approximate structure of actual page
- ✅ Uses `animate-pulse` for skeleton effect

### Mock Data (`/constants/[feature].ts`)
- ✅ Export interface for TypeScript
- ✅ Export const array with sample data
- ✅ Include any option arrays (SPECIALIZATION_OPTIONS, STATUS_OPTIONS, etc.)
- ✅ Provide 6-8 sample records for realistic display

---

## Next Steps for New Features

When adding new pages/features:
1. Define data structure in this CLAUDE.md
2. Create mock data in `/constants/` (follow existing patterns)
3. **Check consistency checklist above BEFORE coding**
4. Build list page with search and cards
5. Build detail page with proper navigation
6. Build form component (separate from pages)
7. Build create/edit pages using form component
8. Create loading skeleton
9. Test responsive design
10. Verify all consistency items checked
11. Document in this file
12. Ready for API integration

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com
- **Leaflet**: https://leafletjs.com
- **React Leaflet**: https://react-leaflet.js.org
- **TypeScript**: https://www.typescriptlang.org

---

## Quick Links (File Paths)

- Root layout: `/app/layout.tsx`
- Sidebar: `/components/Sidebar/Sidebar.tsx`
- Header: `/components/Header/Header.tsx`
- Farmer form: `/components/KelompokTaniForm/KelompokTaniForm.tsx`
- Mock data: `/constants/kelompokTani.ts`, `/constants/petani.ts`, `/constants/lahan.ts`

