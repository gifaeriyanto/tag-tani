'use client';

import { CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';
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
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Type & Severity */}
        <div className="w-48 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900">{typeConfig[data.type]}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {data.kelompokTaniName} • {data.kecamatan}
          </p>
        </div>

        {/* Middle - Info */}
        <div className="flex flex-1 items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Terdeteksi:</span>
            <span className="text-xs font-medium text-gray-700">
              {new Date(data.detectedAt).toLocaleDateString('id-ID')}
            </span>
          </div>
          {data.pupukName && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Pupuk:</span>
              <span className="text-xs font-medium text-gray-700">{data.pupukName}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Keparahan:</span>
            <span className={`text-xs font-medium rounded px-2 py-0.5 ${severity.color}`}>
              {severity.label}
            </span>
          </div>
        </div>

        {/* Right side - Status & Actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <span className="text-xs font-medium text-gray-700">
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
