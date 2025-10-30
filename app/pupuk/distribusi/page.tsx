'use client';

import { AlertCircleIcon, PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from 'components/Header';
import { PupukDistributionCard } from 'components/PupukDistributionCard';
import { Sidebar } from 'components/Sidebar';
import {
  DISTRIBUTION_STATUS_OPTIONS,
  PUPUK_DISTRIBUTION_LIST,
  PupukDistribution,
} from 'constants/pupuk';

export default function PupukDistributionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [distributions] = useState<PupukDistribution[]>(
    PUPUK_DISTRIBUTION_LIST
  );

  const filteredList = distributions.filter((d) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      d.pupukName.toLowerCase().includes(query) ||
      d.toKelompokTaniName.toLowerCase().includes(query) ||
      d.petaniName?.toLowerCase().includes(query) ||
      (d.fromKelompokTaniName && d.fromKelompokTaniName.toLowerCase().includes(query));
    const matchesStatus = statusFilter ? d.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const delayed = distributions.filter((d) => d.status === 'delayed');
  const inTransit = distributions.filter((d) => d.status === 'in_transit');
  const delivered = distributions.filter((d) => d.status === 'delivered');

  // Sort by date (newest first)
  const sortedList = [...filteredList].sort(
    (a, b) => new Date(b.distributionDate).getTime() - new Date(a.distributionDate).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Distribusi Pupuk</h1>
            <p className="text-gray-600">
              Pantau distribusi pupuk dari pusat ke kelompok tani dan petani individual
            </p>
          </div>
          <Link
            href="/pupuk/distribusi/create"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Distribusi
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Distribusi</p>
            <p className="text-3xl font-bold text-gray-900">{distributions.length}</p>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <p className="text-sm text-blue-600 mb-1">Dalam Perjalanan</p>
            <p className="text-3xl font-bold text-blue-900">{inTransit.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <p className="text-sm text-green-600 mb-1">Diterima</p>
            <p className="text-3xl font-bold text-green-900">{delivered.length}</p>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 p-6">
            <p className="text-sm text-red-600 mb-1">Terlambat</p>
            <p className="text-3xl font-bold text-red-900">{delayed.length}</p>
          </div>
        </div>

        {/* Alert for Delayed Distributions */}
        {delayed.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Ada {delayed.length} Distribusi Terlambat</h3>
              <p className="text-sm text-red-700">
                Segera koordinasikan dengan penyuluh dan petani untuk penanganan yang lebih cepat.
              </p>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pupuk, kelompok tani, atau petani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                statusFilter === ''
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            {DISTRIBUTION_STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === option.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {sortedList.length > 0 ? (
          <div className="space-y-3">
            {sortedList.map((distribution) => (
              <PupukDistributionCard key={distribution.id} data={distribution} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              {searchQuery || statusFilter
                ? 'Tidak ada distribusi yang sesuai dengan pencarian'
                : 'Belum ada data distribusi'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
