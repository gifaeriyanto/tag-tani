'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
import { PenyuluhForm } from 'components/PenyuluhForm';
import { PENYULUH_LIST } from 'constants/penyuluh';

export default function EditPenyuluhPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const penyuluh = PENYULUH_LIST.find((p) => p.id === id);

  if (!penyuluh) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />

        <main className="ml-[220px] mt-16 p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Penyuluh tidak ditemukan</p>
            <Link
              href="/penyuluh"
              className="text-green-600 hover:text-green-700"
            >
              Kembali ke Daftar
            </Link>
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
            Edit Penyuluh
          </h1>
          <p className="text-gray-600">
            Perbarui informasi penyuluh {penyuluh.name}
          </p>
        </div>

        {/* Form */}
        <PenyuluhForm mode="edit" initialData={penyuluh} />
      </main>
    </div>
  );
}
