'use client';

import { AlertTriangleIcon, BarChart3Icon, FilterIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Header } from 'components/Header';
import { PupukAnomalyCard } from 'components/PupukAnomalyCard';
import { Sidebar } from 'components/Sidebar';
import {
  PUPUK_ANOMALY_LIST,
  ANOMALY_TYPE_OPTIONS,
  ANOMALY_STATUS_OPTIONS,
  ANOMALY_SEVERITY_OPTIONS,
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangleIcon className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Deteksi Anomali Pupuk</h1>
          </div>
          <p className="text-gray-600">
            Monitor anomali seperti overstock, understock, pengiriman terlambat, dan laporan
            terlambat
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Anomali</p>
            <p className="text-3xl font-bold text-gray-900">{anomalies.length}</p>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 p-6">
            <p className="text-sm text-red-600 mb-1">Terbuka</p>
            <p className="text-3xl font-bold text-red-900">{openAnomalies.length}</p>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <p className="text-sm text-blue-600 mb-1">Dalam Review</p>
            <p className="text-3xl font-bold text-blue-900">{inReview.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <p className="text-sm text-green-600 mb-1">Terselesaikan</p>
            <p className="text-3xl font-bold text-green-900">{resolved.length}</p>
          </div>
        </div>

        {/* Priority Alert */}
        {highSeverity.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                ⚠️ {highSeverity.length} Anomali Prioritas Tinggi
              </h3>
              <p className="text-sm text-red-700">
                Memerlukan tindakan segera dari penyuluh dan pengelola stok.
              </p>
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Anomalies by Region */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3Icon className="w-5 h-5" />
              Anomali per Wilayah
            </h2>
            <div className="space-y-3">
              {Object.entries(anomaliesByRegion)
                .sort((a, b) => b[1] - a[1])
                .map(([region, count]) => (
                  <div key={region}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700">{region}</p>
                      <p className="text-sm font-bold text-gray-900">{count}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
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
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3Icon className="w-5 h-5" />
              Anomali per Jenis
            </h2>
            <div className="space-y-3">
              {Object.entries(anomaliesByType)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700">{type}</p>
                      <p className="text-sm font-bold text-gray-900">{count}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
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
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari anomali berdasarkan deskripsi, wilayah, atau pupuk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <FilterIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              <PupukAnomalyCard
                key={anomaly.id}
                data={anomaly}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              {searchQuery || typeFilter || statusFilter || severityFilter
                ? 'Tidak ada anomali yang sesuai dengan filter'
                : 'Tidak ada anomali terdeteksi'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
