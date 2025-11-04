"use client"

import { PupukAnomaly } from "constants/pupuk"

interface PupukAnomalyCardProps {
  data: PupukAnomaly
  onStatusChange?: (id: string, status: PupukAnomaly["status"]) => void
}

export function PupukAnomalyCard({ data, onStatusChange }: PupukAnomalyCardProps) {
  const severityConfig = {
    low: { label: "Rendah", color: "bg-yellow-100 text-yellow-800" },
    medium: { label: "Sedang", color: "bg-orange-100 text-orange-800" },
    high: { label: "Tinggi", color: "bg-red-100 text-red-800" },
  }

  const statusConfig = {
    open: {
      icon: "⚠️",
      label: "Terbuka",
    },
    in_review: {
      icon: "🔄",
      label: "Dalam Review",
    },
    resolved: {
      icon: "✓",
      label: "Terselesaikan",
    },
    dismissed: {
      icon: "✕",
      label: "Ditolak",
    },
  }

  const typeConfig = {
    overstock: "Stok Berlebih",
    understock: "Stok Kurang",
    delayed_delivery: "Pengiriman Terlambat",
    delayed_reporting: "Laporan Terlambat",
    unusual_consumption: "Konsumsi Tidak Biasa",
  }

  const severity = severityConfig[data.severity]
  const status = statusConfig[data.status]

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left side - Type & Severity */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold wrap-break-word text-gray-900">{typeConfig[data.type]}</h3>
          <p className="mt-0.5 text-xs wrap-break-word text-gray-500">
            {data.kelompokTaniName} • {data.kecamatan}
          </p>
        </div>

        {/* Middle - Info: Grid on mobile, Flex row on desktop */}
        <div className="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-0">
          <div className="md:w-[120px] md:shrink-0 md:px-2">
            <p className="text-xs text-gray-500">Terdeteksi</p>
            <p className="text-xs font-medium whitespace-nowrap text-gray-700">
              {new Date(data.detectedAt).toLocaleDateString("id-ID")}
            </p>
          </div>
          <div className="md:w-[150px] md:shrink-0 md:px-2">
            <p className="text-xs text-gray-500">Pupuk</p>
            <p className="truncate text-xs font-medium text-gray-700">{data.pupukName || "-"}</p>
          </div>
          <div className="md:w-[110px] md:shrink-0 md:px-2">
            <p className="text-xs text-gray-500">Keparahan</p>
            <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${severity.color}`}>
              {severity.label}
            </span>
          </div>
        </div>

        {/* Right side - Status & Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 md:w-[170px] md:shrink-0">
          <span className="basis-full text-xs font-medium text-gray-700 md:basis-auto">{status.label}</span>
          {onStatusChange && data.status === "open" && (
            <>
              <button
                onClick={() => onStatusChange(data.id, "in_review")}
                className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200"
              >
                Review
              </button>
              <button
                onClick={() => onStatusChange(data.id, "dismissed")}
                className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-300"
              >
                Tolak
              </button>
            </>
          )}
          {onStatusChange && data.status === "in_review" && (
            <button
              onClick={() => onStatusChange(data.id, "resolved")}
              className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
