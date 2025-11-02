'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BantuanPetaniForm } from 'components/BantuanPetaniForm';

export default function CreateBantuanPetaniPage() {
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
            Tambah Bantuan Petani
          </h1>
          <p className="text-gray-600">
            Isi formulir di bawah untuk menambah bantuan petani baru
          </p>
        </div>

        {/* Form */}
        <BantuanPetaniForm mode="create" />

    </div>
  );
}
