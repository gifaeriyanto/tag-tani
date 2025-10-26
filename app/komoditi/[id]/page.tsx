'use client';

import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { KOMODITI_LIST } from 'constants/komoditi';

export default function KomoditiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const komoditiId = params.id as string;

  const komoditi = KOMODITI_LIST.find((k) => k.id === komoditiId);

  if (!komoditi) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="ml-[220px] mt-16 p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Komoditi tidak ditemukan</p>
            <Link href="/komoditi" className="mt-4 text-green-600 hover:underline">
              Kembali ke daftar komoditi
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
                {komoditi.name}
              </h1>
              <p className="text-gray-600">Kode: {komoditi.code}</p>
            </div>
            <Link
              href={`/komoditi/${komoditi.id}/edit`}
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
                <p className="text-sm text-gray-500 mb-1">Nama Komoditi</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kode</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.code}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kategori</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.category}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kebutuhan Air</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.waterRequirement}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.description}
                </p>
              </div>
            </div>
          </div>

          {/* Growing Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Penanaman
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Periode Tanam</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.plantingPeriod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Periode Panen</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.harvestPeriod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Hasil Panen Estimasi</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.estimatedYield} ton/hektar
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Suhu Optimal</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.optimalTemperature}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Tambahan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Lahan Terkait</p>
                <p className="text-sm font-medium text-gray-900">
                  {komoditi.relatedLahanCount} lahan
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Terakhir Diperbarui</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(komoditi.updatedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
