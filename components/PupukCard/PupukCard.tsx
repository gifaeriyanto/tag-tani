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
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left side - Name & Code */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 break-words">{data.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">Kode: {data.code}</p>
        </div>

        {/* Middle - Info: Grid on mobile, Flex row on desktop */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-0">
          <div className="md:w-28 md:px-3">
            <p className="text-xs text-gray-500">Jenis</p>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded inline-block">
              {data.type}
            </span>
          </div>
          <div className="md:w-20 md:px-3">
            <p className="text-xs text-gray-500">Unit</p>
            <p className="text-xs font-medium text-gray-700">{data.unit}</p>
          </div>
          <div className="md:w-28 md:px-3">
            <p className="text-xs text-gray-500">Min. Stok</p>
            <p className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {data.minStockLevel.toLocaleString()}
            </p>
          </div>
          {data.composition && (
            <div className="col-span-2 md:col-span-1 md:w-32 md:px-3">
              <p className="text-xs text-gray-500">Komposisi</p>
              <p className="text-xs font-medium text-gray-700 break-words">{data.composition}</p>
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center justify-end gap-2 md:flex-shrink-0">
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
