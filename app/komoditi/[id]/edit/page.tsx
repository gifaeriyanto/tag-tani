'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { KomoditiForm } from 'components/KomoditiForm';
import { KOMODITI_LIST } from 'constants/komoditi';

export default function EditKomoditiPage() {
  const params = useParams();
  const router = useRouter();
  const komoditiId = params.id as string;

  const komoditi = KOMODITI_LIST.find((k) => k.id === komoditiId);

  if (!komoditi) {
    return (
      <div className="p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Komoditi tidak ditemukan</p>
            <Link href="/komoditi" className="mt-4 text-green-600 hover:underline">
              Kembali ke daftar komoditi
            </Link>
          </div>

      </div>
    );
  }

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
            Edit Komoditi
          </h1>
          <p className="text-gray-600">
            Perbarui informasi komoditi {komoditi.name}
          </p>
        </div>

        {/* Form */}
        <KomoditiForm initialData={komoditi} mode="edit" />

    </div>
  );
}
