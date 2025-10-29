'use client';

import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { Pupuk } from 'constants/pupuk';

interface PupukCardProps {
  data: Pupuk;
  onDelete: (id: string) => void;
}

export function PupukCard({ data, onDelete }: PupukCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Name & Code */}
        <div className="w-64 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900">{data.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">Kode: {data.code}</p>
        </div>

        {/* Middle - Info */}
        <div className="flex flex-1 items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Jenis:</span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
              {data.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Unit:</span>
            <span className="text-xs font-medium text-gray-700">{data.unit}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Min. Stok:</span>
            <span className="text-xs font-medium text-gray-700">
              {data.minStockLevel.toLocaleString()}
            </span>
          </div>
          {data.composition && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Komposisi:</span>
              <span className="text-xs font-medium text-gray-700">{data.composition}</span>
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href={`/pupuk/${data.id}`}
            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
            title="Lihat Detail"
          >
            <EyeIcon className="h-4 w-4" />
          </Link>
          <Link
            href={`/pupuk/${data.id}/edit`}
            className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(data.id)}
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
