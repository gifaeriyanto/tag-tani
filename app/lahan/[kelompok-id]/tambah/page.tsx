"use client"

import { SaveIcon, XIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { LahanDrawMap } from "components/LahanDrawMap"
import { LahanForm } from "components/LahanForm"
import { KELOMPOK_TANI_LIST } from "constants/kelompokTani"
import { calculatePolygonArea } from "constants/lahan"

export default function TambahLahanPage() {
  const params = useParams()
  const router = useRouter()
  const kelompokTaniId = params["kelompok-id"] as string

  const kelompokTani = KELOMPOK_TANI_LIST.find((kt) => kt.id === kelompokTaniId)
  const [coordinates, setCoordinates] = useState<[number, number][]>([])
  const [showForm, setShowForm] = useState(false)

  const area = coordinates.length >= 3 ? calculatePolygonArea(coordinates) : 0

  const handleCoordinatesChange = (coords: [number, number][]) => {
    setCoordinates(coords)
    // Automatically show form when polygon is completed
    if (coords.length >= 3) {
      setTimeout(() => setShowForm(true), 300)
    }
  }

  if (!kelompokTani) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-gray-500">Kelompok tani tidak ditemukan</p>
          <button onClick={() => router.push("/lahan")} className="text-green-600 hover:text-green-700">
            Kembali ke Lahan
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      {/* Header Bar */}
      <div className="shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tambah Lahan - {kelompokTani.name}</h1>
              <p className="mt-0.5 text-sm text-gray-600">Gambar polygon lahan pada peta, lalu isi detail lahan</p>
            </div>
            <button
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin keluar? Perubahan yang belum disimpan akan hilang.")) {
                  router.push("/lahan")
                }
              }}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              title="Tutup"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 overflow-hidden">
        <LahanDrawMap onCoordinatesChange={handleCoordinatesChange} initialCoordinates={coordinates} />

        {/* Show Form Button (when form is hidden) */}
        {!showForm && coordinates.length >= 3 && (
          <button
            onClick={() => setShowForm(true)}
            className="absolute right-4 bottom-32 z-[1001] flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white shadow-lg hover:bg-green-700"
          >
            <SaveIcon className="h-5 w-5" />
            Isi Detail Lahan
          </button>
        )}
      </div>

      {/* Floating Form */}
      {showForm && coordinates.length >= 3 && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            {/* Form Card */}
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="flex-shrink-0 rounded-t-2xl border-b border-gray-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Detail Lahan</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Polygon berhasil digambar! Luas:{" "}
                      <span className="font-semibold text-green-600">{area.toFixed(2)} ha</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    title="Tutup"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Form Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <LahanForm mode="create" kelompokTaniId={kelompokTaniId} coordinates={coordinates} area={area} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
