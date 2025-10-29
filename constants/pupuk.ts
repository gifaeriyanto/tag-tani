// Fertilizer (Pupuk) System
export interface Pupuk {
  id: string;
  name: string;
  code: string; // e.g., NPK-001, ORG-001
  type: 'NPK' | 'Organik' | 'Urea' | 'SP36' | 'KCl' | 'Khusus';
  description: string;
  manufacturer?: string;
  unit: 'kg' | 'karung' | 'ton'; // Unit of measurement
  minStockLevel: number; // Alert when stock goes below this
  composition?: string; // e.g., 'NPK 16:16:16'
  recommendations?: string; // Recommended usage
  createdAt: string;
  updatedAt: string;
}

export interface PupukStock {
  id: string;
  pupukId: string;
  pupukName: string;
  kelompokTaniId: string;
  kelompokTaniName: string;
  kecamatan: string; // District
  quantity: number; // Current stock
  unit: string;
  warehouseLocation: string;
  lastRestockDate: string;
  lastRestockQuantity: number;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PupukDistribution {
  id: string;
  pupukId: string;
  pupukName: string;
  fromKelompokTaniId?: string; // Central warehouse or source kelompok
  fromKelompokTaniName?: string;
  toKelompokTaniId: string; // Recipient kelompok
  toKelompokTaniName: string;
  petaniId?: string; // Direct distribution to farmer
  petaniName?: string;
  lahanId?: string; // Land receiving the fertilizer
  lahanName?: string;
  quantity: number;
  unit: string;
  distributionDate: string;
  status: 'planned' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled';
  receivedDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PupukUsage {
  id: string;
  pupukId: string;
  pupukName: string;
  petaniId: string;
  petaniName: string;
  lahanId: string;
  lahanName: string;
  kelompokTaniId: string;
  kelompokTaniName: string;
  quantity: number;
  unit: string;
  applicationDate: string;
  usagePerHectare: number; // kg/hectare
  expectedYield?: string; // Expected yield notes
  applicationMethod?: string; // e.g., 'Taburan', 'Larut dalam air'
  notes?: string;
  reportedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PupukAnomaly {
  id: string;
  type: 'overstock' | 'understock' | 'delayed_delivery' | 'delayed_reporting' | 'unusual_consumption';
  severity: 'low' | 'medium' | 'high';
  kelompokTaniId: string;
  kelompokTaniName: string;
  kecamatan: string;
  pupukId?: string;
  pupukName?: string;
  description: string;
  detectedAt: string;
  resolvedAt?: string;
  status: 'open' | 'in_review' | 'resolved' | 'dismissed';
  recommendation?: string;
}

// Mock Data

export const PUPUK_LIST: Pupuk[] = [
  {
    id: '1',
    name: 'Pupuk NPK 16:16:16',
    code: 'NPK-001',
    type: 'NPK',
    description: 'Pupuk NPK lengkap untuk padi dan sayuran',
    manufacturer: 'PT Pupuk Sriwidjaja',
    unit: 'karung',
    minStockLevel: 100,
    composition: 'N 16%, P 16%, K 16%',
    recommendations: '300-400 kg/ha untuk padi, 200-300 kg/ha untuk sayuran',
    createdAt: '2024-01-15',
    updatedAt: '2024-10-28',
  },
  {
    id: '2',
    name: 'Pupuk Urea 46',
    code: 'UREA-001',
    type: 'Urea',
    description: 'Pupuk nitrogen untuk pemberian susulan',
    manufacturer: 'PT Pupuk Sriwidjaja',
    unit: 'karung',
    minStockLevel: 150,
    composition: 'N 46%',
    recommendations: '150-200 kg/ha pemberian susulan',
    createdAt: '2024-01-10',
    updatedAt: '2024-10-25',
  },
  {
    id: '3',
    name: 'Pupuk SP36',
    code: 'SP36-001',
    type: 'SP36',
    description: 'Pupuk fosfat untuk pemupukan dasar',
    manufacturer: 'PT Pupuk Sriwidjaja',
    unit: 'karung',
    minStockLevel: 80,
    composition: 'P₂O₅ 36%',
    recommendations: '100-150 kg/ha pemupukan dasar',
    createdAt: '2024-02-01',
    updatedAt: '2024-10-22',
  },
  {
    id: '4',
    name: 'Pupuk KCl',
    code: 'KCL-001',
    type: 'KCl',
    description: 'Pupuk kalium untuk meningkatkan kualitas',
    manufacturer: 'PT Pupuk Sriwidjaja',
    unit: 'karung',
    minStockLevel: 60,
    composition: 'K 60%',
    recommendations: '100-150 kg/ha',
    createdAt: '2024-01-20',
    updatedAt: '2024-10-20',
  },
  {
    id: '5',
    name: 'Pupuk Organik Kompos',
    code: 'ORG-001',
    type: 'Organik',
    description: 'Kompos organik untuk meningkatkan kesuburan tanah',
    manufacturer: 'Lokal Kelompok Tani',
    unit: 'kg',
    minStockLevel: 500,
    composition: 'Bahan organik minimal 40%',
    recommendations: '5-10 ton/ha',
    createdAt: '2024-03-01',
    updatedAt: '2024-10-28',
  },
  {
    id: '6',
    name: 'Pupuk NPK Khusus Sayuran',
    code: 'NPK-SAY-001',
    type: 'Khusus',
    description: 'Pupuk khusus diformulasi untuk tanaman sayuran',
    manufacturer: 'PT Pupuk Indonesia',
    unit: 'karung',
    minStockLevel: 75,
    composition: 'N 13%, P 13%, K 13% + Micronutrient',
    recommendations: '250-350 kg/ha',
    createdAt: '2024-02-15',
    updatedAt: '2024-10-26',
  },
];

export const PUPUK_STOCK_LIST: PupukStock[] = [
  {
    id: 'stock-1',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    kecamatan: 'Temon',
    quantity: 250,
    unit: 'karung',
    warehouseLocation: 'Gudang Utama, Jl. Raya Temon',
    lastRestockDate: '2024-10-20',
    lastRestockQuantity: 300,
    expiryDate: '2025-04-20',
    createdAt: '2024-09-01',
    updatedAt: '2024-10-28',
  },
  {
    id: 'stock-2',
    pupukId: '2',
    pupukName: 'Pupuk Urea 46',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    kecamatan: 'Temon',
    quantity: 400,
    unit: 'karung',
    warehouseLocation: 'Gudang Utama, Jl. Raya Temon',
    lastRestockDate: '2024-10-15',
    lastRestockQuantity: 500,
    expiryDate: '2025-03-15',
    createdAt: '2024-08-15',
    updatedAt: '2024-10-28',
  },
  {
    id: 'stock-3',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    kelompokTaniId: '2',
    kelompokTaniName: 'Kelompok Tani Subur Makmur',
    kecamatan: 'Wates',
    quantity: 45,
    unit: 'karung',
    warehouseLocation: 'Gudang Cabang, Jl. Gatot Subroto',
    lastRestockDate: '2024-10-10',
    lastRestockQuantity: 200,
    expiryDate: '2025-04-10',
    createdAt: '2024-09-10',
    updatedAt: '2024-10-28',
  },
  {
    id: 'stock-4',
    pupukId: '3',
    pupukName: 'Pupuk SP36',
    kelompokTaniId: '3',
    kelompokTaniName: 'Kelompok Tani Suka Maju',
    kecamatan: 'Panjatan',
    quantity: 150,
    unit: 'karung',
    warehouseLocation: 'Gudang Desa, Jl. Pendidikan',
    lastRestockDate: '2024-10-05',
    lastRestockQuantity: 250,
    expiryDate: '2025-05-05',
    createdAt: '2024-08-20',
    updatedAt: '2024-10-28',
  },
  {
    id: 'stock-5',
    pupukId: '5',
    pupukName: 'Pupuk Organik Kompos',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    kecamatan: 'Temon',
    quantity: 8500,
    unit: 'kg',
    warehouseLocation: 'Area Kompos, Jl. Raya Temon',
    lastRestockDate: '2024-10-22',
    lastRestockQuantity: 2000,
    expiryDate: '2025-12-31',
    createdAt: '2024-07-01',
    updatedAt: '2024-10-28',
  },
  {
    id: 'stock-6',
    pupukId: '2',
    pupukName: 'Pupuk Urea 46',
    kelompokTaniId: '4',
    kelompokTaniName: 'Kelompok Tani Makmur Sejahtera',
    kecamatan: 'Kulon Progo',
    quantity: 35,
    unit: 'karung',
    warehouseLocation: 'Gudang Pasar, Jl. Pemasaran',
    lastRestockDate: '2024-09-28',
    lastRestockQuantity: 300,
    expiryDate: '2025-03-28',
    createdAt: '2024-09-28',
    updatedAt: '2024-10-27',
  },
];

export const PUPUK_DISTRIBUTION_LIST: PupukDistribution[] = [
  {
    id: 'dist-1',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    fromKelompokTaniId: '1',
    fromKelompokTaniName: 'Kelompok Tani Maju Jaya',
    toKelompokTaniId: '2',
    toKelompokTaniName: 'Kelompok Tani Subur Makmur',
    quantity: 100,
    unit: 'karung',
    distributionDate: '2024-10-25',
    status: 'delivered',
    receivedDate: '2024-10-26',
    notes: 'Distribusi untuk musim tanam padi',
    createdAt: '2024-10-25',
    updatedAt: '2024-10-26',
  },
  {
    id: 'dist-2',
    pupukId: '2',
    pupukName: 'Pupuk Urea 46',
    fromKelompokTaniId: '1',
    fromKelompokTaniName: 'Kelompok Tani Maju Jaya',
    toKelompokTaniId: '3',
    toKelompokTaniName: 'Kelompok Tani Suka Maju',
    quantity: 80,
    unit: 'karung',
    distributionDate: '2024-10-24',
    status: 'delivered',
    receivedDate: '2024-10-25',
    notes: 'Pupuk susulan untuk padi fase vegetatif',
    createdAt: '2024-10-24',
    updatedAt: '2024-10-25',
  },
  {
    id: 'dist-3',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    toKelompokTaniId: '4',
    toKelompokTaniName: 'Kelompok Tani Makmur Sejahtera',
    petaniId: '15',
    petaniName: 'Budi Hartono',
    lahanId: 'lahan-15',
    lahanName: 'Sawah Selatan',
    quantity: 25,
    unit: 'karung',
    distributionDate: '2024-10-26',
    status: 'in_transit',
    notes: 'Distribusi langsung ke petani',
    createdAt: '2024-10-26',
    updatedAt: '2024-10-28',
  },
  {
    id: 'dist-4',
    pupukId: '3',
    pupukName: 'Pupuk SP36',
    fromKelompokTaniId: '1',
    fromKelompokTaniName: 'Kelompok Tani Maju Jaya',
    toKelompokTaniId: '2',
    toKelompokTaniName: 'Kelompok Tani Subur Makmur',
    quantity: 50,
    unit: 'karung',
    distributionDate: '2024-10-20',
    status: 'delayed',
    notes: 'Terlambat karena cuaca buruk',
    createdAt: '2024-10-20',
    updatedAt: '2024-10-28',
  },
  {
    id: 'dist-5',
    pupukId: '5',
    pupukName: 'Pupuk Organik Kompos',
    fromKelompokTaniId: '1',
    fromKelompokTaniName: 'Kelompok Tani Maju Jaya',
    toKelompokTaniId: '3',
    toKelompokTaniName: 'Kelompok Tani Suka Maju',
    quantity: 2000,
    unit: 'kg',
    distributionDate: '2024-10-22',
    status: 'delivered',
    receivedDate: '2024-10-23',
    notes: 'Kompos untuk persiapan lahan',
    createdAt: '2024-10-22',
    updatedAt: '2024-10-23',
  },
  {
    id: 'dist-6',
    pupukId: '6',
    pupukName: 'Pupuk NPK Khusus Sayuran',
    toKelompokTaniId: '2',
    toKelompokTaniName: 'Kelompok Tani Subur Makmur',
    petaniId: '8',
    petaniName: 'Siti Nurhaliza',
    lahanId: 'lahan-8',
    lahanName: 'Kebun Sayuran',
    quantity: 40,
    unit: 'karung',
    distributionDate: '2024-10-27',
    status: 'planned',
    notes: 'Distribusi untuk kebun sayuran musim ini',
    createdAt: '2024-10-27',
    updatedAt: '2024-10-27',
  },
];

export const PUPUK_USAGE_LIST: PupukUsage[] = [
  {
    id: 'usage-1',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    petaniId: '1',
    petaniName: 'Bambang Setiawan',
    lahanId: 'lahan-1',
    lahanName: 'Sawah Depan Rumah',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    quantity: 75,
    unit: 'karung',
    applicationDate: '2024-10-15',
    usagePerHectare: 375,
    applicationMethod: 'Taburan',
    reportedDate: '2024-10-20',
    createdAt: '2024-10-15',
    updatedAt: '2024-10-20',
  },
  {
    id: 'usage-2',
    pupukId: '2',
    pupukName: 'Pupuk Urea 46',
    petaniId: '2',
    petaniName: 'Siti Nurhaliza',
    lahanId: 'lahan-2',
    lahanName: 'Sawah Belakang',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    quantity: 50,
    unit: 'karung',
    applicationDate: '2024-10-18',
    usagePerHectare: 250,
    applicationMethod: 'Taburan',
    reportedDate: '2024-10-22',
    createdAt: '2024-10-18',
    updatedAt: '2024-10-22',
  },
  {
    id: 'usage-3',
    pupukId: '5',
    pupukName: 'Pupuk Organik Kompos',
    petaniId: '3',
    petaniName: 'Wahyu Santoso',
    lahanId: 'lahan-3',
    lahanName: 'Kebun Sayuran',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    quantity: 1500,
    unit: 'kg',
    applicationDate: '2024-10-12',
    usagePerHectare: 7500,
    applicationMethod: 'Tanam langsung',
    reportedDate: '2024-10-15',
    createdAt: '2024-10-12',
    updatedAt: '2024-10-15',
  },
  {
    id: 'usage-4',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    petaniId: '4',
    petaniName: 'Andi Wijaya',
    lahanId: 'lahan-4',
    lahanName: 'Sawah Baru',
    kelompokTaniId: '2',
    kelompokTaniName: 'Kelompok Tani Subur Makmur',
    quantity: 60,
    unit: 'karung',
    applicationDate: '2024-10-16',
    usagePerHectare: 300,
    applicationMethod: 'Taburan',
    reportedDate: '2024-10-25',
    createdAt: '2024-10-16',
    updatedAt: '2024-10-25',
  },
];

export const PUPUK_ANOMALY_LIST: PupukAnomaly[] = [
  {
    id: 'anom-1',
    type: 'overstock',
    severity: 'medium',
    kelompokTaniId: '1',
    kelompokTaniName: 'Kelompok Tani Maju Jaya',
    kecamatan: 'Temon',
    pupukId: '5',
    pupukName: 'Pupuk Organik Kompos',
    description: 'Stok kompos organik melebihi kapasitas gudang (8500 kg > kapasitas 8000 kg)',
    detectedAt: '2024-10-28',
    status: 'open',
    recommendation: 'Tingkatkan distribusi ke kelompok tani lain atau petani individual',
  },
  {
    id: 'anom-2',
    type: 'understock',
    severity: 'high',
    kelompokTaniId: '4',
    kelompokTaniName: 'Kelompok Tani Makmur Sejahtera',
    kecamatan: 'Kulon Progo',
    pupukId: '2',
    pupukName: 'Pupuk Urea 46',
    description: 'Stok pupuk Urea kritik (35 karung < minimum 150 karung)',
    detectedAt: '2024-10-27',
    status: 'in_review',
    recommendation: 'Segera restok dari pusat distribusi untuk mencegah kekurangan panen',
  },
  {
    id: 'anom-3',
    type: 'delayed_delivery',
    severity: 'high',
    kelompokTaniId: '2',
    kelompokTaniName: 'Kelompok Tani Subur Makmur',
    kecamatan: 'Wates',
    pupukId: '3',
    pupukName: 'Pupuk SP36',
    description: 'Pengiriman pupuk SP36 terlambat 8 hari dari jadwal (dist-4)',
    detectedAt: '2024-10-28',
    status: 'open',
    recommendation: 'Koordinasi dengan mitra logistik untuk pengiriman yang lebih tepat waktu',
  },
  {
    id: 'anom-4',
    type: 'delayed_reporting',
    severity: 'medium',
    kelompokTaniId: '2',
    kelompokTaniName: 'Kelompok Tani Subur Makmur',
    kecamatan: 'Wates',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    description: 'Laporan penggunaan pupuk terlambat 9 hari dari tanggal aplikasi (usage-4)',
    detectedAt: '2024-10-26',
    status: 'resolved',
    resolvedAt: '2024-10-26',
    recommendation: 'Ingatkan petani untuk melaporkan penggunaan dalam 3 hari setelah aplikasi',
  },
  {
    id: 'anom-5',
    type: 'unusual_consumption',
    severity: 'medium',
    kelompokTaniId: '2',
    kelompokTaniName: 'Kelompok Tani Subur Makmur',
    kecamatan: 'Wates',
    pupukId: '1',
    pupukName: 'Pupuk NPK 16:16:16',
    description: 'Konsumsi pupuk NPK melebihi rekomendasi (300 kg/ha, normal 300-400 kg/ha) - borderline',
    detectedAt: '2024-10-25',
    status: 'dismissed',
    resolvedAt: '2024-10-25',
    recommendation: 'Verifikasi dengan petani terkait teknik aplikasi',
  },
];

// Options for dropdowns
export const PUPUK_TYPE_OPTIONS = [
  { label: 'NPK', value: 'NPK' },
  { label: 'Organik', value: 'Organik' },
  { label: 'Urea', value: 'Urea' },
  { label: 'SP36', value: 'SP36' },
  { label: 'KCl', value: 'KCl' },
  { label: 'Khusus', value: 'Khusus' },
];

export const DISTRIBUTION_STATUS_OPTIONS = [
  { label: 'Direncanakan', value: 'planned' },
  { label: 'Dalam Perjalanan', value: 'in_transit' },
  { label: 'Diterima', value: 'delivered' },
  { label: 'Terlambat', value: 'delayed' },
  { label: 'Dibatalkan', value: 'cancelled' },
];

export const ANOMALY_SEVERITY_OPTIONS = [
  { label: 'Rendah', value: 'low' },
  { label: 'Sedang', value: 'medium' },
  { label: 'Tinggi', value: 'high' },
];

export const ANOMALY_STATUS_OPTIONS = [
  { label: 'Terbuka', value: 'open' },
  { label: 'Dalam Review', value: 'in_review' },
  { label: 'Terselesaikan', value: 'resolved' },
  { label: 'Ditolak', value: 'dismissed' },
];

export const ANOMALY_TYPE_OPTIONS = [
  { label: 'Overstock', value: 'overstock' },
  { label: 'Understock', value: 'understock' },
  { label: 'Pengiriman Terlambat', value: 'delayed_delivery' },
  { label: 'Laporan Terlambat', value: 'delayed_reporting' },
  { label: 'Konsumsi Tidak Biasa', value: 'unusual_consumption' },
];

export const UNIT_OPTIONS = [
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Karung', value: 'karung' },
  { label: 'Ton', value: 'ton' },
];

export const APPLICATION_METHOD_OPTIONS = [
  { label: 'Taburan', value: 'Taburan' },
  { label: 'Larut dalam air', value: 'Larut dalam air' },
  { label: 'Tanam langsung', value: 'Tanam langsung' },
  { label: 'Penyemprotan', value: 'Penyemprotan' },
];
