'use client';

import {
  ChevronDownIcon,
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
import { useState } from 'react';

interface SubNavItem {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dasbor', icon: HomeIcon },
  { href: '/kelompok-tani', label: 'Kelompok Tani', icon: UsersIcon },
  { href: '/lahan', label: 'Lahan', icon: MapIcon },
  { href: '/penyuluh', label: 'Penyuluh', icon: UserCheckIcon },
  { href: '/komoditi', label: 'Komoditi', icon: WheatIcon },
  {
    href: '/pupuk',
    label: 'Pupuk',
    icon: PackageIcon,
    subItems: [
      { href: '/pupuk', label: 'Daftar Pupuk' },
      { href: '/pupuk/dashboard', label: 'Dasbor' },
      { href: '/pupuk/distribusi', label: 'Distribusi' },
      { href: '/pupuk/anomali', label: 'Deteksi Anomali' },
    ],
  },
  { href: '/bantuan-petani', label: 'Bantuan Petani', icon: HandHeartIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isSubMenuActive = (item: NavItem) => {
    if (!item.subItems) return false;
    return item.subItems.some((sub) => isActive(sub.href));
  };

  const toggleSubmenu = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold text-green-600">
          TagTani
        </Link>
      </div>

      <nav className="px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedItem === item.href;
          const subMenuActive = isSubMenuActive(item);

          return (
            <div key={item.href}>
              {hasSubItems ? (
                <button
                  onClick={() => toggleSubmenu(item.href)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors
                    ${
                      subMenuActive
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium flex-1 text-left">
                    {item.label}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link
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
              )}

              {/* Sub-menu items */}
              {hasSubItems && isExpanded && item.subItems && (
                <div className="ml-2 mb-2 space-y-1 border-l border-gray-200 pl-3">
                  {item.subItems.map((subItem) => {
                    const subActive = isActive(subItem.href);
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          block px-3 py-2 text-xs font-medium rounded transition-colors
                          ${
                            subActive
                              ? 'bg-green-50 text-green-600'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
