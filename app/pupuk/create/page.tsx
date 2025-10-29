'use client';

import { Header } from 'components/Header';
import { PupukForm } from 'components/PupukForm';
import { Sidebar } from 'components/Sidebar';

export default function PupukCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-[220px] mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Pupuk</h1>
          <p className="text-gray-600">Isi formulir di bawah untuk menambahkan jenis pupuk baru</p>
        </div>

        {/* Form */}
        <PupukForm mode="create" />
      </main>
    </div>
  );
}
