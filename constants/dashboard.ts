import { AlertCircleIcon, HandHeartIcon, PackageIcon, TrendingUpIcon, UserCheckIcon, UsersIcon, WheatIcon } from "lucide-react"

export const DASHBOARD_STATS = [
  {
    title: "Total Kelompok Tani",
    value: 5,
    subtitle: "5 aktif",
    icon: UsersIcon,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Total Penyuluh",
    value: 8,
    subtitle: "8 aktif",
    icon: UserCheckIcon,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Total Komoditi",
    value: 12,
    icon: WheatIcon,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600",
    subtitle: "12 jenis",
  },
  {
    title: "Bantuan Tersalurkan",
    value: 24,
    icon: HandHeartIcon,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600",
    subtitle: "Bulan ini",
  },
]

// Pupuk (Fertilizer) Dashboard Stats
export const PUPUK_DASHBOARD_STATS = [
  {
    title: "Total Jenis Pupuk",
    value: 6,
    subtitle: "6 jenis tersedia",
    icon: PackageIcon,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Stok Pupuk",
    value: "9,380",
    subtitle: "dalam berbagai satuan",
    icon: TrendingUpIcon,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Distribusi Pupuk",
    value: 6,
    subtitle: "minggu ini",
    icon: PackageIcon,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Anomali Terbuka",
    value: 3,
    subtitle: "perlu ditindaklanjuti",
    icon: AlertCircleIcon,
    iconBgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
]

// Mock data for the current month (last month)
export const HARVEST_TRENDS_LAST_MONTH = [
  {
    label: "Kecamatan Tempe",
    commodities: [
      { name: "Padi", value: 250, color: "#22c55e" },
      { name: "Jagung", value: 230, color: "#eab308" },
      { name: "Kedelai", value: 130, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Sabbangparu",
    commodities: [
      { name: "Padi", value: 510, color: "#22c55e" },
      { name: "Jagung", value: 120, color: "#eab308" },
      { name: "Kacang Tanah", value: 150, color: "#ef4444" },
    ],
  },
  {
    label: "Kecamatan Tanasitolo",
    commodities: [
      { name: "Padi", value: 280, color: "#22c55e" },
      { name: "Jagung", value: 220, color: "#eab308" },
      { name: "Kedelai", value: 120, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Belawa",
    commodities: [
      { name: "Padi", value: 210, color: "#22c55e" },
      { name: "Jagung", value: 140, color: "#eab308" },
      { name: "Kacang Hijau", value: 150, color: "#84cc16" },
    ],
  },
  {
    label: "Kecamatan Pitumpanua",
    commodities: [
      { name: "Padi", value: 190, color: "#22c55e" },
      { name: "Jagung", value: 160, color: "#eab308" },
      { name: "Kedelai", value: 150, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Majauleng",
    commodities: [
      { name: "Padi", value: 250, color: "#22c55e" },
      { name: "Jagung", value: 180, color: "#eab308" },
      { name: "Kacang Tanah", value: 140, color: "#ef4444" },
    ],
  },
  {
    label: "Kecamatan Pammana",
    commodities: [
      { name: "Padi", value: 210, color: "#22c55e" },
      { name: "Jagung", value: 180, color: "#eab308" },
      { name: "Kedelai", value: 120, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Sajoanging",
    commodities: [
      { name: "Padi", value: 330, color: "#22c55e" },
      { name: "Jagung", value: 270, color: "#eab308" },
      { name: "Kacang Hijau", value: 60, color: "#84cc16" },
    ],
  },
  {
    label: "Kecamatan Takkalalla",
    commodities: [
      { name: "Padi", value: 280, color: "#22c55e" },
      { name: "Jagung", value: 210, color: "#eab308" },
      { name: "Kedelai", value: 45, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Gilireng",
    commodities: [
      { name: "Padi", value: 410, color: "#22c55e" },
      { name: "Jagung", value: 230, color: "#eab308" },
      { name: "Kacang Tanah", value: 80, color: "#ef4444" },
    ],
  },
  {
    label: "Kecamatan Maniangpajo",
    commodities: [
      { name: "Padi", value: 360, color: "#22c55e" },
      { name: "Jagung", value: 190, color: "#eab308" },
      { name: "Kedelai", value: 70, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Keera",
    commodities: [
      { name: "Padi", value: 270, color: "#22c55e" },
      { name: "Jagung", value: 120, color: "#eab308" },
      { name: "Kacang Hijau", value: 40, color: "#84cc16" },
    ],
  },
  {
    label: "Kecamatan Penrang",
    commodities: [
      { name: "Padi", value: 340, color: "#22c55e" },
      { name: "Jagung", value: 160, color: "#eab308" },
      { name: "Kedelai", value: 55, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Bola",
    commodities: [
      { name: "Padi", value: 400, color: "#22c55e" },
      { name: "Jagung", value: 210, color: "#eab308" },
      { name: "Kacang Tanah", value: 70, color: "#ef4444" },
    ],
  },
]

// Mock data for the entire year (aggregated from 12 months)
export const HARVEST_TRENDS_LAST_YEAR = [
  {
    label: "Kecamatan Tempe",
    commodities: [
      { name: "Padi", value: 5400, color: "#22c55e" },
      { name: "Jagung", value: 3360, color: "#eab308" },
      { name: "Kedelai", value: 1440, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Sabbangparu",
    commodities: [
      { name: "Padi", value: 6240, color: "#22c55e" },
      { name: "Jagung", value: 1800, color: "#eab308" },
      { name: "Kacang Tanah", value: 600, color: "#ef4444" },
    ],
  },
  {
    label: "Kecamatan Tanasitolo",
    commodities: [
      { name: "Padi", value: 4560, color: "#22c55e" },
      { name: "Jagung", value: 2400, color: "#eab308" },
      { name: "Kedelai", value: 1200, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Belawa",
    commodities: [
      { name: "Padi", value: 3720, color: "#22c55e" },
      { name: "Jagung", value: 2160, color: "#eab308" },
      { name: "Kacang Hijau", value: 600, color: "#84cc16" },
    ],
  },
  {
    label: "Kecamatan Pitumpanua",
    commodities: [
      { name: "Padi", value: 3480, color: "#22c55e" },
      { name: "Jagung", value: 1680, color: "#eab308" },
      { name: "Kedelai", value: 600, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Majauleng",
    commodities: [
      { name: "Padi", value: 3000, color: "#22c55e" },
      { name: "Jagung", value: 1200, color: "#eab308" },
      { name: "Kacang Tanah", value: 480, color: "#ef4444" },
    ],
  },
  {
    label: "Kecamatan Pammana",
    commodities: [
      { name: "Padi", value: 2520, color: "#22c55e" },
      { name: "Jagung", value: 960, color: "#eab308" },
      { name: "Kedelai", value: 240, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Sajoanging",
    commodities: [
      { name: "Padi", value: 3960, color: "#22c55e" },
      { name: "Jagung", value: 2040, color: "#eab308" },
      { name: "Kacang Hijau", value: 720, color: "#84cc16" },
    ],
  },
  {
    label: "Kecamatan Takkalalla",
    commodities: [
      { name: "Padi", value: 3360, color: "#22c55e" },
      { name: "Jagung", value: 1320, color: "#eab308" },
      { name: "Kedelai", value: 540, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Gilireng",
    commodities: [
      { name: "Padi", value: 4920, color: "#22c55e" },
      { name: "Jagung", value: 2760, color: "#eab308" },
      { name: "Kacang Tanah", value: 960, color: "#ef4444" },
    ],
  },
  {
    label: "Kecamatan Maniangpajo",
    commodities: [
      { name: "Padi", value: 4320, color: "#22c55e" },
      { name: "Jagung", value: 2280, color: "#eab308" },
      { name: "Kedelai", value: 840, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Keera",
    commodities: [
      { name: "Padi", value: 3240, color: "#22c55e" },
      { name: "Jagung", value: 1440, color: "#eab308" },
      { name: "Kacang Hijau", value: 480, color: "#84cc16" },
    ],
  },
  {
    label: "Kecamatan Penrang",
    commodities: [
      { name: "Padi", value: 4080, color: "#22c55e" },
      { name: "Jagung", value: 1920, color: "#eab308" },
      { name: "Kedelai", value: 660, color: "#f97316" },
    ],
  },
  {
    label: "Kecamatan Bola",
    commodities: [
      { name: "Padi", value: 4800, color: "#22c55e" },
      { name: "Jagung", value: 2520, color: "#eab308" },
      { name: "Kacang Tanah", value: 840, color: "#ef4444" },
    ],
  },
]

// Open Pupuk Anomalies for Dashboard
export const DASHBOARD_OPEN_ANOMALIES = [
  {
    id: "anom-1",
    type: "overstock",
    severity: "medium",
    kelompokTaniName: "Kelompok Tani Maju Jaya",
    pupukName: "Pupuk Organik Kompos",
    description: "Stok kompos organik melebihi kapasitas gudang (8500 kg > kapasitas 8000 kg)",
    detectedAt: "2024-10-28",
    status: "open",
  },
  {
    id: "anom-2",
    type: "understock",
    severity: "high",
    kelompokTaniName: "Kelompok Tani Makmur Sejahtera",
    pupukName: "Pupuk Urea 46",
    description: "Stok pupuk Urea kritik (35 karung < minimum 150 karung)",
    detectedAt: "2024-10-27",
    status: "in_review",
  },
  {
    id: "anom-3",
    type: "delayed_delivery",
    severity: "high",
    kelompokTaniName: "Kelompok Tani Subur Makmur",
    pupukName: "Pupuk SP36",
    description: "Pengiriman pupuk SP36 terlambat 8 hari dari jadwal",
    detectedAt: "2024-10-28",
    status: "open",
  },
]
