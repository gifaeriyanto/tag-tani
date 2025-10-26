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

### Component Structure
```typescript
// ✅ ALWAYS start interactive components with 'use client'
'use client';

interface ComponentProps {
  // Define all props explicitly
}

export function ComponentName({ ...props }: ComponentProps) {
  // Component logic
  return ( /* JSX */ );
}
```

### Forms
- Use `useState` for form state (controlled components)
- Organize fields into logical sections
- Use HTML5 validation attributes (`required`, `type`)
- Console.log on submit (ready for API integration)
- Example: `/components/KelompokTaniForm/KelompokTaniForm.tsx`

### Lists & Cards
- Use card components for visual grouping
- Include action buttons (View, Edit, Delete)
- Use mock data from `/constants`
- Example: `/app/kelompok-tani/page.tsx`

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

---

## Planned Pages (In Sidebar)

⏳ Penyuluh (Agricultural Advisors) - `/penyuluh`
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

## Adding New Pages

1. **Create directory** in `app/` following Next.js conventions
2. **Create `page.tsx`** with layout (Sidebar, Header already in root layout)
3. **Add components** to `/components/` as needed
4. **Use mock data** from `/constants/` (ready for API swap)
5. **Follow styling** with Tailwind only
6. **Test responsiveness** on mobile/tablet/desktop

Example structure for new page:
```typescript
// app/new-feature/page.tsx
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';

export default function NewFeaturePage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[220px] mt-16">
        {/* Your content */}
      </main>
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

## Next Steps for New Features

When adding new pages/features:
1. Define data structure in this CLAUDE.md
2. Create mock data in `/constants/`
3. Build page structure in `app/`
4. Build child components in `components/`
5. Use existing patterns from Kelompok Tani, Petani, Lahan
6. Test responsive design
7. Document in this file
8. Ready for API integration

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

