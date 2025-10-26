'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from 'components/Header';
import { PetaniForm } from 'components/PetaniForm';
import { Sidebar } from 'components/Sidebar';
import { PETANI_LIST } from 'constants/petani';

export default function EditPetaniPage() {
  const params = useParams();
  const router = useRouter();
  const kelompokTaniId = params.id as string;
  const petaniId = params.petaniId as string;

  const petani = PETANI_LIST.find((p) => p.id === petaniId);

  if (!petani) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />

        <main className="ml-[220px] mt-16 p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Petani tidak ditemukan</p>
            <Link
              href={`/kelompok-tani/${kelompokTaniId}/anggota`}
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
            Edit Petani
          </h1>
          <p className="text-gray-600">
            Perbarui informasi petani {petani.name}
          </p>
        </div>

        {/* Form */}
        <PetaniForm mode="edit" initialData={petani} kelompokTaniId={kelompokTaniId} />
      </main>
    </div>
  );
}
