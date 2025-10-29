'use client';

import { AlertCircleIcon, CheckCircleIcon, ClockIcon, TruckIcon } from 'lucide-react';
import { PupukDistribution } from 'constants/pupuk';

interface PupukDistributionCardProps {
  data: PupukDistribution;
}

export function PupukDistributionCard({ data }: PupukDistributionCardProps) {
  const statusConfig = {
    delivered: {
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      bgColor: 'bg-green-100',
      icon: CheckCircleIcon,
      label: 'Diterima',
    },
    in_transit: {
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      bgColor: 'bg-blue-100',
      icon: TruckIcon,
      label: 'Dalam Perjalanan',
    },
    delayed: {
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      bgColor: 'bg-red-100',
      icon: AlertCircleIcon,
      label: 'Terlambat',
    },
    planned: {
      color: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-100',
      icon: ClockIcon,
      label: 'Direncanakan',
    },
    cancelled: {
      color: 'bg-gray-50 border-gray-200',
      textColor: 'text-gray-800',
      bgColor: 'bg-gray-100',
      icon: AlertCircleIcon,
      label: 'Dibatalkan',
    },
  };

  const config = statusConfig[data.status];
  const StatusIcon = config.icon;

  return (
    <div className={`rounded-lg border ${config.color} p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${config.bgColor}`}>
              <StatusIcon className={`w-5 h-5 ${config.textColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{data.pupukName}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded ${config.bgColor} ${config.textColor}`}>
                {config.label}
              </span>
            </div>
          </div>

          {/* Route */}
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Dari:</span> {data.fromKelompokTaniName || 'Pusat'} →{' '}
            <span className="font-medium">Ke:</span> {data.toKelompokTaniName}
            {data.petaniName && ` (${data.petaniName})`}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Kuantitas</p>
              <p className="font-medium text-gray-900">
                {data.quantity.toLocaleString()} {data.unit}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Tanggal Distribusi</p>
              <p className="font-medium text-gray-900">
                {new Date(data.distributionDate).toLocaleDateString('id-ID')}
              </p>
            </div>
            {data.receivedDate && (
              <div>
                <p className="text-gray-600">Tanggal Diterima</p>
                <p className="font-medium text-gray-900">
                  {new Date(data.receivedDate).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
            {data.lahanId && (
              <div>
                <p className="text-gray-600">Lahan</p>
                <p className="font-medium text-gray-900 truncate">{data.lahanName}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          {data.notes && <p className="text-xs text-gray-600 mt-3 italic">Catatan: {data.notes}</p>}
        </div>
      </div>
    </div>
  );
}
