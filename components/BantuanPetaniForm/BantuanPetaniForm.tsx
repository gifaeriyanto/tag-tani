'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { BantuanPetani } from 'constants/bantuanPetani';
import {
  BANTUAN_TYPE_OPTIONS,
  PROVIDER_OPTIONS,
  STATUS_OPTIONS,
} from 'constants/bantuanPetani';
import { KELOMPOK_TANI_LIST } from 'constants/kelompokTani';

interface BantuanPetaniFormProps {
  initialData?: BantuanPetani;
  mode: 'create' | 'edit';
}

export function BantuanPetaniForm({ initialData, mode }: BantuanPetaniFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: (initialData?.type || 'subsidy') as BantuanPetani['type'],
    provider: initialData?.provider || '',
    targetKelompokTani: initialData?.targetKelompokTani || [],
    amount: initialData?.amount || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    status: (initialData?.status || 'active') as 'active' | 'completed' | 'cancelled',
    contact: initialData?.contact || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    notes: initialData?.notes || '',
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
      targetKelompokTani: checked
        ? [...prev.targetKelompokTani, id]
        : prev.targetKelompokTani.filter((kt) => kt !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save data
    console.log('Form submitted:', formData);
    // Navigate back to list page
    router.push('/bantuan-petani');
  };

  const handleCancel = () => {
    router.push('/bantuan-petani');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Dasar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Judul Bantuan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukkan judul bantuan"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
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
              placeholder="Masukkan deskripsi lengkap bantuan"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Bantuan <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {BANTUAN_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
              Pemberi Bantuan <span className="text-red-500">*</span>
            </label>
            <select
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih pemberi bantuan</option>
              {PROVIDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Periode & Status Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Periode & Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Berakhir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
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

          {formData.type === 'subsidy' && (
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Dana (Rp)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Masukkan jumlah dana"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Kontak
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kontak <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Nama orang yang dapat dihubungi"
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
        </div>
      </div>

      {/* Target Kelompok Tani Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Kelompok Tani Penerima Bantuan
        </h3>
        <div className="space-y-3">
          {KELOMPOK_TANI_LIST.map((kt) => (
            <label key={kt.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.targetKelompokTani.includes(kt.id)}
                onChange={(e) => handleKelompokTaniChange(kt.id, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">{kt.name}</span>
                <span className="text-xs text-gray-500 ml-2">({kt.village})</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Catatan Tambahan
        </h3>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Catatan
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Masukkan catatan atau informasi tambahan"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
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
          {mode === 'create' ? 'Tambah Bantuan' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
