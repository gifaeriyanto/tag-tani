"use client"

import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import type { KelompokTani } from "constants/kelompokTani"

interface KelompokTaniCardProps {
  data: KelompokTani
  onDelete?: (id: string) => void
}

export function KelompokTaniCard({ data, onDelete }: KelompokTaniCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Name & Code */}
        <div className="w-64 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900">{data.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">{data.code}</p>
        </div>

        {/* Middle - Info */}
        <div className="flex flex-1 items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Kecamatan:</span>
            <span className="text-xs font-medium text-gray-700">{data.kecamatan}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Anggota:</span>
            <span className="text-xs font-medium text-gray-700">{data.memberCount} orang</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Luas Lahan:</span>
            <span className="text-xs font-medium text-gray-700">{data.landArea} ha</span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href={`/kelompok-tani/${data.id}`}
            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
            title="Lihat Detail"
          >
            <EyeIcon className="h-4 w-4" />
          </Link>
          <Link
            href={`/kelompok-tani/${data.id}/edit`}
            className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
            title="Hapus"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
