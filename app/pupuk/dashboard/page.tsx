'use client';

import {
  AlertCircleIcon,
  BarChart3Icon,
  TrendingDownIcon,
  TrendingUpIcon,
  TruckIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import {
  PUPUK_ANOMALY_LIST,
  PUPUK_DISTRIBUTION_LIST,
  PUPUK_LIST,
  PUPUK_STOCK_LIST,
  PUPUK_USAGE_LIST,
} from 'constants/pupuk';

export default function PupukDashboardPage() {
  // Calculate key metrics
  const totalPupukTypes = PUPUK_LIST.length;
  const totalStock = PUPUK_STOCK_LIST.reduce((sum, s) => sum + s.quantity, 0);
  const totalDistributed = PUPUK_DISTRIBUTION_LIST.filter(
    (d) => d.status === 'delivered' || d.status === 'in_transit'
  ).reduce((sum, d) => sum + d.quantity, 0);
  const totalUsed = PUPUK_USAGE_LIST.reduce((sum, u) => sum + u.quantity, 0);

  // Stock alerts
  const lowStockItems = PUPUK_STOCK_LIST.filter((s) => {
    const pupuk = PUPUK_LIST.find((p) => p.id === s.pupukId);
    return pupuk && s.quantity < pupuk.minStockLevel;
  });

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

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3Icon className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Pupuk</h1>
          </div>
          <p className="text-gray-600">
            Pantau stok, distribusi, penggunaan, dan anomali pupuk secara real-time
          </p>
        </div>

        {/* Key Metrics Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Jenis Pupuk</p>
              <TrendingUpIcon className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalPupukTypes}</p>
            <p className="text-xs text-gray-500 mt-2">jenis yang tersedia</p>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-blue-600">Total Stok</p>
              <BarChart3Icon className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-900">{totalStock.toLocaleString()}</p>
            <p className="text-xs text-blue-600 mt-2">unit di seluruh kelompok tani</p>
          </div>

          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-green-600">Terdistribusi</p>
              <TruckIcon className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-900">{totalDistributed.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">dalam perjalanan/diterima</p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-amber-600">Terpakai</p>
              <TrendingDownIcon className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-amber-900">{totalUsed.toLocaleString()}</p>
            <p className="text-xs text-amber-600 mt-2">penggunaan pupuk</p>
          </div>
        </div>

        {/* Critical Alerts */}
        {(lowStockItems.length > 0 || anomalyStats.highSeverity > 0) && (
          <div className="mb-8 space-y-3">
            {lowStockItems.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">
                    {lowStockItems.length} Item Stok Rendah
                  </h3>
                  <p className="text-sm text-red-700 mb-2">
                    Segera lakukan restok untuk mencegah kekurangan:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lowStockItems.slice(0, 3).map((item) => (
                      <span key={item.id} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                        {item.pupukName} ({item.kelompokTaniName})
                      </span>
                    ))}
                    {lowStockItems.length > 3 && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                        +{lowStockItems.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href="/pupuk"
                  className="text-red-600 hover:text-red-800 text-sm font-medium whitespace-nowrap ml-4"
                >
                  Lihat →
                </Link>
              </div>
            )}

            {anomalyStats.highSeverity > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900 mb-1">
                    ⚠️ {anomalyStats.highSeverity} Anomali Tingkat Tinggi
                  </h3>
                  <p className="text-sm text-orange-700">
                    Memerlukan review dan tindakan segera dari tim pengelola pupuk
                  </p>
                </div>
                <Link
                  href="/pupuk/anomali"
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium whitespace-nowrap ml-4"
                >
                  Review →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Distribution Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribusi</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-700">Diterima</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.delivered}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">Dalam Perjalanan</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.inTransit}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">Direncanakan</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.planned}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-700">Terlambat</span>
                </div>
                <span className="font-semibold text-gray-900">{distributionStats.delayed}</span>
              </div>
            </div>
            <Link
              href="/pupuk/distribusi"
              className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors text-center"
            >
              Lihat Distribusi Lengkap →
            </Link>
          </div>

          {/* Anomaly Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Anomali</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-700">Terbuka</span>
                </div>
                <span className="font-semibold text-gray-900">{anomalyStats.open}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">Dalam Review</span>
                </div>
                <span className="font-semibold text-gray-900">{anomalyStats.inReview}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-700">Terselesaikan</span>
                </div>
                <span className="font-semibold text-gray-900">{anomalyStats.resolved}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-700">Tingkat Tinggi</span>
                <span className="font-bold text-red-600">{anomalyStats.highSeverity}</span>
              </div>
            </div>
            <Link
              href="/pupuk/anomali"
              className="mt-4 w-full py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 text-sm font-medium transition-colors text-center"
            >
              Lihat Anomali Lengkap →
            </Link>
          </div>

          {/* Stok per Wilayah */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Stok per Wilayah</h2>
            <div className="space-y-3">
              {Object.entries(stockByRegion)
                .sort((a, b) => b[1] - a[1])
                .map(([region, stock]) => (
                  <div key={region}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">{region}</p>
                      <p className="text-sm font-semibold text-gray-900">{stock.toLocaleString()}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Stock Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Stok Terbesar</h2>
            <div className="space-y-3">
              {topStockItems.map((item, _idx) => {
                const pupuk = PUPUK_LIST.find((p) => p.id === item.pupukId);
                const isLowStock = pupuk && item.quantity < pupuk.minStockLevel;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border ${
                      isLowStock
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
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

          {/* Top Pupuk Usage */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Penggunaan Pupuk</h2>
            <div className="space-y-3">
              {Object.entries(pupukUsageByType)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([pupukName, quantity]) => (
                  <div key={pupukName} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{pupukName}</p>
                      <p className="text-sm font-bold text-gray-900">
                        {quantity.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
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
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Terbaru</h2>
          <div className="space-y-2">
            {recentDistributions.map((dist) => (
              <div
                key={dist.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
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
                    className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
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
            className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors text-center"
          >
            Lihat Semua Distribusi →
          </Link>
        </div>
      </main>
    </div>
  );
}
