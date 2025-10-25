export interface KelompokTani {
  id: string;
  name: string;
  code: string;
  kecamatan: string;
  village: string;
  address: string;
  leaderName: string;
  phone: string;
  memberCount: number;
  landArea: number; // in hectares
  commodities: string[];
  establishmentDate: string;
  status: 'active' | 'inactive';
}

export const KELOMPOK_TANI_LIST: KelompokTani[] = [
  {
    id: '1',
    name: 'Tani Makmur',
    code: 'KT-001',
    kecamatan: 'Tempe',
    village: 'Lagosi',
    address: 'Jl. Poros Makassar-Bone Km 12',
    leaderName: 'Ahmad Syahrir',
    phone: '081234567890',
    memberCount: 45,
    landArea: 120.5,
    commodities: ['Padi', 'Jagung', 'Kedelai'],
    establishmentDate: '2018-03-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Harapan Jaya',
    code: 'KT-002',
    kecamatan: 'Sabbangparu',
    village: 'Bojo',
    address: 'Dusun Bojo Utara',
    leaderName: 'Siti Aminah',
    phone: '082345678901',
    memberCount: 32,
    landArea: 85.3,
    commodities: ['Padi', 'Kacang Tanah'],
    establishmentDate: '2019-06-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Sejahtera Bersama',
    code: 'KT-003',
    kecamatan: 'Tanasitolo',
    village: 'Watang Palakka',
    address: 'Jl. Kemerdekaan No. 45',
    leaderName: 'Muhammad Arsyad',
    phone: '085456789012',
    memberCount: 58,
    landArea: 145.7,
    commodities: ['Padi', 'Jagung', 'Kedelai', 'Kacang Hijau'],
    establishmentDate: '2017-01-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'Berkah Tani',
    code: 'KT-004',
    kecamatan: 'Belawa',
    village: 'Manurungnge',
    address: 'Dusun Manurungnge Timur',
    leaderName: 'Nurhayati',
    phone: '081567890123',
    memberCount: 28,
    landArea: 65.2,
    commodities: ['Padi', 'Kacang Hijau'],
    establishmentDate: '2020-08-05',
    status: 'active',
  },
  {
    id: '5',
    name: 'Sumber Rezeki',
    code: 'KT-005',
    kecamatan: 'Pitumpanua',
    village: 'Laelo',
    address: 'Jl. Veteran No. 23',
    leaderName: 'Hamzah Ibrahim',
    phone: '082678901234',
    memberCount: 41,
    landArea: 98.4,
    commodities: ['Padi', 'Jagung', 'Kedelai'],
    establishmentDate: '2018-11-12',
    status: 'active',
  },
  {
    id: '6',
    name: 'Maju Bersama',
    code: 'KT-006',
    kecamatan: 'Majauleng',
    village: 'Cinnong',
    address: 'Dusun Cinnong Barat',
    leaderName: 'Abdul Kadir',
    phone: '085789012345',
    memberCount: 36,
    landArea: 78.9,
    commodities: ['Padi', 'Kacang Tanah'],
    establishmentDate: '2019-04-18',
    status: 'active',
  },
  {
    id: '7',
    name: 'Karya Tani',
    code: 'KT-007',
    kecamatan: 'Pammana',
    village: 'Bila',
    address: 'Jl. Pahlawan No. 67',
    leaderName: 'Rosmiati',
    phone: '081890123456',
    memberCount: 52,
    landArea: 132.6,
    commodities: ['Padi', 'Jagung', 'Kedelai'],
    establishmentDate: '2016-09-25',
    status: 'active',
  },
  {
    id: '8',
    name: 'Subur Makmur',
    code: 'KT-008',
    kecamatan: 'Sajoanging',
    village: 'Padaelo',
    address: 'Dusun Padaelo Selatan',
    leaderName: 'Darwis Hamid',
    phone: '082901234567',
    memberCount: 47,
    landArea: 115.3,
    commodities: ['Padi', 'Jagung', 'Kacang Hijau'],
    establishmentDate: '2017-07-08',
    status: 'active',
  },
];

export const WAJO_KECAMATAN = [
  'Tempe',
  'Sabbangparu',
  'Tanasitolo',
  'Belawa',
  'Pitumpanua',
  'Majauleng',
  'Pammana',
  'Sajoanging',
  'Takkalalla',
  'Gilireng',
  'Maniangpajo',
  'Keera',
  'Penrang',
  'Bola',
];

export const COMMODITIES = [
  'Padi',
  'Jagung',
  'Kedelai',
  'Kacang Tanah',
  'Kacang Hijau',
];
