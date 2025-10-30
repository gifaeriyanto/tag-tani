'use client';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { StatCard } from 'components/StatCard';
import {
  PUPUK_ANOMALY_LIST,
  PUPUK_DISTRIBUTION_LIST,
  PUPUK_LIST,
  PUPUK_STOCK_LIST,
  PUPUK_USAGE_LIST,
} from 'constants/pupuk';
import {
  BarChart3Icon,
  TrendingDownIcon,
  TrendingUpIcon,
  TruckIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function PupukDashboardPage() {
  // Calculate key metrics
  const totalPupukTypes = PUPUK_LIST.length;
  const totalStock = PUPUK_STOCK_LIST.reduce((sum, s) => sum + s.quantity, 0);
  const totalDistributed = PUPUK_DISTRIBUTION_LIST.filter(
    (d) => d.status === 'delivered' || d.status === 'in_transit'
  ).reduce((sum, d) => sum + d.quantity, 0);
  const totalUsed = PUPUK_USAGE_LIST.reduce((sum, u) => sum + u.quantity, 0);

  // Distribution status breakdown
  const distributionStats = {
    delivered: PUPUK_DISTRIBUTION_LIST.filter((d) => d.status === 'delivered').length,
    inTransit: PUPUK_DISTRIBUTION_LIST.filter((d) => d.status === 'in_transit').length,
    delayed: PUPUK_DISTRIBUTION_LIST.filter((d) => d.status === 'delayed').length,
    planned: PUPUK_DISTRIBUTION_LIST.filter((d) => d.status === 'planned').length,
  };

  // Anomaly breakdown
  const anomalyStats = {
    open: PUPUK_ANOMALY_LIST.filter((a) => a.status === 'open').length,
    inReview: PUPUK_ANOMALY_LIST.filter((a) => a.status === 'in_review').length,
    resolved: PUPUK_ANOMALY_LIST.filter((a) => a.status === 'resolved').length,
    highSeverity: PUPUK_ANOMALY_LIST.filter((a) => a.severity === 'high').length,
  };

  // Top stock items
  const topStockItems = [...PUPUK_STOCK_LIST]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Recent distributions
  const recentDistributions = [...PUPUK_DISTRIBUTION_LIST]
    .sort((a, b) => new Date(b.distributionDate).getTime() - new Date(a.distributionDate).getTime())
    .slice(0, 5);

  // Stock per region
  const stockByRegion = PUPUK_STOCK_LIST.reduce(
    (acc, s) => {
      acc[s.kecamatan] = (acc[s.kecamatan] || 0) + s.quantity;
      return acc;
    },
    {} as Record<string, number>
  );

  // Pupuk usage trends
  const pupukUsageByType = PUPUK_USAGE_LIST.reduce(
    (acc, u) => {
      acc[u.pupukName] = (acc[u.pupukName] || 0) + u.quantity;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="mt-16 ml-[220px] p-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard Pupuk</h1>
          <p className="text-gray-600">Pantau stok, distribusi, penggunaan, dan anomali pupuk secara real-time</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Jenis Pupuk"
            value={totalPupukTypes}
            subtitle="jenis tersedia"
            icon={BarChart3Icon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Stok"
            value={totalStock.toLocaleString()}
            subtitle="unit di seluruh kelompok"
            icon={TrendingUpIcon}
            iconBgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            title="Terdistribusi"
            value={totalDistributed.toLocaleString()}
            subtitle="dalam perjalanan/diterima"
            icon={TruckIcon}
            iconBgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            title="Terpakai"
            value={totalUsed.toLocaleString()}
            subtitle="penggunaan pupuk"
            icon={TrendingDownIcon}
            iconBgColor="bg-amber-50"
            iconColor="text-amber-600"
          />
        </div>

        {/* Summary Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Distribution Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Status Distribusi</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-700">Diterima</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.delivered}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">Dalam Perjalanan</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.inTransit}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">Direncanakan</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.planned}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-700">Terlambat</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.delayed}</span>
              </div>
            </div>
            <Link
              href="/pupuk/distribusi"
              className="mt-4 inline-block w-full rounded-lg bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
            >
              Lihat Distribusi Lengkap →
            </Link>
          </div>

          {/* Anomaly Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Status Anomali</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-700">Terbuka</span>
                </div>
                <span className="font-semibold text-gray-900">{anomalyStats.open}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">Dalam Review</span>
                </div>
                <span className="font-semibold text-gray-900">{anomalyStats.inReview}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-700">Terselesaikan</span>
                </div>
                <span className="font-semibold text-gray-900">{anomalyStats.resolved}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Tingkat Tinggi</span>
                  <span className="font-bold text-red-600">{anomalyStats.highSeverity}</span>
                </div>
              </div>
            </div>
            <Link
              href="/pupuk/anomali"
              className="mt-4 inline-block w-full rounded-lg bg-orange-50 px-4 py-3 text-center text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100"
            >
              Lihat Anomali Lengkap →
            </Link>
          </div>

          {/* Stock per Region */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Stok per Wilayah</h2>
            <div className="space-y-3">
              {Object.entries(stockByRegion)
                .sort((a, b) => b[1] - a[1])
                .map(([region, stock]) => (
                  <div key={region}>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm text-gray-700">{region}</p>
                      <p className="text-sm font-semibold text-gray-900">{stock.toLocaleString()}</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${(stock / Math.max(...Object.values(stockByRegion))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Top Sections */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Stock Items */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Stok Terbesar</h2>
            <div className="space-y-3">
              {topStockItems.map((item) => {
                const pupuk = PUPUK_LIST.find((p) => p.id === item.pupukId);
                const isLowStock = pupuk && item.quantity < pupuk.minStockLevel;
                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-3 ${
                      isLowStock ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.pupukName}</p>
                        <p className="text-xs text-gray-600">{item.kelompokTaniName}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-bold ${
                            isLowStock ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {item.quantity.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">{item.unit}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pupuk Usage */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Penggunaan Pupuk</h2>
            <div className="space-y-3">
              {Object.entries(pupukUsageByType)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([pupukName, quantity]) => (
                  <div key={pupukName} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{pupukName}</p>
                      <p className="text-sm font-bold text-gray-900">
                        {quantity.toLocaleString()}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-300">
                      <div
                        className="h-2 rounded-full bg-amber-500"
                        style={{
                          width: `${
                            (quantity /
                              Math.max(
                                ...Object.values(pupukUsageByType)
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Recent Distributions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Distribusi Terbaru</h2>
          <div className="space-y-2">
            {recentDistributions.map((dist) => (
              <div
                key={dist.id}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{dist.pupukName}</p>
                  <p className="text-xs text-gray-600">
                    {dist.fromKelompokTaniName || 'Pusat'} → {dist.toKelompokTaniName}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {dist.quantity.toLocaleString()} {dist.unit}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(dist.distributionDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${
                      dist.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : dist.status === 'in_transit'
                        ? 'bg-blue-100 text-blue-800'
                        : dist.status === 'delayed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {dist.status === 'delivered'
                      ? 'Diterima'
                      : dist.status === 'in_transit'
                      ? 'Perjalanan'
                      : dist.status === 'delayed'
                      ? 'Terlambat'
                      : 'Rencana'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/pupuk/distribusi"
            className="mt-4 inline-block w-full rounded-lg bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            Lihat Semua Distribusi →
          </Link>
        </div>
      </main>
    </div>
  );
}
