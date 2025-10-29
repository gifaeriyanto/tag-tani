'use client';

import {
  HandHeartIcon,
  HomeIcon,
  MapIcon,
  PackageIcon,
  UserCheckIcon,
  UsersIcon,
  WheatIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dasbor', icon: HomeIcon },
  { href: '/kelompok-tani', label: 'Kelompok Tani', icon: UsersIcon },
  { href: '/lahan', label: 'Lahan', icon: MapIcon },
  { href: '/penyuluh', label: 'Penyuluh', icon: UserCheckIcon },
  { href: '/komoditi', label: 'Komoditi', icon: WheatIcon },
  { href: '/pupuk', label: 'Pupuk', icon: PackageIcon },
  { href: '/bantuan-petani', label: 'Bantuan Petani', icon: HandHeartIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold text-green-600">
          TagTani
        </Link>
      </div>

      <nav className="px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors
                ${active
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
