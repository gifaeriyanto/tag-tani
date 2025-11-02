'use client';

import { EyeIcon, MapIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { LahanMap } from 'components/LahanMap';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';
import { getKelompokColor, LAHAN_LIST } from 'constants/lahan';

export default function LahanPage() {
  const [lahanList, setLahanList] = useState(LAHAN_LIST);
  const [selectedLahanId, setSelectedLahanId] = useState<string | undefined>();
  const [expandedKelompok, setExpandedKelompok] = useState<string[]>([]);
  const [showKelompokDropdown, setShowKelompokDropdown] = useState(false);

  // Group lahan by kelompok tani
  const groupedLahan = KELOMPOK_TANI_LIST.map((kelompok) => {
    const lands = lahanList.filter((l) => l.kelompokTaniId === kelompok.id);
    const totalArea = lands.reduce((sum, l) => sum + l.area, 0);
    return {
      kelompok,
      lands,
      totalArea,
    };
  }).filter((group) => group.lands.length > 0);

  const toggleKelompok = (kelompokId: string) => {
    setExpandedKelompok((prev) =>
      prev.includes(kelompokId)
        ? prev.filter((id) => id !== kelompokId)
        : [...prev, kelompokId]
    );
  };

  const handleDelete = (lahanId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus lahan ini?')) {
      setLahanList((prev) => prev.filter((l) => l.id !== lahanId));
      console.log('Deleted lahan with id:', lahanId);
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Lahan</h1>
              <p className="text-gray-600">
                Kelola data lahan pertanian berdasarkan kelompok tani
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowKelompokDropdown(!showKelompokDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Tambah Lahan
              </button>
              {showKelompokDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowKelompokDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                        Pilih Kelompok Tani
                      </p>
                      {KELOMPOK_TANI_LIST.map((kelompok) => (
                        <Link
                          key={kelompok.id}
                          href={`/lahan/${kelompok.id}/tambah`}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                          onClick={() => setShowKelompokDropdown(false)}
                        >
                          {kelompok.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapIcon className="w-5 h-5" />
                Peta Lahan
              </h2>
              {/* Legend */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-gray-600 font-medium">Legenda:</span>
                {groupedLahan.map(({ kelompok }) => (
                  <div key={kelompok.id} className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: getKelompokColor(kelompok.id) }}
                    ></div>
                    <span className="text-gray-700">{kelompok.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <LahanMap
              lahanList={lahanList}
              selectedLahanId={selectedLahanId}
              onPolygonClick={setSelectedLahanId}
              height="500px"
            />
          </div>
        </div>

        {/* Grouped List */}
        <div className="space-y-4">
          {groupedLahan.length > 0 ? (
            groupedLahan.map(({ kelompok, lands, totalArea }) => {
              const isExpanded = expandedKelompok.includes(kelompok.id);
              const color = getKelompokColor(kelompok.id);

              return (
                <div
                  key={kelompok.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Kelompok Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleKelompok(kelompok.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                        ></div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {kelompok.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {lands.length} lahan • Total {totalArea.toFixed(2)} ha
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/lahan/${kelompok.id}/tambah`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <PlusIcon className="w-4 h-4" />
                          Tambah Lahan
                        </Link>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Lahan List */}
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      {lands.map((lahan) => (
                        <div
                          key={lahan.id}
                          className={`p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                            selectedLahanId === lahan.id ? 'bg-green-50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            {/* Land Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-sm font-semibold text-gray-900">
                                  {lahan.name}
                                </h4>
                                <span className="text-xs text-gray-500">
                                  {lahan.area} ha
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                {lahan.petaniName && (
                                  <div>
                                    <span className="font-medium">Pemilik:</span>{' '}
                                    {lahan.petaniName}
                                  </div>
                                )}
                                <div>
                                  <span className="font-medium">Komoditi:</span>{' '}
                                  {lahan.commodities.join(', ')}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/lahan/${kelompok.id}/${lahan.id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Lihat Detail"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/lahan/${kelompok.id}/${lahan.id}/edit`}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(lahan.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 mb-4">Belum ada data lahan</p>
              <Link
                href="/kelompok-tani"
                className="text-green-600 hover:text-green-700"
              >
                Lihat Kelompok Tani
              </Link>
            </div>
          )}
        </div>
    </div>
  );
}
