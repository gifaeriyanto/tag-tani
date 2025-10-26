export interface BantuanPetani {
  id: string;
  title: string;
  description: string;
  type: 'subsidy' | 'training' | 'equipment' | 'seed' | 'fertilizer' | 'other';
  provider: string; // e.g., Pemerintah, NGO, Perusahaan
  targetKelompokTani: string[]; // Array of kelompok tani IDs
  amount?: string; // Untuk subsidy: jumlah dana
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  contact: string; // Kontak pemberi bantuan
  phone: string;
  email: string;
  notes?: string;
}

export const BANTUAN_PETANI_LIST: BantuanPetani[] = [
  {
    id: '1',
    title: 'Subsidi Benih Padi Unggul',
    description: 'Program subsidi untuk benih padi unggul dengan harga terjangkau bagi petani',
    type: 'subsidy',
    provider: 'Dinas Pertanian Provinsi',
    targetKelompokTani: ['1', '2', '3'],
    amount: '50000000',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
    contact: 'Bapak Sutardjo',
    phone: '081234567890',
    email: 'bantuan@dinas-pertanian.go.id',
    notes: 'Khusus untuk petani yang terdaftar dalam program APBN',
  },
  {
    id: '2',
    title: 'Pelatihan Pertanian Modern',
    description: 'Program pelatihan teknik pertanian modern dan penggunaan teknologi',
    type: 'training',
    provider: 'Universitas Pertanian',
    targetKelompokTani: ['4', '5'],
    startDate: '2025-02-15',
    endDate: '2025-05-15',
    status: 'active',
    contact: 'Prof. Dr. Bambang Setiawan',
    phone: '082345678901',
    email: 'pelatihan@univ-pertanian.ac.id',
    notes: 'Gratis untuk kelompok tani yang berkomitmen',
  },
  {
    id: '3',
    title: 'Penyediaan Traktor dan Alat Pertanian',
    description: 'Program alsintan (alat mesin pertanian) untuk meningkatkan produktivitas',
    type: 'equipment',
    provider: 'Kementerian Pertanian',
    targetKelompokTani: ['1', '3', '6'],
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    status: 'active',
    contact: 'Ir. Siti Nurhaliza',
    phone: '081234567892',
    email: 'alsintan@kementan.go.id',
    notes: 'Program kemitraan dengan sistem sewa atau beli',
  },
  {
    id: '4',
    title: 'Subsidi Pupuk Organik',
    description: 'Pemberian subsidi untuk pupuk organik guna mendukung pertanian berkelanjutan',
    type: 'fertilizer',
    provider: 'Pemerintah Kabupaten',
    targetKelompokTani: ['2', '4', '7'],
    amount: '30000000',
    startDate: '2025-03-01',
    endDate: '2025-09-30',
    status: 'active',
    contact: 'H. Budi Santoso',
    phone: '081234567893',
    email: 'pupuk@pemkab.go.id',
    notes: 'Kuota terbatas, pendaftaran dibuka setiap bulannya',
  },
  {
    id: '5',
    title: 'Program Asuransi Pertanian',
    description: 'Perlindungan risiko pertanian dengan premi yang ditanggung pemerintah',
    type: 'other',
    provider: 'PT Asuransi Indonesia',
    targetKelompokTani: ['1', '2', '3', '5'],
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
    contact: 'Andi Suryanto',
    phone: '081234567894',
    email: 'asuransi@ptasindoesia.id',
    notes: 'Mencakup risiko bencana alam dan gagal panen',
  },
  {
    id: '6',
    title: 'Bantuan Benih Jagung Hibrida',
    description: 'Distribusi benih jagung hibrida berkualitas dengan harga subsidi',
    type: 'seed',
    provider: 'PT Benih Sejahtera',
    targetKelompokTani: ['6', '7', '8'],
    startDate: '2025-04-01',
    endDate: '2025-08-31',
    status: 'completed',
    contact: 'Rudi Hermawan',
    phone: '082345678902',
    email: 'benih@pt-sejahtera.com',
    notes: 'Program sudah selesai, silakan hubungi untuk info program berikutnya',
  },
  {
    id: '7',
    title: 'Program Integrasi Ternak-Tani',
    description: 'Integrasi usaha pertanian dengan peternakan untuk peningkatan pendapatan',
    type: 'training',
    provider: 'Dinas Peternakan',
    targetKelompokTani: ['3', '5', '8'],
    startDate: '2025-05-01',
    endDate: '2025-11-30',
    status: 'active',
    contact: 'Drs. Mardi Subandi',
    phone: '081234567895',
    email: 'ternak@dinas-peternakan.go.id',
    notes: 'Dengan dukungan teknis dan modal kerja',
  },
  {
    id: '8',
    title: 'Renovasi Irigasi Pertanian',
    description: 'Program pemerbaikan dan pembangunan sarana irigasi untuk efisiensi air',
    type: 'equipment',
    provider: 'Kementerian PUPR',
    targetKelompokTani: ['2', '4', '6'],
    startDate: '2025-01-15',
    endDate: '2025-12-15',
    status: 'active',
    contact: 'Ir. Wahyu Santoso',
    phone: '081234567896',
    email: 'irigasi@pupr.go.id',
    notes: 'Konstruksi dimulai sesuai dengan jadwal yang disepakati bersama',
  },
];

export const BANTUAN_TYPE_OPTIONS = [
  { label: 'Subsidi', value: 'subsidy' },
  { label: 'Pelatihan', value: 'training' },
  { label: 'Peralatan', value: 'equipment' },
  { label: 'Benih', value: 'seed' },
  { label: 'Pupuk', value: 'fertilizer' },
  { label: 'Lainnya', value: 'other' },
];

export const PROVIDER_OPTIONS = [
  { label: 'Dinas Pertanian Provinsi', value: 'Dinas Pertanian Provinsi' },
  { label: 'Dinas Pertanian Kabupaten', value: 'Dinas Pertanian Kabupaten' },
  { label: 'Kementerian Pertanian', value: 'Kementerian Pertanian' },
  { label: 'Pemerintah', value: 'Pemerintah' },
  { label: 'Universitas', value: 'Universitas' },
  { label: 'NGO', value: 'NGO' },
  { label: 'Perusahaan Swasta', value: 'Perusahaan Swasta' },
  { label: 'Koperasi', value: 'Koperasi' },
];

export const STATUS_OPTIONS = [
  { label: 'Aktif', value: 'active' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
];
