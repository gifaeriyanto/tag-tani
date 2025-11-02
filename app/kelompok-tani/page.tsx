'use client';

import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { KelompokTaniCard } from 'components/KelompokTaniCard';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';

export default function KelompokTaniPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [kelompokTaniList, setKelompokTaniList] = useState(KELOMPOK_TANI_LIST);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kelompok tani ini?')) {
      setKelompokTaniList((prev) => prev.filter((kt) => kt.id !== id));
      // TODO: Implement API call to delete
      console.log('Deleted kelompok tani with id:', id);
    }
  };

  const filteredList = kelompokTaniList.filter((kt) => {
    const query = searchQuery.toLowerCase();
    return (
      kt.name.toLowerCase().includes(query) ||
      kt.code.toLowerCase().includes(query) ||
      kt.kecamatan.toLowerCase().includes(query) ||
      kt.village.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2 break-words">
              Kelompok Tani
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Kelola data kelompok tani dan informasinya
            </p>
          </div>
          <Link
            href="/kelompok-tani/create"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap md:flex-shrink-0"
          >
            <PlusIcon className="w-4 md:w-5 h-4 md:h-5" />
            <span className="text-sm md:text-base">Tambah Kelompok Tani</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-full sm:max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, kode, atau kecamatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {filteredList.map((kt) => (
              <KelompokTaniCard key={kt.id} data={kt} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 p-6 md:p-12 text-center">
            <p className="text-sm md:text-base text-gray-500">
              {searchQuery
                ? 'Tidak ada kelompok tani yang sesuai dengan pencarian'
                : 'Belum ada data kelompok tani'}
            </p>
          </div>
        )}
    </div>
  );
}
