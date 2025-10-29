'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Pupuk,
  PUPUK_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from 'constants/pupuk';

interface PupukFormProps {
  mode: 'create' | 'edit';
  initialData?: Pupuk;
}

export function PupukForm({ mode, initialData }: PupukFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Pupuk>>(
    initialData || {
      name: '',
      code: '',
      type: 'NPK',
      description: '',
      manufacturer: '',
      unit: 'karung',
      minStockLevel: 100,
      composition: '',
      recommendations: '',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'minStockLevel' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save
    console.log('Submitting form:', formData);
    router.push('/pupuk');
  };

  const handleCancel = () => {
    if (mode === 'edit' && initialData?.id) {
      router.push(`/pupuk/${initialData.id}`);
    } else {
      router.push('/pupuk');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Dasar</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pupuk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              placeholder="Pupuk NPK 16:16:16"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Code */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Kode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code || ''}
              onChange={handleChange}
              required
              placeholder="NPK-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Pupuk <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {PUPUK_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Pengukuran <span className="text-red-500">*</span>
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {UNIT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Stock Level */}
          <div>
            <label htmlFor="minStockLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Minimal Stok (Alert) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="minStockLevel"
              name="minStockLevel"
              value={formData.minStockLevel || 0}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Manufacturer */}
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
              Produsen / Pabrik
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer || ''}
              onChange={handleChange}
              placeholder="PT Pupuk Sriwidjaja"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Jelaskan tentang pupuk ini..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Composition */}
        <div className="mt-6">
          <label htmlFor="composition" className="block text-sm font-medium text-gray-700 mb-1">
            Komposisi Nutrisi
          </label>
          <input
            type="text"
            id="composition"
            name="composition"
            value={formData.composition || ''}
            onChange={handleChange}
            placeholder="NPK 16:16:16, P₂O₅ 36%"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Contoh: NPK 16:16:16 atau N 46% atau P₂O₅ 36%
          </p>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <label htmlFor="recommendations" className="block text-sm font-medium text-gray-700 mb-1">
            Rekomendasi Penggunaan
          </label>
          <textarea
            id="recommendations"
            name="recommendations"
            value={formData.recommendations || ''}
            onChange={handleChange}
            rows={2}
            placeholder="Contoh: 300-400 kg/ha untuk padi, 200-300 kg/ha untuk sayuran"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Action Buttons */}
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
          {mode === 'create' ? 'Tambah Pupuk' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
