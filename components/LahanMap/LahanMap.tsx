'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Lahan } from 'constants/lahan';

const LahanMapClient = dynamic(
  () =>
    import('./LahanMapClient').then((mod) => ({
      default: mod.LahanMapClient,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
  }
);

interface LahanMapProps {
  lahanList: Lahan[];
  selectedLahanId?: string;
  onPolygonClick?: (lahanId: string) => void;
  height?: string;
}

export function LahanMap({
  lahanList,
  selectedLahanId,
  onPolygonClick,
  height = '500px',
}: LahanMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="h-full w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <LahanMapClient
        lahanList={lahanList}
        selectedLahanId={selectedLahanId}
        onPolygonClick={onPolygonClick}
      />
    </div>
  );
}
