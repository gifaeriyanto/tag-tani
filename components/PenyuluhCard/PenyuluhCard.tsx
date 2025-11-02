'use client';

import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import type { Penyuluh } from 'constants/penyuluh';

interface PenyuluhCardProps {
  data: Penyuluh;
  onDelete?: (id: string) => void;
}

export function PenyuluhCard({ data, onDelete }: PenyuluhCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left side - Name & NIP */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 break-words">{data.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">NIP: {data.nip}</p>
        </div>

        {/* Middle - Info: Grid on mobile, Flex row on desktop */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-0">
          <div className="md:w-36 md:px-3">
            <p className="text-xs text-gray-500">Keahlian</p>
            <p className="text-xs font-medium text-gray-700 break-words">
              {data.specialization}
            </p>
          </div>
          <div className="md:w-40 md:px-3">
            <p className="text-xs text-gray-500">Wilayah Kerja</p>
            <p className="text-xs font-medium text-gray-700 break-words">
              {data.workArea}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 md:w-32 md:px-3">
            <p className="text-xs text-gray-500">Kontak</p>
            <p className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {data.phone}
            </p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center justify-end gap-2 md:flex-shrink-0">
          <Link
            href={`/penyuluh/${data.id}`}
            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
            title="Lihat Detail"
          >
            <EyeIcon className="h-4 w-4" />
          </Link>
          <Link
            href={`/penyuluh/${data.id}/edit`}
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
