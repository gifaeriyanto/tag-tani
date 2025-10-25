"use client"

import { Header } from "components/Header"
import { PetaniForm } from "components/PetaniForm"
import { Sidebar } from "components/Sidebar"

export default function CreatePetaniPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="mt-16 ml-[220px] p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Tambah Petani</h1>
          <p className="text-gray-600">Isi formulir di bawah untuk menambah petani baru</p>
        </div>

        {/* Form */}
        <PetaniForm mode="create" />
      </main>
    </div>
  )
}
