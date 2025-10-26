export interface Penyuluh {
  id: string;
  name: string;
  nip: string; // Nomor Induk Pegawai
  phone: string;
  email: string;
  address: string;
  specialization: string; // e.g., 'Padi', 'Jagung', 'Sayuran'
  workArea: string; // Wilayah Kerja
  kelompokTaniAssigned: string[]; // Array of kelompok tani IDs they advise
  startDate: string;
  status: 'active' | 'inactive';
}

export const PENYULUH_LIST: Penyuluh[] = [
  {
    id: '1',
    name: 'Dr. Bambang Sutrisno',
    nip: '196505151990031001',
    phone: '081234567890',
    email: 'bambang.sutrisno@dinas-pertanian.go.id',
    address: 'Jl. Diponegoro No. 15, Makassar',
    specialization: 'Padi',
    workArea: 'Kecamatan Malangkasa',
    kelompokTaniAssigned: ['1', '2'],
    startDate: '1990-05-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ir. Siti Nurhaliza',
    nip: '196809201992032002',
    phone: '081234567891',
    email: 'siti.nurhaliza@dinas-pertanian.go.id',
    address: 'Jl. Ahmad Yani No. 42, Makassar',
    specialization: 'Sayuran',
    workArea: 'Kecamatan Herlang',
    kelompokTaniAssigned: ['3', '4'],
    startDate: '1992-09-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Drs. Hendra Wijaya',
    nip: '196203101988033003',
    phone: '081234567892',
    email: 'hendra.wijaya@dinas-pertanian.go.id',
    address: 'Jl. Hasanuddin No. 78, Makassar',
    specialization: 'Jagung',
    workArea: 'Kecamatan Tanete Rilau',
    kelompokTaniAssigned: ['5', '6'],
    startDate: '1988-03-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'Ir. Fatimah Azzahra',
    nip: '196712151994034004',
    phone: '081234567893',
    email: 'fatimah.azzahra@dinas-pertanian.go.id',
    address: 'Jl. Urip Sumoharjo No. 23, Makassar',
    specialization: 'Kacang-kacangan',
    workArea: 'Kecamatan Bulukumba',
    kelompokTaniAssigned: ['7', '8'],
    startDate: '1994-12-15',
    status: 'active',
  },
  {
    id: '5',
    name: 'Drs. Agus Priyanto',
    nip: '196401201986035005',
    phone: '081234567894',
    email: 'agus.priyanto@dinas-pertanian.go.id',
    address: 'Jl. Kajaolalido No. 56, Makassar',
    specialization: 'Padi',
    workArea: 'Kecamatan Mallawa',
    kelompokTaniAssigned: ['1', '3'],
    startDate: '1986-01-20',
    status: 'active',
  },
  {
    id: '6',
    name: 'Ir. Rina Septiani',
    nip: '196609301995036006',
    phone: '081234567895',
    email: 'rina.septiani@dinas-pertanian.go.id',
    address: 'Jl. Perintis Kemerdekaan No. 89, Makassar',
    specialization: 'Sayuran Organik',
    workArea: 'Kecamatan Lengkese',
    kelompokTaniAssigned: ['4', '5'],
    startDate: '1995-09-30',
    status: 'active',
  },
  {
    id: '7',
    name: 'Drs. Muhammad Rizky',
    nip: '196705081987037007',
    phone: '081234567896',
    email: 'muhammad.rizky@dinas-pertanian.go.id',
    address: 'Jl. Soekarno No. 34, Makassar',
    specialization: 'Buah-buahan',
    workArea: 'Kecamatan Turatea',
    kelompokTaniAssigned: ['6', '7'],
    startDate: '1987-05-08',
    status: 'active',
  },
  {
    id: '8',
    name: 'Ir. Dewi Lestari',
    nip: '196908121996038008',
    phone: '081234567897',
    email: 'dewi.lestari@dinas-pertanian.go.id',
    address: 'Jl. Veteran No. 67, Makassar',
    specialization: 'Teknologi Pertanian',
    workArea: 'Kecamatan Polombangkeng Utara',
    kelompokTaniAssigned: ['2', '8'],
    startDate: '1996-08-12',
    status: 'active',
  },
];

export const SPECIALIZATION_OPTIONS = [
  { label: 'Padi', value: 'Padi' },
  { label: 'Jagung', value: 'Jagung' },
  { label: 'Sayuran', value: 'Sayuran' },
  { label: 'Sayuran Organik', value: 'Sayuran Organik' },
  { label: 'Kacang-kacangan', value: 'Kacang-kacangan' },
  { label: 'Buah-buahan', value: 'Buah-buahan' },
  { label: 'Teknologi Pertanian', value: 'Teknologi Pertanian' },
];

export const STATUS_OPTIONS = [
  { label: 'Aktif', value: 'active' },
  { label: 'Tidak Aktif', value: 'inactive' },
];
