'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Penyuluh } from 'constants/penyuluh';
import { SPECIALIZATION_OPTIONS, STATUS_OPTIONS } from 'constants/penyuluh';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';

interface PenyuluhFormProps {
  initialData?: Penyuluh;
  mode: 'create' | 'edit';
}

export function PenyuluhForm({ initialData, mode }: PenyuluhFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    nip: initialData?.nip || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    specialization: initialData?.specialization || '',
    workArea: initialData?.workArea || '',
    kelompokTaniAssigned: initialData?.kelompokTaniAssigned || [],
    startDate: initialData?.startDate || '',
    status: (initialData?.status || 'active') as 'active' | 'inactive',
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

  const handleKelompokTaniChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      kelompokTaniAssigned: checked
        ? [...prev.kelompokTaniAssigned, id]
        : prev.kelompokTaniAssigned.filter((kt) => kt !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save data
    console.log('Form submitted:', formData);
    // Navigate back to list page
    router.push('/penyuluh');
  };

  const handleCancel = () => {
    router.push('/penyuluh');
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
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Induk Pegawai (NIP) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nip"
              name="nip"
              value={formData.nip}
              onChange={handleInputChange}
              placeholder="Masukkan NIP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
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
              placeholder="Masukkan nomor telepon"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Alamat <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Masukkan alamat lengkap"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* Work Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Pekerjaan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
              Keahlian <span className="text-red-500">*</span>
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih keahlian</option>
              {SPECIALIZATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="workArea" className="block text-sm font-medium text-gray-700 mb-1">
              Wilayah Kerja <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="workArea"
              name="workArea"
              value={formData.workArea}
              onChange={handleInputChange}
              placeholder="Contoh: Kecamatan Malangkasa"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kelompok Tani Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Kelompok Tani yang Dibimbing
        </h3>
        <div className="space-y-3">
          {KELOMPOK_TANI_LIST.map((kt) => (
            <label key={kt.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.kelompokTaniAssigned.includes(kt.id)}
                onChange={(e) => handleKelompokTaniChange(kt.id, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">{kt.name}</span>
              <span className="text-xs text-gray-500">({kt.village})</span>
            </label>
          ))}
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
          {mode === 'create' ? 'Tambah Penyuluh' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
