'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SaveIcon, XIcon } from 'lucide-react';
import { LahanDrawMap } from 'components/LahanDrawMap';
import { LahanForm } from 'components/LahanForm';
import { calculatePolygonArea, LAHAN_LIST } from 'constants/lahan';

export default function EditLahanPage() {
  const params = useParams();
  const router = useRouter();
  const kelompokTaniId = params['kelompok-id'] as string;
  const lahanId = params['lahan-id'] as string;

  const lahan = LAHAN_LIST.find((l) => l.id === lahanId);
  const [coordinates, setCoordinates] = useState<[number, number][]>(
    lahan?.coordinates || []
  );
  const [showForm, setShowForm] = useState(true);

  const area = coordinates.length >= 3 ? calculatePolygonArea(coordinates) : 0;

  const handleCoordinatesChange = (coords: [number, number][]) => {
    setCoordinates(coords);
  };

  if (!lahan) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Lahan tidak ditemukan</p>
          <button
            onClick={() => router.push('/lahan')}
            className="text-green-600 hover:text-green-700"
          >
            Kembali ke Lahan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Full-screen Map */}
      <LahanDrawMap
        onCoordinatesChange={handleCoordinatesChange}
        initialCoordinates={coordinates}
      />

      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-[1001] bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Edit Lahan - {lahan.name}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {lahan.kelompokTaniName}
              </p>
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    'Apakah Anda yakin ingin keluar? Perubahan yang belum disimpan akan hilang.'
                  )
                ) {
                  router.push(`/lahan/${kelompokTaniId}/${lahanId}`);
                }
              }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tutup"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Form */}
      {showForm && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Edit Detail Lahan
                    </h2>
                    {coordinates.length >= 3 && (
                      <p className="text-sm text-gray-600 mt-1">
                        Luas: <span className="font-semibold text-green-600">{area.toFixed(2)} ha</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Tutup"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form Content - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <LahanForm
                  mode="edit"
                  initialData={lahan}
                  kelompokTaniId={kelompokTaniId}
                  coordinates={coordinates}
                  area={area}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Show Form Button (when form is hidden) */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="absolute bottom-24 right-4 z-[1001] bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 font-medium"
        >
          <SaveIcon className="w-5 h-5" />
          Tampilkan Form
        </button>
      )}
    </div>
  );
}
