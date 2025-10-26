'use client';

import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { BantuanPetaniCard } from 'components/BantuanPetaniCard';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { BANTUAN_PETANI_LIST } from 'constants/bantuanPetani';

export default function BantuanPetaniPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bantuanList, setBantuanList] = useState(BANTUAN_PETANI_LIST);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus bantuan ini?')) {
      setBantuanList((prev) => prev.filter((b) => b.id !== id));
      // TODO: Implement API call to delete
      console.log('Deleted bantuan with id:', id);
    }
  };

  const filteredList = bantuanList.filter((b) => {
    const query = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(query) ||
      b.description.toLowerCase().includes(query) ||
      b.provider.toLowerCase().includes(query) ||
      b.contact.toLowerCase().includes(query) ||
      b.phone.toLowerCase().includes(query)
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
              Bantuan Petani
            </h1>
            <p className="text-gray-600">
              Kelola data bantuan pertanian untuk kelompok tani
            </p>
          </div>
          <Link
            href="/bantuan-petani/create"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Bantuan
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul, deskripsi, pemberi, atau kontak..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-3">
            {filteredList.map((b) => (
              <BantuanPetaniCard key={b.id} data={b} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? 'Tidak ada bantuan yang sesuai dengan pencarian'
                : 'Belum ada data bantuan petani'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
