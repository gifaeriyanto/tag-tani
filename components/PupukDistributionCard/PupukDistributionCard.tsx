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
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left side - Name & Route */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 break-words">{data.pupukName}</h3>
          <p className="mt-0.5 text-xs text-gray-500 break-words">
            {data.fromKelompokTaniName || 'Pusat'} → {data.toKelompokTaniName}
          </p>
        </div>

        {/* Middle - Info: Grid on mobile, Flex row on desktop */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-0">
          <div className="md:w-36 md:px-3">
            <p className="text-xs text-gray-500">Kuantitas</p>
            <p className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {data.quantity.toLocaleString()} {data.unit}
            </p>
          </div>
          <div className="md:w-32 md:px-3">
            <p className="text-xs text-gray-500">Tanggal</p>
            <p className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {new Date(data.distributionDate).toLocaleDateString('id-ID')}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 md:w-36 md:px-3">
            <p className="text-xs text-gray-500">Status</p>
            <span className={`text-xs font-medium rounded px-2 py-0.5 inline-block ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
