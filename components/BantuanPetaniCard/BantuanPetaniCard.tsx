'use client';

import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import type { BantuanPetani } from 'constants/bantuanPetani';

interface BantuanPetaniCardProps {
  data: BantuanPetani;
  onDelete?: (id: string) => void;
}

const typeLabels: Record<string, string> = {
  subsidy: 'Subsidi',
  training: 'Pelatihan',
  equipment: 'Peralatan',
  seed: 'Benih',
  fertilizer: 'Pupuk',
  other: 'Lainnya',
};

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  active: 'Aktif',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};

export function BantuanPetaniCard({ data, onDelete }: BantuanPetaniCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Title & Type */}
        <div className="w-64 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900">{data.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                statusStyles[data.status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {statusLabels[data.status] || data.status}
            </span>
            <span className="text-xs font-medium text-gray-600">
              {typeLabels[data.type] || data.type}
            </span>
          </div>
        </div>

        {/* Middle - Info */}
        <div className="flex flex-1 items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Pemberi Bantuan:</span>
            <span className="text-xs font-medium text-gray-700">
              {data.provider}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Periode:</span>
            <span className="text-xs font-medium text-gray-700">
              {new Date(data.startDate).toLocaleDateString('id-ID', {
                month: 'short',
                year: '2-digit',
              })}{' '}
              -{' '}
              {new Date(data.endDate).toLocaleDateString('id-ID', {
                month: 'short',
                year: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Kontak:</span>
            <span className="text-xs font-medium text-gray-700">
              {data.phone}
            </span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href={`/bantuan-petani/${data.id}`}
            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
            title="Lihat Detail"
          >
            <EyeIcon className="h-4 w-4" />
          </Link>
          <Link
            href={`/bantuan-petani/${data.id}/edit`}
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
  );
}
