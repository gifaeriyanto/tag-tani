'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { NavigationIcon, Trash2Icon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

interface LahanDrawMapClientProps {
  initialCoordinates?: [number, number][];
  onCoordinatesChange: (coordinates: [number, number][]) => void;
}

// Component to handle geolocation
function GeolocationButton() {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    map.locate({ setView: true, maxZoom: 16 });
  };

  useMapEvents({
    locationfound: () => {
      setIsLocating(false);
    },
    locationerror: () => {
      setIsLocating(false);
      alert('Tidak dapat mengakses lokasi. Pastikan izin lokasi sudah diberikan.');
    },
  });

  return (
    <button
      onClick={handleLocate}
      disabled={isLocating}
      className="absolute top-4 right-4 z-[1000] bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-lg shadow-lg border border-gray-200 disabled:opacity-50"
      title="Ke Lokasi Saya"
    >
      <NavigationIcon className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
    </button>
  );
}

// Component to handle drawing
function DrawControl({
  initialCoordinates,
  onCoordinatesChange,
}: {
  initialCoordinates?: [number, number][];
  onCoordinatesChange: (coordinates: [number, number][]) => void;
}) {
  const map = useMap();
  const [coordinates, setCoordinates] = useState<[number, number][]>(
    initialCoordinates || []
  );

  useEffect(() => {
    let drawControl: any = null;

    // Dynamically import leaflet and leaflet-draw
    const initializeDrawing = async () => {
      const L = await import('leaflet');
      await import('leaflet-draw');

      // Check if draw control already exists
      const existingControls = document.querySelectorAll('.leaflet-draw');
      if (existingControls.length > 0) {
        return;
      }

      // Initialize drawing controls with only polygon enabled
      drawControl = new L.Control.Draw({
        position: 'topleft',
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
            shapeOptions: {
              color: '#22c55e',
              fillOpacity: 0.3,
            },
          },
          polyline: false,
          circle: false,
          rectangle: false,
          marker: false,
          circlemarker: false,
        },
        edit: false, // Disable edit toolbar completely
      });

      map.addControl(drawControl);

      // Handle polygon creation
      const handleDrawCreated = (event: any) => {
        const layer = event.layer;
        const latLngs = layer.getLatLngs()[0];
        const coords: [number, number][] = latLngs.map(
          (ll: { lat: number; lng: number }) => [ll.lat, ll.lng]
        );
        // Close the polygon
        if (coords.length > 0) {
          const firstPoint = coords[0];
          if (firstPoint) {
            coords.push(firstPoint);
          }
        }
        setCoordinates(coords);
        onCoordinatesChange(coords);
      };

      map.on('draw:created', handleDrawCreated);
    };

    initializeDrawing();

    return () => {
      if (drawControl) {
        try {
          map.removeControl(drawControl);
        } catch (e) {
          // Control might already be removed
        }
      }
    };
  }, [map, onCoordinatesChange]);

  const handleClearPolygon = () => {
    if (confirm('Apakah Anda yakin ingin menghapus poligon ini?')) {
      setCoordinates([]);
      onCoordinatesChange([]);
    }
  };

  return (
    <>
      {coordinates.length > 0 && (
        <>
          <Polygon
            positions={coordinates}
            pathOptions={{
              color: '#22c55e',
              fillColor: '#22c55e',
              fillOpacity: 0.3,
              weight: 2,
            }}
          />
          <button
            onClick={handleClearPolygon}
            className="absolute top-4 left-16 z-[1000] bg-white hover:bg-red-50 text-red-600 px-3 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2 text-sm font-medium"
            title="Hapus Poligon"
          >
            <Trash2Icon className="w-4 h-4" />
            Hapus Poligon
          </button>
        </>
      )}
    </>
  );
}

export function LahanDrawMapClient({
  initialCoordinates,
  onCoordinatesChange,
}: LahanDrawMapClientProps) {
  const defaultCenter: [number, number] = initialCoordinates?.[0] || [-4.0, 120.0];

  return (
    <div className="h-screen w-screen fixed inset-0 z-50 bg-white">
      <MapContainer
        center={defaultCenter}
        zoom={15}
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
        <GeolocationButton />
        <DrawControl
          initialCoordinates={initialCoordinates}
          onCoordinatesChange={onCoordinatesChange}
        />
      </MapContainer>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200 max-w-md">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Petunjuk:</span> Klik tombol polygon di
          kiri atas, lalu klik pada peta untuk menggambar batas lahan. Klik dua
          kali untuk menyelesaikan.
        </p>
      </div>
    </div>
  );
}
