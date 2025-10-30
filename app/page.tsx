"use client"

import { AlertTriangleIcon, ChevronDownIcon, ChevronUpIcon, LinkIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DateRangeFilter } from "components/DateRangeFilter"
import { Header } from "components/Header"
import { HorizontalBarChart } from "components/HorizontalBarChart"
import { Sidebar } from "components/Sidebar"
import { StatCard } from "components/StatCard"
import {
  DASHBOARD_OPEN_ANOMALIES,
  DASHBOARD_STATS,
  HARVEST_TRENDS_LAST_MONTH,
  HARVEST_TRENDS_LAST_YEAR,
  PUPUK_DASHBOARD_STATS,
} from "constants/dashboard"

type FilterOption = "last_month" | "last_year" | "custom"

export default function Dashboard() {
  const [showAllKecamatan, setShowAllKecamatan] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("last_month")

  const handleFilterChange = (option: FilterOption, startDate?: Date, endDate?: Date) => {
    setSelectedFilter(option)
    // TODO: When custom is selected, you can use startDate and endDate to fetch data
    console.log("Filter changed:", option, startDate, endDate)
  }

  const harvestTrends = selectedFilter === "last_year" ? HARVEST_TRENDS_LAST_YEAR : HARVEST_TRENDS_LAST_MONTH

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="mt-16 ml-[220px] p-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Ringkasan aktivitas dan statistik kelompok tani</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_STATS.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Pupuk Stats Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Manajemen Pupuk</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PUPUK_DASHBOARD_STATS.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>

        {/* Harvest Trends Section */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">Trend Panen per Kecamatan</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#22c55e]"></div>
                  <span className="text-xs text-gray-600">Padi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
                  <span className="text-xs text-gray-600">Jagung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#f97316]"></div>
                  <span className="text-xs text-gray-600">Kedelai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-xs text-gray-600">Kacang Tanah</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#84cc16]"></div>
                  <span className="text-xs text-gray-600">Kacang Hijau</span>
                </div>
              </div>
            </div>
            <DateRangeFilter onFilterChange={handleFilterChange} />
          </div>

          <HorizontalBarChart data={showAllKecamatan ? harvestTrends : harvestTrends.slice(0, 5)} />

          {harvestTrends.length > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllKecamatan(!showAllKecamatan)}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 hover:text-green-700"
              >
                {showAllKecamatan ? (
                  <>
                    <ChevronUpIcon className="h-4 w-4" />
                    Tampilkan Lebih Sedikit
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    Tampilkan Semua ({harvestTrends.length} Kecamatan)
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Pupuk Anomalies Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Anomali Pupuk Terbuka</h2>
              <Link
                href="/pupuk/anomali"
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Lihat Semua
                <LinkIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {DASHBOARD_OPEN_ANOMALIES.length > 0 ? (
            <div className="space-y-3">
              {DASHBOARD_OPEN_ANOMALIES.map((anomaly) => (
                <div
                  key={anomaly.id}
                  className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 rounded-lg p-2 ${
                        anomaly.severity === "high"
                          ? "bg-red-50"
                          : anomaly.severity === "medium"
                          ? "bg-amber-50"
                          : "bg-blue-50"
                      }`}
                    >
                      <AlertTriangleIcon
                        className={`h-5 w-5 ${
                          anomaly.severity === "high"
                            ? "text-red-600"
                            : anomaly.severity === "medium"
                            ? "text-amber-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900">{anomaly.pupukName}</p>
                          <p className="mt-1 text-sm text-gray-600">{anomaly.description}</p>
                          <p className="mt-2 text-xs text-gray-500">
                            {anomaly.kelompokTaniName} • {new Date(anomaly.detectedAt).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                        <div
                          className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                            anomaly.severity === "high"
                              ? "bg-red-100 text-red-700"
                              : anomaly.severity === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {anomaly.severity === "high" ? "Tinggi" : anomaly.severity === "medium" ? "Sedang" : "Rendah"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-600">Tidak ada anomali terbuka saat ini</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
