'use client';

import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from 'components/Header';
import { KelompokTaniCard } from 'components/KelompokTaniCard';
import { Sidebar } from 'components/Sidebar';
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kelompok Tani
            </h1>
            <p className="text-gray-600">
              Kelola data kelompok tani dan informasinya
            </p>
          </div>
          <Link
            href="/kelompok-tani/create"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Kelompok Tani
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, kode, atau kecamatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-3">
            {filteredList.map((kt) => (
              <KelompokTaniCard key={kt.id} data={kt} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? 'Tidak ada kelompok tani yang sesuai dengan pencarian'
                : 'Belum ada data kelompok tani'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
