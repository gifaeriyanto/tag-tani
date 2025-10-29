export default function PupukDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-[220px] mt-16 p-8">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 w-56 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-96 bg-gray-200 rounded" />
          </div>

          {/* Key metrics skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-6 h-24" />
            ))}
          </div>

          {/* Alert skeleton */}
          <div className="bg-gray-200 rounded-xl p-4 h-20 mb-8" />

          {/* Summary statistics skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Top sections skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recent distributions skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
