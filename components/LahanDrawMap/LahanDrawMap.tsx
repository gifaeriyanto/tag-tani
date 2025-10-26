'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LahanDrawMapClient = dynamic(
  () =>
    import('./LahanDrawMapClient').then((mod) => ({
      default: mod.LahanDrawMapClient,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-screen fixed inset-0 z-50 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
  }
);

interface LahanDrawMapProps {
  initialCoordinates?: [number, number][];
  onCoordinatesChange: (coordinates: [number, number][]) => void;
}

export function LahanDrawMap({
  initialCoordinates,
  onCoordinatesChange,
}: LahanDrawMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen w-screen fixed inset-0 z-50 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <LahanDrawMapClient
      initialCoordinates={initialCoordinates}
      onCoordinatesChange={onCoordinatesChange}
    />
  );
}
