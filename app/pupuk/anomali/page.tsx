'use client';

import { AlertTriangleIcon, BarChart3Icon, FilterIcon, SearchIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { PupukAnomalyCard } from 'components/PupukAnomalyCard';
import { StatCard } from 'components/StatCard';
import {
  ANOMALY_SEVERITY_OPTIONS,
  ANOMALY_STATUS_OPTIONS,
  ANOMALY_TYPE_OPTIONS,
  PUPUK_ANOMALY_LIST,
  PupukAnomaly,
} from 'constants/pupuk';

export default function PupukAnomalyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [anomalies, setAnomalies] = useState<PupukAnomaly[]>(PUPUK_ANOMALY_LIST);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('');

  const handleStatusChange = (id: string, newStatus: PupukAnomaly['status']) => {
    setAnomalies((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: newStatus,
              resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : a.resolvedAt,
            }
          : a
      )
    );
  };

  const filteredList = anomalies.filter((a) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      a.description.toLowerCase().includes(query) ||
      a.kelompokTaniName.toLowerCase().includes(query) ||
      a.kecamatan.toLowerCase().includes(query) ||
      (a.pupukName && a.pupukName.toLowerCase().includes(query));
    const matchesType = typeFilter ? a.type === typeFilter : true;
    const matchesStatus = statusFilter ? a.status === statusFilter : true;
    const matchesSeverity = severityFilter ? a.severity === severityFilter : true;
    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  // Calculate statistics
  const openAnomalies = anomalies.filter((a) => a.status === 'open');
  const inReview = anomalies.filter((a) => a.status === 'in_review');
  const resolved = anomalies.filter((a) => a.status === 'resolved');
  const highSeverity = anomalies.filter((a) => a.severity === 'high');

  // Anomalies by region
  const anomaliesByRegion = anomalies.reduce(
    (acc, a) => {
      acc[a.kecamatan] = (acc[a.kecamatan] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Anomalies by type
  const anomaliesByType = anomalies.reduce(
    (acc, a) => {
      const typeLabel = ANOMALY_TYPE_OPTIONS.find((o) => o.value === a.type)?.label || a.type;
      acc[typeLabel] = (acc[typeLabel] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Sort by detected date (newest first)
  const sortedList = [...filteredList].sort(
    (a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime()
  );

  return (
    <div className="p-8">
      {/* Page Title */}
      <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Deteksi Anomali Pupuk</h1>
          <p className="text-gray-600">Monitor anomali seperti overstock, understock, pengiriman terlambat, dan laporan terlambat</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Anomali"
            value={anomalies.length}
            subtitle="semua anomali"
            icon={TrendingUpIcon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Terbuka"
            value={openAnomalies.length}
            subtitle="menunggu penyelesaian"
            icon={AlertTriangleIcon}
            iconBgColor="bg-red-50"
            iconColor="text-red-600"
          />
          <StatCard
            title="Dalam Review"
            value={inReview.length}
            subtitle="sedang ditinjau"
            icon={BarChart3Icon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Terselesaikan"
            value={resolved.length}
            subtitle="sudah ditangani"
            icon={TrendingUpIcon}
            iconBgColor="bg-green-50"
            iconColor="text-green-600"
          />
        </div>

        {/* Priority Alert */}
        {highSeverity.length > 0 && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <AlertTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <div>
              <h3 className="mb-1 font-semibold text-red-900">⚠️ {highSeverity.length} Anomali Prioritas Tinggi</h3>
              <p className="text-sm text-red-700">Memerlukan tindakan segera dari penyuluh dan pengelola stok.</p>
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Anomalies by Region */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <BarChart3Icon className="h-5 w-5" />
              Anomali per Wilayah
            </h2>
            <div className="space-y-3">
              {Object.entries(anomaliesByRegion)
                .sort((a, b) => b[1] - a[1])
                .map(([region, count]) => (
                  <div key={region}>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">{region}</p>
                      <p className="text-sm font-bold text-gray-900">{count}</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{
                          width: `${(count / Math.max(...Object.values(anomaliesByRegion))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Anomalies by Type */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <BarChart3Icon className="h-5 w-5" />
              Anomali per Jenis
            </h2>
            <div className="space-y-3">
              {Object.entries(anomaliesByType)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <div key={type}>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">{type}</p>
                      <p className="text-sm font-bold text-gray-900">{count}</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-orange-500"
                        style={{
                          width: `${(count / Math.max(...Object.values(anomaliesByType))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari anomali berdasarkan deskripsi, wilayah, atau pupuk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-green-500"
            >
              <option value="">Semua Jenis</option>
              {ANOMALY_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-green-500"
            >
              <option value="">Semua Status</option>
              {ANOMALY_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-green-500"
            >
              <option value="">Semua Tingkat Keparahan</option>
              {ANOMALY_SEVERITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Anomaly List */}
        {sortedList.length > 0 ? (
          <div className="space-y-3">
            {sortedList.map((anomaly) => (
              <PupukAnomalyCard key={anomaly.id} data={anomaly} onStatusChange={handleStatusChange} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">
              {searchQuery || typeFilter || statusFilter || severityFilter
                ? 'Tidak ada anomali yang sesuai dengan filter'
                : 'Tidak ada anomali terdeteksi'}
            </p>
          </div>
        )}
    </div>
  );
}
