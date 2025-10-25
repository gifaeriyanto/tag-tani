'use client';

import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
import { KelompokTaniForm } from 'components/KelompokTaniForm';

export default function CreateKelompokTaniPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Kelompok Tani
          </h1>
          <p className="text-gray-600">
            Isi formulir di bawah untuk menambah kelompok tani baru
          </p>
        </div>

        {/* Form */}
        <KelompokTaniForm mode="create" />
      </main>
    </div>
  );
}
