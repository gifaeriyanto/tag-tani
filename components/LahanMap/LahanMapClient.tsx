'use client';

import { MapContainer, Polygon, Popup, TileLayer, Tooltip } from 'react-leaflet';
import type { Lahan } from 'constants/lahan';
import { getKelompokColor } from 'constants/lahan';
import 'leaflet/dist/leaflet.css';

interface LahanMapClientProps {
  lahanList: Lahan[];
  selectedLahanId?: string;
  onPolygonClick?: (lahanId: string) => void;
}

export function LahanMapClient({
  lahanList,
  selectedLahanId,
  onPolygonClick,
}: LahanMapClientProps) {
  // Calculate center based on all polygons
  const calculateCenter = (): [number, number] => {
    if (lahanList.length === 0) return [-4.0, 120.0]; // Default Wajo center

    let totalLat = 0;
    let totalLng = 0;
    let pointCount = 0;

    lahanList.forEach((lahan) => {
      lahan.coordinates.forEach((coord) => {
        totalLat += coord[0];
        totalLng += coord[1];
        pointCount++;
      });
    });

    return [totalLat / pointCount, totalLng / pointCount];
  };

  const center = calculateCenter();

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={13}
        minZoom={10}
        maxZoom={17}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={17}
        />

        {lahanList.map((lahan) => {
          const color = getKelompokColor(lahan.kelompokTaniId);
          const isSelected = lahan.id === selectedLahanId;

          return (
            <Polygon
              key={lahan.id}
              positions={lahan.coordinates as [number, number][]}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: isSelected ? 0.6 : 0.3,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onPolygonClick?.(lahan.id),
              }}
            >
              <Tooltip sticky>
                <div className="text-xs">
                  <div className="font-semibold">{lahan.name}</div>
                  <div className="text-gray-600">{lahan.kelompokTaniName}</div>
                  <div className="text-gray-600">{lahan.area} ha</div>
                </div>
              </Tooltip>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {lahan.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Kelompok:</span>{' '}
                      {lahan.kelompokTaniName}
                    </div>
                    {lahan.petaniName && (
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Pemilik:</span>{' '}
                        {lahan.petaniName}
                      </div>
                    )}
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Luas:</span> {lahan.area} ha
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Komoditi:</span>{' '}
                      {lahan.commodities.join(', ')}
                    </div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}
