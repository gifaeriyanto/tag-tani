'use client';

import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { PETANI_LIST } from 'constants/petani';

export default function PetaniDetailPage() {
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {petani.name}
              </h1>
              <p className="text-gray-600">NIK: {petani.nik}</p>
            </div>
            <Link
              href={`/kelompok-tani/${kelompokTaniId}/anggota/${petaniId}/edit`}
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
                  {petani.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">NIK</p>
                <p className="text-sm font-medium text-gray-900">
                  {petani.nik}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Lahir</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(petani.dateOfBirth).toLocaleDateString(
                    'id-ID',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Jenis Kelamin</p>
                <p className="text-sm font-medium text-gray-900">
                  {petani.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    petani.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {petani.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kontak</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nomor Telepon</p>
                <p className="text-sm font-medium text-gray-900">
                  {petani.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Alamat Lengkap</p>
                <p className="text-sm font-medium text-gray-900">
                  {petani.address}
                </p>
              </div>
            </div>
          </div>

          {/* Kelompok Tani */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Kelompok Tani
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Kelompok</p>
                <p className="text-sm font-medium text-gray-900">
                  {petani.kelompokTaniName}
                </p>
              </div>
            </div>
          </div>

          {/* Land Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Lahan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Luas Lahan</p>
                <p className="text-sm font-medium text-gray-900">
                  {petani.landArea} ha
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
