'use client';

import { ArrowLeftIcon, PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from 'components/Header';
import { PetaniCard } from 'components/PetaniCard';
import { Sidebar } from 'components/Sidebar';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';
import { PETANI_LIST } from 'constants/petani';

export default function PetaniListPage() {
  const params = useParams();
  const router = useRouter();
  const kelompokTaniId = params.id as string;

  const kelompokTani = KELOMPOK_TANI_LIST.find((kt) => kt.id === kelompokTaniId);
  const [searchQuery, setSearchQuery] = useState('');
  const [petaniList, setPetaniList] = useState(
    PETANI_LIST.filter((p) => p.kelompokTaniId === kelompokTaniId)
  );

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus petani ini?')) {
      setPetaniList((prev) => prev.filter((p) => p.id !== id));
      // TODO: Implement API call to delete
      console.log('Deleted petani with id:', id);
    }
  };

  const filteredList = petaniList.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.nik.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Kembali
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Daftar Petani
              </h1>
              <p className="text-gray-600">
                {kelompokTani ? kelompokTani.name : 'Kelompok Tani'}
              </p>
            </div>
            <Link
              href={`/kelompok-tani/${kelompokTaniId}/anggota/create`}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Tambah Petani
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau NIK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* List */}
        {filteredList.length > 0 ? (
          <div className="space-y-3">
            {filteredList.map((petani) => (
              <PetaniCard
                key={petani.id}
                data={petani}
                kelompokTaniId={kelompokTaniId}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? 'Tidak ada petani yang sesuai dengan pencarian'
                : 'Belum ada data petani'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
