'use client';

import { ArrowLeftIcon, MapPinIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { LahanMap } from 'components/LahanMap';
import { LAHAN_LIST } from 'constants/lahan';

export default function LahanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const kelompokTaniId = params['kelompok-id'] as string;
  const lahanId = params['lahan-id'] as string;

  const lahan = LAHAN_LIST.find((l) => l.id === lahanId);

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus lahan ini?')) {
      // TODO: Implement API call
      console.log('Deleted lahan with id:', lahanId);
      router.push('/lahan');
    }
  };

  if (!lahan) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Lahan tidak ditemukan</p>
            <Link href="/lahan" className="text-green-600 hover:text-green-700">
              Kembali ke Daftar Lahan
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {lahan.name}
              </h1>
              <p className="text-gray-600">{lahan.kelompokTaniName}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/lahan/${kelompokTaniId}/${lahanId}/edit`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5" />
            Lokasi Lahan
          </h2>
          <LahanMap
            lahanList={[lahan]}
            selectedLahanId={lahan.id}
            height="400px"
          />
        </div>

        {/* Detail Sections */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Dasar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Lahan</p>
                <p className="text-sm font-medium text-gray-900">{lahan.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Luas Lahan</p>
                <p className="text-sm font-medium text-gray-900">
                  {lahan.area} ha
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kelompok Tani</p>
                <p className="text-sm font-medium text-gray-900">
                  {lahan.kelompokTaniName}
                </p>
              </div>
              {lahan.petaniName && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pemilik</p>
                  <p className="text-sm font-medium text-gray-900">
                    {lahan.petaniName}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Commodities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Komoditi
            </h2>
            <div className="flex flex-wrap gap-2">
              {lahan.commodities.map((commodity) => (
                <span
                  key={commodity}
                  className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                >
                  {commodity}
                </span>
              ))}
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Tambahan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Dibuat</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(lahan.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Terakhir Diperbarui</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(lahan.updatedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
