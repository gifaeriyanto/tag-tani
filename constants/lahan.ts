export interface Lahan {
  id: string;
  name: string;
  kelompokTaniId: string;
  kelompokTaniName: string;
  petaniId?: string;
  petaniName?: string;
  coordinates: [number, number][];
  area: number; // in hectares
  commodities: string[];
  createdAt: string;
  updatedAt: string;
}

// Color mapping for kelompok tani visualization
const KELOMPOK_COLORS = [
  '#22c55e', // green-600
  '#3b82f6', // blue-600
  '#f59e0b', // amber-600
  '#8b5cf6', // violet-600
  '#ec4899', // pink-600
  '#06b6d4', // cyan-600
  '#f97316', // orange-600
  '#14b8a6', // teal-600
];

export function getKelompokColor(kelompokTaniId: string): string {
  const index = parseInt(kelompokTaniId.replace(/\D/g, ''), 10) % KELOMPOK_COLORS.length;
  return KELOMPOK_COLORS[index] ?? KELOMPOK_COLORS[0] ?? '#22c55e';
}

// Helper function to calculate polygon area using Shoelace formula
export function calculatePolygonArea(coordinates: [number, number][]): number {
  if (coordinates.length < 3) return 0;

  let area = 0;
  const n = coordinates.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const coordI = coordinates[i];
    const coordJ = coordinates[j];
    if (coordI && coordJ) {
      area += coordI[0] * coordJ[1];
      area -= coordJ[0] * coordI[1];
    }
  }

  area = Math.abs(area) / 2;

  // Convert from square degrees to hectares (approximation)
  // At latitude -4°, 1 degree ≈ 111 km
  const metersPerDegree = 111000;
  const areaInSquareMeters = area * metersPerDegree * metersPerDegree;
  const hectares = areaInSquareMeters / 10000;

  return Math.round(hectares * 100) / 100; // Round to 2 decimal places
}

export const LAHAN_LIST: Lahan[] = [
  {
    id: 'lhn-001',
    name: 'Sawah Timur A',
    kelompokTaniId: '1',
    kelompokTaniName: 'Tani Makmur',
    petaniId: '1',
    petaniName: 'Muhammad Ridwan',
    coordinates: [
      [-4.0123, 120.0145],
      [-4.0123, 120.0178],
      [-4.0145, 120.0178],
      [-4.0145, 120.0145],
      [-4.0123, 120.0145],
    ],
    area: 2.5,
    commodities: ['Padi', 'Jagung'],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
  },
  {
    id: 'lhn-002',
    name: 'Ladang Barat B',
    kelompokTaniId: '1',
    kelompokTaniName: 'Tani Makmur',
    petaniId: '2',
    petaniName: 'Siti Nur Halimah',
    coordinates: [
      [-4.0145, 120.0145],
      [-4.0145, 120.0178],
      [-4.0165, 120.0175],
      [-4.0168, 120.0148],
      [-4.0145, 120.0145],
    ],
    area: 3.2,
    commodities: ['Kedelai'],
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
  },
  {
    id: 'lhn-003',
    name: 'Perkebunan Utara C',
    kelompokTaniId: '2',
    kelompokTaniName: 'Harapan Jaya',
    petaniId: '4',
    petaniName: 'Nurhayati',
    coordinates: [
      [-3.9980, 120.0200],
      [-3.9980, 120.0235],
      [-4.0005, 120.0238],
      [-4.0008, 120.0203],
      [-3.9980, 120.0200],
    ],
    area: 4.1,
    commodities: ['Padi', 'Kacang Tanah'],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'lhn-004',
    name: 'Sawah Selatan D',
    kelompokTaniId: '2',
    kelompokTaniName: 'Harapan Jaya',
    petaniId: '5',
    petaniName: 'Hamzah Ibrahim',
    coordinates: [
      [-4.0008, 120.0203],
      [-4.0008, 120.0235],
      [-4.0025, 120.0232],
      [-4.0028, 120.0205],
      [-4.0008, 120.0203],
    ],
    area: 2.8,
    commodities: ['Padi'],
    createdAt: '2024-01-22T11:15:00Z',
    updatedAt: '2024-01-22T11:15:00Z',
  },
  {
    id: 'lhn-005',
    name: 'Ladang Tengah E',
    kelompokTaniId: '3',
    kelompokTaniName: 'Sejahtera Bersama',
    petaniId: '6',
    petaniName: 'Fatimah Zahra',
    coordinates: [
      [-4.0050, 120.0100],
      [-4.0050, 120.0130],
      [-4.0070, 120.0128],
      [-4.0072, 120.0102],
      [-4.0050, 120.0100],
    ],
    area: 3.5,
    commodities: ['Jagung', 'Kacang Hijau'],
    createdAt: '2024-02-01T07:45:00Z',
    updatedAt: '2024-02-01T07:45:00Z',
  },
  {
    id: 'lhn-006',
    name: 'Sawah Utara F',
    kelompokTaniId: '3',
    kelompokTaniName: 'Sejahtera Bersama',
    petaniId: '7',
    petaniName: 'Ahmad Zainuddin',
    coordinates: [
      [-4.0072, 120.0102],
      [-4.0072, 120.0130],
      [-4.0090, 120.0127],
      [-4.0092, 120.0104],
      [-4.0072, 120.0102],
    ],
    area: 2.9,
    commodities: ['Padi', 'Kedelai'],
    createdAt: '2024-02-03T08:20:00Z',
    updatedAt: '2024-02-03T08:20:00Z',
  },
  {
    id: 'lhn-007',
    name: 'Kebun Jagung Selatan',
    kelompokTaniId: '4',
    kelompokTaniName: 'Berkah Tani',
    petaniId: '8',
    petaniName: 'Rosmiati',
    coordinates: [
      [-4.0100, 120.0080],
      [-4.0100, 120.0110],
      [-4.0118, 120.0108],
      [-4.0120, 120.0082],
      [-4.0100, 120.0080],
    ],
    area: 3.1,
    commodities: ['Jagung', 'Kacang Hijau'],
    createdAt: '2024-02-05T09:45:00Z',
    updatedAt: '2024-02-05T09:45:00Z',
  },
  {
    id: 'lhn-008',
    name: 'Sawah Padi Timur',
    kelompokTaniId: '5',
    kelompokTaniName: 'Sumber Rezeki',
    petaniId: '9',
    petaniName: 'Darwis Hamid',
    coordinates: [
      [-4.0200, 120.0150],
      [-4.0200, 120.0180],
      [-4.0220, 120.0178],
      [-4.0222, 120.0152],
      [-4.0200, 120.0150],
    ],
    area: 3.8,
    commodities: ['Padi'],
    createdAt: '2024-02-08T10:15:00Z',
    updatedAt: '2024-02-08T10:15:00Z',
  },
];
