'use client';

import { PupukDistribution } from 'constants/pupuk';

interface PupukDistributionCardProps {
  data: PupukDistribution;
}

export function PupukDistributionCard({ data }: PupukDistributionCardProps) {
  const statusConfig = {
    delivered: { label: 'Diterima', color: 'bg-green-100 text-green-800' },
    in_transit: { label: 'Dalam Perjalanan', color: 'bg-blue-100 text-blue-800' },
    delayed: { label: 'Terlambat', color: 'bg-red-100 text-red-800' },
    planned: { label: 'Direncanakan', color: 'bg-amber-100 text-amber-800' },
    cancelled: { label: 'Dibatalkan', color: 'bg-gray-100 text-gray-800' },
  };

  const config = statusConfig[data.status];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Name & Route */}
        <div className="w-48 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900">{data.pupukName}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {data.fromKelompokTaniName || 'Pusat'} → {data.toKelompokTaniName}
          </p>
        </div>

        {/* Middle - Info */}
        <div className="flex flex-1 items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Kuantitas:</span>
            <span className="text-xs font-medium text-gray-700">
              {data.quantity.toLocaleString()} {data.unit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Tanggal:</span>
            <span className="text-xs font-medium text-gray-700">
              {new Date(data.distributionDate).toLocaleDateString('id-ID')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Status:</span>
            <span className={`text-xs font-medium rounded px-2 py-0.5 ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
