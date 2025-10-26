export interface Komoditi {
  id: string;
  name: string;
  code: string; // Kode komoditi
  description: string;
  category: string; // e.g., 'Padi', 'Sayuran', 'Buah-buahan'
  plantingPeriod: string; // e.g., 'Januari - Maret'
  harvestPeriod: string; // e.g., 'April - Juni'
  estimatedYield: number; // ton/hektar
  waterRequirement: string; // e.g., 'Tinggi', 'Sedang', 'Rendah'
  optimalTemperature: string; // e.g., '25-30°C'
  relatedLahanCount: number; // Jumlah lahan yang menanam komoditi ini
  createdAt: string;
  updatedAt: string;
}

export const KOMODITI_LIST: Komoditi[] = [
  {
    id: '1',
    name: 'Padi Sawah',
    code: 'PDI-001',
    description: 'Padi untuk sawah irigasi',
    category: 'Padi',
    plantingPeriod: 'Oktober - Desember',
    harvestPeriod: 'Januari - Maret',
    estimatedYield: 6.5,
    waterRequirement: 'Tinggi',
    optimalTemperature: '25-30°C',
    relatedLahanCount: 12,
    createdAt: '2024-01-15',
    updatedAt: '2024-10-20',
  },
  {
    id: '2',
    name: 'Jagung Hibrida',
    code: 'JAG-001',
    description: 'Jagung hibrida untuk lahan kering',
    category: 'Jagung',
    plantingPeriod: 'Februari - April',
    harvestPeriod: 'Juni - Agustus',
    estimatedYield: 8.2,
    waterRequirement: 'Sedang',
    optimalTemperature: '24-28°C',
    relatedLahanCount: 8,
    createdAt: '2024-02-10',
    updatedAt: '2024-09-15',
  },
  {
    id: '3',
    name: 'Cabai Merah',
    code: 'CBM-001',
    description: 'Cabai merah besar untuk pasar segar',
    category: 'Sayuran',
    plantingPeriod: 'Maret - Mei',
    harvestPeriod: 'Agustus - Oktober',
    estimatedYield: 15.0,
    waterRequirement: 'Tinggi',
    optimalTemperature: '25-32°C',
    relatedLahanCount: 5,
    createdAt: '2024-01-20',
    updatedAt: '2024-10-10',
  },
  {
    id: '4',
    name: 'Bawang Merah',
    code: 'BWM-001',
    description: 'Bawang merah varitas lokal',
    category: 'Sayuran',
    plantingPeriod: 'Agustus - Oktober',
    harvestPeriod: 'November - Januari',
    estimatedYield: 12.5,
    waterRequirement: 'Sedang',
    optimalTemperature: '24-28°C',
    relatedLahanCount: 7,
    createdAt: '2024-02-05',
    updatedAt: '2024-10-18',
  },
  {
    id: '5',
    name: 'Tomat',
    code: 'TOM-001',
    description: 'Tomat untuk pasar segar dan industri',
    category: 'Sayuran',
    plantingPeriod: 'Mei - Juli',
    harvestPeriod: 'Agustus - Oktober',
    estimatedYield: 45.0,
    waterRequirement: 'Tinggi',
    optimalTemperature: '25-30°C',
    relatedLahanCount: 4,
    createdAt: '2024-03-10',
    updatedAt: '2024-10-05',
  },
  {
    id: '6',
    name: 'Mangga Arumanis',
    code: 'MNG-001',
    description: 'Mangga arumanis untuk pasar premium',
    category: 'Buah-buahan',
    plantingPeriod: 'Sepanjang tahun (panen musiman)',
    harvestPeriod: 'Desember - Februari',
    estimatedYield: 20.0,
    waterRequirement: 'Sedang',
    optimalTemperature: '25-35°C',
    relatedLahanCount: 3,
    createdAt: '2024-04-15',
    updatedAt: '2024-09-20',
  },
  {
    id: '7',
    name: 'Pisang Cavendish',
    code: 'PSG-001',
    description: 'Pisang cavendish untuk ekspor',
    category: 'Buah-buahan',
    plantingPeriod: 'Sepanjang tahun',
    harvestPeriod: 'Sepanjang tahun',
    estimatedYield: 35.0,
    waterRequirement: 'Tinggi',
    optimalTemperature: '25-30°C',
    relatedLahanCount: 6,
    createdAt: '2024-01-25',
    updatedAt: '2024-10-12',
  },
  {
    id: '8',
    name: 'Kacang Tanah',
    code: 'KCG-001',
    description: 'Kacang tanah untuk konsumsi lokal',
    category: 'Kacang-kacangan',
    plantingPeriod: 'Oktober - Desember',
    harvestPeriod: 'Januari - Maret',
    estimatedYield: 3.0,
    waterRequirement: 'Rendah',
    optimalTemperature: '24-28°C',
    relatedLahanCount: 9,
    createdAt: '2024-02-20',
    updatedAt: '2024-10-08',
  },
];

export const CATEGORY_OPTIONS = [
  { label: 'Padi', value: 'Padi' },
  { label: 'Jagung', value: 'Jagung' },
  { label: 'Sayuran', value: 'Sayuran' },
  { label: 'Buah-buahan', value: 'Buah-buahan' },
  { label: 'Kacang-kacangan', value: 'Kacang-kacangan' },
  { label: 'Tanaman Industri', value: 'Tanaman Industri' },
];

export const WATER_REQUIREMENT_OPTIONS = [
  { label: 'Rendah', value: 'Rendah' },
  { label: 'Sedang', value: 'Sedang' },
  { label: 'Tinggi', value: 'Tinggi' },
];
