'use client';

import { PupukAnomaly } from 'constants/pupuk';

interface PupukAnomalyCardProps {
  data: PupukAnomaly;
  onStatusChange?: (id: string, status: PupukAnomaly['status']) => void;
}

export function PupukAnomalyCard({ data, onStatusChange }: PupukAnomalyCardProps) {
  const severityConfig = {
    low: { label: 'Rendah', color: 'bg-yellow-100 text-yellow-800' },
    medium: { label: 'Sedang', color: 'bg-orange-100 text-orange-800' },
    high: { label: 'Tinggi', color: 'bg-red-100 text-red-800' },
  };

  const statusConfig = {
    open: {
      icon: '⚠️',
      label: 'Terbuka',
    },
    in_review: {
      icon: '🔄',
      label: 'Dalam Review',
    },
    resolved: {
      icon: '✓',
      label: 'Terselesaikan',
    },
    dismissed: {
      icon: '✕',
      label: 'Ditolak',
    },
  };

  const typeConfig = {
    overstock: 'Stok Berlebih',
    understock: 'Stok Kurang',
    delayed_delivery: 'Pengiriman Terlambat',
    delayed_reporting: 'Laporan Terlambat',
    unusual_consumption: 'Konsumsi Tidak Biasa',
  };

  const severity = severityConfig[data.severity];
  const status = statusConfig[data.status];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side - Type & Severity */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 break-words">{typeConfig[data.type]}</h3>
          <p className="mt-0.5 text-xs text-gray-500 break-words">
            {data.kelompokTaniName} • {data.kecamatan}
          </p>
        </div>

        {/* Middle - Info: Grid on mobile, Flex row on desktop */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-0">
          <div className="md:w-32 md:px-3">
            <p className="text-xs text-gray-500">Terdeteksi</p>
            <p className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {new Date(data.detectedAt).toLocaleDateString('id-ID')}
            </p>
          </div>
          <div className="md:w-36 md:px-3">
            <p className="text-xs text-gray-500">Pupuk</p>
            <p className="text-xs font-medium text-gray-700 break-words">
              {data.pupukName || '-'}
            </p>
          </div>
          <div className="md:w-32 md:px-3">
            <p className="text-xs text-gray-500">Keparahan</p>
            <span className={`text-xs font-medium rounded px-2 py-0.5 inline-block ${severity.color}`}>
              {severity.label}
            </span>
          </div>
        </div>

        {/* Right side - Status & Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 md:flex-shrink-0">
          <span className="text-xs font-medium text-gray-700 basis-full md:basis-auto">
            {status.label}
          </span>
          {onStatusChange && data.status === 'open' && (
            <>
              <button
                onClick={() => onStatusChange(data.id, 'in_review')}
                className="rounded px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                Review
              </button>
              <button
                onClick={() => onStatusChange(data.id, 'dismissed')}
                className="rounded px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Tolak
              </button>
            </>
          )}
          {onStatusChange && data.status === 'in_review' && (
            <button
              onClick={() => onStatusChange(data.id, 'resolved')}
              className="rounded px-2 py-1 text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
