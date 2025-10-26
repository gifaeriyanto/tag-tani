'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { COMMODITIES } from 'constants/kelompokTani';
import type { Lahan } from 'constants/lahan';
import { PETANI_LIST } from 'constants/petani';

interface LahanFormProps {
  mode: 'create' | 'edit';
  initialData?: Lahan;
  kelompokTaniId: string;
  coordinates: [number, number][];
  area: number;
}

export function LahanForm({
  mode,
  initialData,
  kelompokTaniId,
  coordinates,
  area,
}: LahanFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    petaniId: initialData?.petaniId || '',
    commodities: initialData?.commodities || [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter petani by kelompok tani
  const availablePetani = PETANI_LIST.filter(
    (p) => p.kelompokTaniId === kelompokTaniId
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommodityToggle = (commodity: string) => {
    setFormData((prev) => ({
      ...prev,
      commodities: prev.commodities.includes(commodity)
        ? prev.commodities.filter((c) => c !== commodity)
        : [...prev.commodities, commodity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Nama lahan harus diisi');
      return;
    }

    if (coordinates.length < 3) {
      alert('Silakan gambar polygon lahan terlebih dahulu');
      return;
    }

    if (formData.commodities.length === 0) {
      alert('Pilih minimal satu komoditi');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call
      const data = {
        ...formData,
        kelompokTaniId,
        coordinates,
        area,
      };

      console.log(`${mode} lahan:`, data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      alert(`Lahan berhasil ${mode === 'create' ? 'ditambahkan' : 'diperbarui'}`);
      router.push('/lahan');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        'Apakah Anda yakin ingin membatalkan? Perubahan yang belum disimpan akan hilang.'
      )
    ) {
      router.push('/lahan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Lahan
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lahan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: Sawah Timur A"
            />
          </div>

          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Luas Lahan (ha)
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={area > 0 ? area.toFixed(2) : '-'}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Luas otomatis dihitung dari polygon yang digambar
            </p>
          </div>
        </div>
      </div>

      {/* Owner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pemilik</h3>
        <div>
          <label
            htmlFor="petaniId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pilih Petani
          </label>
          <select
            id="petaniId"
            name="petaniId"
            value={formData.petaniId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">-- Pilih Petani --</option>
            {availablePetani.map((petani) => (
              <option key={petani.id} value={petani.id}>
                {petani.name} - {petani.nik}
              </option>
            ))}
          </select>
          {availablePetani.length === 0 && (
            <p className="mt-1 text-xs text-red-500">
              Belum ada petani terdaftar untuk kelompok tani ini
            </p>
          )}
        </div>
      </div>

      {/* Commodities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Komoditi <span className="text-red-500">*</span>
        </h3>
        <div className="space-y-2">
          {COMMODITIES.map((commodity) => (
            <label
              key={commodity}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.commodities.includes(commodity)}
                onChange={() => handleCommodityToggle(commodity)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{commodity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting || coordinates.length < 3}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Menyimpan...'
            : mode === 'create'
              ? 'Simpan'
              : 'Perbarui'}
        </button>
      </div>
    </form>
  );
}
