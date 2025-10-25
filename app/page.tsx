import { Metadata } from 'next';
import {
  UsersIcon,
  UserCheckIcon,
  WheatIcon,
  HandHeartIcon,
} from 'lucide-react';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
import { StatCard } from 'components/StatCard';

export const metadata: Metadata = {
  title: 'Dashboard - TagTani',
};

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Kelompok Tani',
      value: 5,
      subtitle: '5 aktif',
      icon: UsersIcon,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Penyuluh',
      value: 8,
      subtitle: '8 aktif',
      icon: UserCheckIcon,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Komoditi',
      value: 12,
      icon: WheatIcon,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      subtitle: '12 jenis',
    },
    {
      title: 'Bantuan Tersalurkan',
      value: 24,
      icon: HandHeartIcon,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      subtitle: 'Bulan ini',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Ringkasan aktivitas dan statistik kelompok tani
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </main>
    </div>
  );
}
