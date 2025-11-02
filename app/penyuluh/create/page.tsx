'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PenyuluhForm } from 'components/PenyuluhForm';

export default function CreatePenyuluhPage() {
  const router = useRouter();

  return (
    <div className="p-8">

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
            Tambah Penyuluh
          </h1>
          <p className="text-gray-600">
            Isi formulir di bawah untuk menambah penyuluh baru
          </p>
        </div>

        {/* Form */}
        <PenyuluhForm mode="create" />

    </div>
  );
}
