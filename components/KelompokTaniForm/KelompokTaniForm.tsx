'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { KelompokTani } from 'constants/kelompokTani';
import { COMMODITIES, WAJO_KECAMATAN } from 'constants/kelompokTani';

interface KelompokTaniFormProps {
  initialData?: KelompokTani;
  mode: 'create' | 'edit';
}

export function KelompokTaniForm({ initialData, mode }: KelompokTaniFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    kecamatan: initialData?.kecamatan || '',
    village: initialData?.village || '',
    address: initialData?.address || '',
    leaderName: initialData?.leaderName || '',
    phone: initialData?.phone || '',
    commodities: initialData?.commodities || [],
    establishmentDate: initialData?.establishmentDate || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommodityToggle = (commodity: string) => {
    setFormData((prev) => ({
      ...prev,
      commodities: prev.commodities.includes(commodity)
        ? prev.commodities.filter((c) => c !== commodity)
        : [...prev.commodities, commodity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save data
    console.log('Form submitted:', formData);
    // Navigate back to list page
    router.push('/kelompok-tani');
  };

  const handleCancel = () => {
    router.push('/kelompok-tani');
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
              Nama Kelompok <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: Tani Makmur"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Kode Kelompok <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: KT-001"
            />
          </div>
          <div>
            <label htmlFor="establishmentDate" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Berdiri <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="establishmentDate"
              name="establishmentDate"
              value={formData.establishmentDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lokasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700 mb-1">
              Kecamatan <span className="text-red-500">*</span>
            </label>
            <select
              id="kecamatan"
              name="kecamatan"
              value={formData.kecamatan}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Pilih Kecamatan</option>
              {WAJO_KECAMATAN.map((kec) => (
                <option key={kec} value={kec}>
                  {kec}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
              Desa/Kelurahan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: Lagosi"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: Jl. Poros Makassar-Bone Km 12"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontak</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Ketua <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="leaderName"
              name="leaderName"
              value={formData.leaderName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: Ahmad Syahrir"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Contoh: 081234567890"
            />
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Komoditi</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Komoditi <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {COMMODITIES.map((commodity) => (
              <label
                key={commodity}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
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
          {mode === 'create' ? 'Tambah Kelompok' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
