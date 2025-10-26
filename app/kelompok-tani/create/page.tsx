'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from 'components/Header';
import { KelompokTaniForm } from 'components/KelompokTaniForm';
import { Sidebar } from 'components/Sidebar';

export default function CreateKelompokTaniPage() {
  const router = useRouter();

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Kelompok Tani
          </h1>
          <p className="text-gray-600">
            Isi formulir di bawah untuk menambah kelompok tani baru
          </p>
        </div>

        {/* Form */}
        <KelompokTaniForm mode="create" />
      </main>
    </div>
  );
}
