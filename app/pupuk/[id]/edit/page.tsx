'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Header } from 'components/Header';
import { PupukForm } from 'components/PupukForm';
import { Sidebar } from 'components/Sidebar';
import { PUPUK_LIST } from 'constants/pupuk';

export default function PupukEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const pupuk = PUPUK_LIST.find((p) => p.id === id);

  if (!pupuk) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="ml-[220px] mt-16 p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Pupuk tidak ditemukan</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Kembali
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Pupuk</h1>
          <p className="text-gray-600">Perbarui informasi pupuk {pupuk.name}</p>
        </div>

        {/* Form */}
        <PupukForm mode="edit" initialData={pupuk} />
      </main>
    </div>
  );
}
