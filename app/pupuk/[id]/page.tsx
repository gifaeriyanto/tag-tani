'use client';

import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import {
  Pupuk,
  PUPUK_DISTRIBUTION_LIST,
  PUPUK_LIST,
  PUPUK_STOCK_LIST,
  PUPUK_USAGE_LIST,
} from 'constants/pupuk';

export default function PupukDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const pupuk = PUPUK_LIST.find((p) => p.id === id) as Pupuk | undefined;

  if (!pupuk) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Pupuk tidak ditemukan</p>
        </div>
      </div>
    );
  }

  // Get related data
  const stocks = PUPUK_STOCK_LIST.filter((s) => s.pupukId === id);
  const distributions = PUPUK_DISTRIBUTION_LIST.filter((d) => d.pupukId === id).sort(
    (a, b) => new Date(b.distributionDate).getTime() - new Date(a.distributionDate).getTime()
  );
  const usages = PUPUK_USAGE_LIST.filter((u) => u.pupukId === id).sort(
    (a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
  );

  const totalStock = stocks.reduce((sum, s) => sum + s.quantity, 0);
  const totalDistributed = distributions
    .filter((d) => d.status === 'delivered' || d.status === 'in_transit')
    .reduce((sum, d) => sum + d.quantity, 0);
  const totalUsed = usages.reduce((sum, u) => sum + u.quantity, 0);

  return (
    <div className="p-8">
      {/* Back Button and Header */}
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
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{pupuk.name}</h1>
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  {pupuk.type}
                </span>
              </div>
              <p className="text-gray-600">Kode: {pupuk.code}</p>
            </div>
            <Link
              href={`/pupuk/${id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </Link>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Dasar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                <p className="text-sm font-medium text-gray-900">{pupuk.description}</p>
              </div>
              {pupuk.manufacturer && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Produsen</p>
                  <p className="text-sm font-medium text-gray-900">{pupuk.manufacturer}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-1">Unit Pengukuran</p>
                <p className="text-sm font-medium text-gray-900">{pupuk.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Minimal Stok</p>
                <p className="text-sm font-medium text-gray-900">
                  {pupuk.minStockLevel.toLocaleString()} {pupuk.unit}
                </p>
              </div>
              {pupuk.composition && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Komposisi</p>
                  <p className="text-sm font-medium text-gray-900">{pupuk.composition}</p>
                </div>
              )}
              {pupuk.recommendations && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Rekomendasi Penggunaan</p>
                  <p className="text-sm font-medium text-gray-900">{pupuk.recommendations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stock Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Stok</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Total Stok</p>
                <p className="text-2xl font-bold text-blue-900">
                  {totalStock.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600">{pupuk.unit}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-600 mb-1">Total Terdistribusi</p>
                <p className="text-2xl font-bold text-green-900">
                  {totalDistributed.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">{pupuk.unit}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-sm text-amber-600 mb-1">Total Terpakai</p>
                <p className="text-2xl font-bold text-amber-900">
                  {totalUsed.toLocaleString()}
                </p>
                <p className="text-xs text-amber-600">{pupuk.unit}</p>
              </div>
            </div>
          </div>

          {/* Stock by Kelompok Tani */}
          {stocks.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Stok per Kelompok Tani</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Kelompok Tani</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Kecamatan</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-900">Kuantitas</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Lokasi Gudang</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Terakhir Restok</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => (
                      <tr key={stock.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-medium">{stock.kelompokTaniName}</td>
                        <td className="py-3 px-4 text-gray-600">{stock.kecamatan}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`font-semibold ${
                              stock.quantity < pupuk.minStockLevel
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}
                          >
                            {stock.quantity.toLocaleString()}
                          </span>
                          <span className="text-gray-500"> {stock.unit}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{stock.warehouseLocation}</td>
                        <td className="py-3 px-4 text-gray-600 text-xs">
                          {new Date(stock.lastRestockDate).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recent Distributions */}
          {distributions.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Distribusi Terbaru ({distributions.length})
              </h2>
              <div className="space-y-3">
                {distributions.slice(0, 5).map((dist) => (
                  <div key={dist.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {dist.fromKelompokTaniName || 'Pusat'} → {dist.toKelompokTaniName}
                        {dist.petaniName && ` (${dist.petaniName})`}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {dist.quantity.toLocaleString()} {dist.unit} •{' '}
                        {new Date(dist.distributionDate).toLocaleDateString('id-ID')}
                      </p>
                      {dist.notes && <p className="text-xs text-gray-500 mt-1">{dist.notes}</p>}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                        dist.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : dist.status === 'in_transit'
                            ? 'bg-blue-100 text-blue-800'
                            : dist.status === 'delayed'
                              ? 'bg-red-100 text-red-800'
                              : dist.status === 'planned'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {dist.status === 'delivered'
                        ? 'Diterima'
                        : dist.status === 'in_transit'
                          ? 'Dalam Perjalanan'
                          : dist.status === 'delayed'
                            ? 'Terlambat'
                            : dist.status === 'planned'
                              ? 'Direncanakan'
                              : 'Dibatalkan'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Usage */}
          {usages.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Penggunaan Terbaru ({usages.length})
              </h2>
              <div className="space-y-3">
                {usages.slice(0, 5).map((usage) => (
                  <div key={usage.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {usage.petaniName} - {usage.lahanName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {usage.quantity.toLocaleString()} {usage.unit} ({usage.usagePerHectare} kg/ha) •{' '}
                        {new Date(usage.applicationDate).toLocaleDateString('id-ID')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {usage.kelompokTaniName} • {usage.applicationMethod}
                      </p>
                      {usage.notes && <p className="text-xs text-gray-600 mt-1 italic">{usage.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
