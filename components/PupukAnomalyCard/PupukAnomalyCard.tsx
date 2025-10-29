'use client';

import { AlertTriangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';
import { PupukAnomaly } from 'constants/pupuk';

interface PupukAnomalyCardProps {
  data: PupukAnomaly;
  onStatusChange?: (id: string, status: PupukAnomaly['status']) => void;
}

export function PupukAnomalyCard({ data, onStatusChange }: PupukAnomalyCardProps) {
  const severityConfig = {
    low: {
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800',
      bgColor: 'bg-yellow-100',
      badge: 'Rendah',
    },
    medium: {
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-800',
      bgColor: 'bg-orange-100',
      badge: 'Sedang',
    },
    high: {
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      bgColor: 'bg-red-100',
      badge: 'Tinggi',
    },
  };

  const statusConfig = {
    open: {
      icon: AlertTriangleIcon,
      label: 'Terbuka',
      color: 'text-red-600',
    },
    in_review: {
      icon: ClockIcon,
      label: 'Dalam Review',
      color: 'text-blue-600',
    },
    resolved: {
      icon: CheckCircleIcon,
      label: 'Terselesaikan',
      color: 'text-green-600',
    },
    dismissed: {
      icon: XCircleIcon,
      label: 'Ditolak',
      color: 'text-gray-600',
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
  const StatusIcon = status.icon;

  return (
    <div className={`rounded-xl border ${severity.color} p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Header with severity and type */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${severity.bgColor}`}>
              <AlertTriangleIcon className={`w-5 h-5 ${severity.textColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">{typeConfig[data.type]}</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${severity.bgColor} ${severity.textColor}`}>
                  {severity.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {data.kelompokTaniName} • {data.kecamatan}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-3">{data.description}</p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-600">Terdeteksi</p>
              <p className="font-medium text-gray-900">
                {new Date(data.detectedAt).toLocaleDateString('id-ID')}
              </p>
            </div>
            {data.pupukName && (
              <div>
                <p className="text-gray-600">Pupuk</p>
                <p className="font-medium text-gray-900 truncate">{data.pupukName}</p>
              </div>
            )}
            {data.resolvedAt && (
              <div>
                <p className="text-gray-600">Terselesaikan</p>
                <p className="font-medium text-gray-900">
                  {new Date(data.resolvedAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
          </div>

          {/* Recommendation */}
          {data.recommendation && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-medium text-blue-900 mb-1">💡 Rekomendasi:</p>
              <p className="text-xs text-blue-800">{data.recommendation}</p>
            </div>
          )}
        </div>

        {/* Right Side - Status and Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${severity.bgColor}`}>
            <StatusIcon className={`w-4 h-4 ${status.color}`} />
            <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
          </div>

          {/* Quick Actions */}
          {data.status === 'open' && (
            <div className="flex gap-2">
              {onStatusChange && (
                <>
                  <button
                    onClick={() => onStatusChange(data.id, 'in_review')}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => onStatusChange(data.id, 'dismissed')}
                    className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Tolak
                  </button>
                </>
              )}
            </div>
          )}
          {data.status === 'in_review' && onStatusChange && (
            <button
              onClick={() => onStatusChange(data.id, 'resolved')}
              className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Tandai Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
