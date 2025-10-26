'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Komoditi } from 'constants/komoditi';
import { CATEGORY_OPTIONS, WATER_REQUIREMENT_OPTIONS } from 'constants/komoditi';

interface KomoditiFormProps {
  initialData?: Komoditi;
  mode: 'create' | 'edit';
}

export function KomoditiForm({ initialData, mode }: KomoditiFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    plantingPeriod: initialData?.plantingPeriod || '',
    harvestPeriod: initialData?.harvestPeriod || '',
    estimatedYield: initialData?.estimatedYield || '',
    waterRequirement: initialData?.waterRequirement || '',
    optimalTemperature: initialData?.optimalTemperature || '',
    relatedLahanCount: initialData?.relatedLahanCount || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'estimatedYield' || name === 'relatedLahanCount' ? (value ? parseFloat(value) : '') : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save data
    console.log('Form submitted:', formData);
    // Navigate back to list page
    router.push('/komoditi');
  };

  const handleCancel = () => {
    router.push('/komoditi');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Dasar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Komoditi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Contoh: Padi Sawah"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Kode Komoditi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="Contoh: PDI-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih kategori</option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="waterRequirement" className="block text-sm font-medium text-gray-700 mb-1">
              Kebutuhan Air <span className="text-red-500">*</span>
            </label>
            <select
              id="waterRequirement"
              name="waterRequirement"
              value={formData.waterRequirement}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih kebutuhan air</option>
              {WATER_REQUIREMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Masukkan deskripsi komoditi"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* Growing Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Penanaman
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plantingPeriod" className="block text-sm font-medium text-gray-700 mb-1">
              Periode Tanam <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="plantingPeriod"
              name="plantingPeriod"
              value={formData.plantingPeriod}
              onChange={handleInputChange}
              placeholder="Contoh: Oktober - Desember"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="harvestPeriod" className="block text-sm font-medium text-gray-700 mb-1">
              Periode Panen <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="harvestPeriod"
              name="harvestPeriod"
              value={formData.harvestPeriod}
              onChange={handleInputChange}
              placeholder="Contoh: Januari - Maret"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="estimatedYield" className="block text-sm font-medium text-gray-700 mb-1">
              Hasil Panen Estimasi (ton/hektar) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="estimatedYield"
              name="estimatedYield"
              value={formData.estimatedYield}
              onChange={handleInputChange}
              placeholder="Contoh: 6.5"
              step="0.1"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="optimalTemperature" className="block text-sm font-medium text-gray-700 mb-1">
              Suhu Optimal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="optimalTemperature"
              name="optimalTemperature"
              value={formData.optimalTemperature}
              onChange={handleInputChange}
              placeholder="Contoh: 25-30°C"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Tambahan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="relatedLahanCount" className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Lahan Terkait
            </label>
            <input
              type="number"
              id="relatedLahanCount"
              name="relatedLahanCount"
              value={formData.relatedLahanCount}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Diperbarui otomatis dari data lahan</p>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {mode === 'create' ? 'Tambah Komoditi' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
