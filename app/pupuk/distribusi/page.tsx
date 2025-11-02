'use client';

import { AlertCircleIcon, PlusIcon, SearchIcon, TrendingUpIcon, TruckIcon } from 'lucide-react'; // AlertCircleIcon used for stat card icon
import Link from 'next/link';
import { useState } from 'react';
import { PupukDistributionCard } from 'components/PupukDistributionCard';
import { StatCard } from 'components/StatCard';
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
    <div className="p-8">
      {/* Page Title */}
      <div className="mb-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Distribusi Pupuk</h1>
              <p className="text-gray-600">Pantau distribusi pupuk dari pusat ke kelompok tani dan petani individual</p>
            </div>
            <Link
              href="/pupuk/distribusi/create"
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" />
              Tambah Distribusi
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Distribusi"
            value={distributions.length}
            subtitle="semua distribusi"
            icon={TrendingUpIcon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Dalam Perjalanan"
            value={inTransit.length}
            subtitle="sedang dalam pengiriman"
            icon={TruckIcon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Diterima"
            value={delivered.length}
            subtitle="distribusi selesai"
            icon={TrendingUpIcon}
            iconBgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            title="Terlambat"
            value={delayed.length}
            subtitle="perlu tindakan"
            icon={AlertCircleIcon}
            iconBgColor="bg-red-50"
            iconColor="text-red-600"
          />
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pupuk, kelompok tani, atau petani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                statusFilter === '' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            {DISTRIBUTION_STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
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
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">
              {searchQuery || statusFilter
                ? 'Tidak ada distribusi yang sesuai dengan pencarian'
                : 'Belum ada data distribusi'}
            </p>
          </div>
        )}
    </div>
  );
}
