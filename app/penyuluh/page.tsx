'use client';

import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PenyuluhCard } from 'components/PenyuluhCard';
import { PENYULUH_LIST } from 'constants/penyuluh';

export default function PenyuluhPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [penyuluhList, setPenyuluhList] = useState(PENYULUH_LIST);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus penyuluh ini?')) {
      setPenyuluhList((prev) => prev.filter((p) => p.id !== id));
      // TODO: Implement API call to delete
      console.log('Deleted penyuluh with id:', id);
    }
  };

  const filteredList = penyuluhList.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.nip.toLowerCase().includes(query) ||
      p.specialization.toLowerCase().includes(query) ||
      p.workArea.toLowerCase().includes(query) ||
      p.phone.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">

        {/* Page Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2 break-words">
              Penyuluh
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Kelola data penyuluh pertanian dan informasinya
            </p>
          </div>
          <Link
            href="/penyuluh/create"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap md:flex-shrink-0"
          >
            <PlusIcon className="w-4 md:w-5 h-4 md:h-5" />
            <span className="text-sm md:text-base">Tambah Penyuluh</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-full sm:max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, NIP, keahlian, atau wilayah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {filteredList.map((p) => (
              <PenyuluhCard key={p.id} data={p} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 p-6 md:p-12 text-center">
            <p className="text-sm md:text-base text-gray-500">
              {searchQuery
                ? 'Tidak ada penyuluh yang sesuai dengan pencarian'
                : 'Belum ada data penyuluh'}
            </p>
          </div>
        )}

    </div>
  );
}
