'use client';

import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PupukCard } from 'components/PupukCard';
import { PUPUK_LIST } from 'constants/pupuk';

export default function PupukPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pupukList, setPupukList] = useState(PUPUK_LIST);
  const [filterType, setFilterType] = useState<string>('');

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pupuk ini?')) {
      setPupukList((prev) => prev.filter((p) => p.id !== id));
      // TODO: Implement API call to delete
      console.log('Deleted pupuk with id:', id);
    }
  };

  const filteredList = pupukList.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.composition && p.composition.toLowerCase().includes(query));
    const matchesType = filterType ? p.type === filterType : true;
    return matchesSearch && matchesType;
  });

  const pupukTypes = Array.from(new Set(PUPUK_LIST.map((p) => p.type)));

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2 break-words">Pupuk</h1>
            <p className="text-sm md:text-base text-gray-600">
              Kelola jenis pupuk dan monitor stok di setiap kelompok tani
            </p>
          </div>
          <Link
            href="/pupuk/create"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap md:flex-shrink-0"
          >
            <PlusIcon className="w-4 md:w-5 h-4 md:h-5" />
            <span className="text-sm md:text-base">Tambah Pupuk</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-full sm:max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, kode, atau komposisi pupuk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterType === ''
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            {pupukTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {filteredList.map((pupuk) => (
              <PupukCard key={pupuk.id} data={pupuk} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 p-6 md:p-12 text-center">
            <p className="text-sm md:text-base text-gray-500">
              {searchQuery || filterType
                ? 'Tidak ada pupuk yang sesuai dengan pencarian'
                : 'Belum ada data pupuk'}
            </p>
          </div>
        )}
    </div>
  );
}
