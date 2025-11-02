'use client';

import { ArrowLeftIcon, PencilIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';

export default function KelompokTaniDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const kelompokTani = KELOMPOK_TANI_LIST.find((kt) => kt.id === id);

  if (!kelompokTani) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Kelompok tani tidak ditemukan</p>
            <Link
              href="/kelompok-tani"
              className="text-green-600 hover:text-green-700"
            >
              Kembali ke Daftar
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
                {kelompokTani.name}
              </h1>
              <p className="text-gray-600">{kelompokTani.code}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/kelompok-tani/${id}/anggota`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <UsersIcon className="w-4 h-4" />
                Daftar Petani
              </Link>
              <Link
                href={`/kelompok-tani/${id}/edit`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </Link>
            </div>
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
                <p className="text-sm text-gray-500 mb-1">Nama Kelompok</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kode Kelompok</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.code}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Berdiri</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(kelompokTani.establishmentDate).toLocaleDateString(
                    'id-ID',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    kelompokTani.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {kelompokTani.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lokasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Kecamatan</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.kecamatan}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Desa/Kelurahan</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.village}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Alamat Lengkap</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.address}
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kontak</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Ketua</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.leaderName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Jumlah Anggota</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.memberCount} orang
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Luas Lahan</p>
                <p className="text-sm font-medium text-gray-900">
                  {kelompokTani.landArea} ha
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-2">Komoditi</p>
                <div className="flex flex-wrap gap-2">
                  {kelompokTani.commodities.map((commodity) => (
                    <span
                      key={commodity}
                      className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                    >
                      {commodity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
