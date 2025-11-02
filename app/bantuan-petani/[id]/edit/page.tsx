'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BantuanPetaniForm } from 'components/BantuanPetaniForm';
import { BANTUAN_PETANI_LIST } from 'constants/bantuanPetani';

export default function EditBantuanPetaniPage() {
  const params = useParams();
  const router = useRouter();
  const bantuanId = params.id as string;

  const bantuan = BANTUAN_PETANI_LIST.find((b) => b.id === bantuanId);

  if (!bantuan) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Bantuan tidak ditemukan</p>
          <Link href="/bantuan-petani" className="mt-4 text-green-600 hover:underline">
            Kembali ke daftar bantuan
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
            Edit Bantuan Petani
          </h1>
          <p className="text-gray-600">
            Perbarui informasi bantuan {bantuan.title}
          </p>
        </div>

        {/* Form */}
        <BantuanPetaniForm initialData={bantuan} mode="edit" />

    </div>
  );
}
