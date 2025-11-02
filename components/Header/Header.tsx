import { BellIcon, ChevronDownIcon, MenuIcon } from 'lucide-react';
import { useSidebar } from 'components/Sidebar/SidebarContext';

export function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 lg:left-[220px] right-0 z-30">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Spacer for desktop */}
        <div className="hidden lg:block" />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BellIcon className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Admin Dropdown */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">A</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
