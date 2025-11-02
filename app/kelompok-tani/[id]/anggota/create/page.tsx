'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { PetaniForm } from 'components/PetaniForm';

export default function CreatePetaniPage() {
  const params = useParams();
  const router = useRouter();
  const kelompokTaniId = params.id as string;

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
            Tambah Petani
          </h1>
          <p className="text-gray-600">
            Isi formulir di bawah untuk menambah petani baru
          </p>
        </div>

      {/* Form */}
      <PetaniForm mode="create" kelompokTaniId={kelompokTaniId} />
    </div>
  );
}
