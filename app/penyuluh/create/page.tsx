'use client';

import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
import { PenyuluhForm } from 'components/PenyuluhForm';

export default function CreatePenyuluhPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Penyuluh
          </h1>
          <p className="text-gray-600">
            Isi formulir di bawah untuk menambah penyuluh baru
          </p>
        </div>

        {/* Form */}
        <PenyuluhForm mode="create" />
      </main>
    </div>
  );
}
