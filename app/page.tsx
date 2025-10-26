'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRangeFilter } from 'components/DateRangeFilter';
import { Header } from 'components/Header';
import { HorizontalBarChart } from 'components/HorizontalBarChart';
import { Sidebar } from 'components/Sidebar';
import { StatCard } from 'components/StatCard';
import {
  DASHBOARD_STATS,
  HARVEST_TRENDS_LAST_MONTH,
  HARVEST_TRENDS_LAST_YEAR,
} from 'constants/dashboard';

type FilterOption = 'last_month' | 'last_year' | 'custom';

export default function Dashboard() {
  const [showAllKecamatan, setShowAllKecamatan] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('last_month');

  const handleFilterChange = (
    option: FilterOption,
    startDate?: Date,
    endDate?: Date
  ) => {
    setSelectedFilter(option);
    // TODO: When custom is selected, you can use startDate and endDate to fetch data
    console.log('Filter changed:', option, startDate, endDate);
  };

  const harvestTrends =
    selectedFilter === 'last_year'
      ? HARVEST_TRENDS_LAST_YEAR
      : HARVEST_TRENDS_LAST_MONTH;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {DASHBOARD_STATS.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Harvest Trends Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Trend Panen per Kecamatan
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                  <span className="text-xs text-gray-600">Padi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                  <span className="text-xs text-gray-600">Jagung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
                  <span className="text-xs text-gray-600">Kedelai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-xs text-gray-600">Kacang Tanah</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#84cc16]"></div>
                  <span className="text-xs text-gray-600">Kacang Hijau</span>
                </div>
              </div>
            </div>
            <DateRangeFilter onFilterChange={handleFilterChange} />
          </div>

          <HorizontalBarChart
            data={showAllKecamatan ? harvestTrends : harvestTrends.slice(0, 5)}
          />

          {harvestTrends.length > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllKecamatan(!showAllKecamatan)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                {showAllKecamatan ? (
                  <>
                    <ChevronUpIcon className="w-4 h-4" />
                    Tampilkan Lebih Sedikit
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="w-4 h-4" />
                    Tampilkan Semua ({harvestTrends.length} Kecamatan)
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
