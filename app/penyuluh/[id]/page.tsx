'use client';

import Link from 'next/link';
import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
import { PENYULUH_LIST } from 'constants/penyuluh';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';

export default function PenyuluhDetailPage() {
  const params = useParams();
  const router = useRouter();
  const penyuluhId = params.id as string;

  const penyuluh = PENYULUH_LIST.find((p) => p.id === penyuluhId);

  if (!penyuluh) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="ml-[220px] mt-16 p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Penyuluh tidak ditemukan</p>
            <Link href="/penyuluh" className="mt-4 text-green-600 hover:underline">
              Kembali ke daftar penyuluh
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const assignedKelompokTani = KELOMPOK_TANI_LIST.filter((kt) =>
    penyuluh.kelompokTaniAssigned.includes(kt.id)
  );

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {penyuluh.name}
              </h1>
              <p className="text-gray-600">NIP: {penyuluh.nip}</p>
            </div>
            <Link
              href={`/penyuluh/${penyuluh.id}/edit`}
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
                <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">NIP</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.nip}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Alamat Lengkap</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.address}
                </p>
              </div>
            </div>
          </div>

          {/* Work Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Pekerjaan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Keahlian</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.specialization}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Wilayah Kerja</p>
                <p className="text-sm font-medium text-gray-900">
                  {penyuluh.workArea}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Mulai</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(penyuluh.startDate).toLocaleDateString(
                    'id-ID',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    penyuluh.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {penyuluh.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
            </div>
          </div>

          {/* Kelompok Tani yang Dibimbing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Kelompok Tani yang Dibimbing ({assignedKelompokTani.length})
            </h2>
            {assignedKelompokTani.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedKelompokTani.map((kt) => (
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
              <p className="text-gray-500">Belum ada kelompok tani yang dibimbing</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
