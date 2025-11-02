'use client';

import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BANTUAN_PETANI_LIST } from 'constants/bantuanPetani';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';

const typeLabels: Record<string, string> = {
  subsidy: 'Subsidi',
  training: 'Pelatihan',
  equipment: 'Peralatan',
  seed: 'Benih',
  fertilizer: 'Pupuk',
  other: 'Lainnya',
};

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  active: 'Aktif',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};

export default function BantuanPetaniDetailPage() {
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

  const targetKelompokTani = KELOMPOK_TANI_LIST.filter((kt) =>
    bantuan.targetKelompokTani.includes(kt.id)
  );

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
                {bantuan.title}
              </h1>
              <p className="text-gray-600">Pemberi: {bantuan.provider}</p>
            </div>
            <Link
              href={`/bantuan-petani/${bantuan.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </Link>
          </div>
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
                <p className="text-sm text-gray-500 mb-1">Judul Bantuan</p>
                <p className="text-sm font-medium text-gray-900">{bantuan.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Jenis Bantuan</p>
                <p className="text-sm font-medium text-gray-900">
                  {typeLabels[bantuan.type] || bantuan.type}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    statusStyles[bantuan.status] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {statusLabels[bantuan.status] || bantuan.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Pemberi Bantuan</p>
                <p className="text-sm font-medium text-gray-900">{bantuan.provider}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                <p className="text-sm font-medium text-gray-900">{bantuan.description}</p>
              </div>
            </div>
          </div>

          {/* Periode & Dana */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Periode & Dana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Mulai</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(bantuan.startDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Berakhir</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(bantuan.endDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              {bantuan.amount && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jumlah Dana</p>
                  <p className="text-sm font-medium text-gray-900">
                    Rp {parseInt(bantuan.amount).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Kontak */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Kontak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Kontak</p>
                <p className="text-sm font-medium text-gray-900">{bantuan.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
                <p className="text-sm font-medium text-gray-900">{bantuan.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">{bantuan.email}</p>
              </div>
            </div>
          </div>

          {/* Kelompok Tani Penerima */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Kelompok Tani Penerima ({targetKelompokTani.length})
            </h2>
            {targetKelompokTani.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targetKelompokTani.map((kt) => (
                  <Link
                    key={kt.id}
                    href={`/kelompok-tani/${kt.id}`}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">{kt.name}</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{kt.kecamatan}</p>
                      <p className="text-xs">{kt.village}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Belum ada kelompok tani penerima</p>
            )}
          </div>

          {/* Catatan */}
          {bantuan.notes && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Catatan Tambahan
              </h2>
              <p className="text-sm text-gray-700">{bantuan.notes}</p>
            </div>
          )}
        </div>

    </div>
  );
}
