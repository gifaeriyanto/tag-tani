'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Penyuluh
            </h1>
            <p className="text-gray-600">
              Kelola data penyuluh pertanian dan informasinya
            </p>
          </div>
          <Link
            href="/penyuluh/create"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Penyuluh
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, NIP, keahlian, atau wilayah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-3">
            {filteredList.map((p) => (
              <PenyuluhCard key={p.id} data={p} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? 'Tidak ada penyuluh yang sesuai dengan pencarian'
                : 'Belum ada data penyuluh'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
