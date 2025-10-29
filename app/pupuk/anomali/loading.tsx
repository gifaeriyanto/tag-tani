export default function PupukAnomalyLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-[220px] mt-16 p-8">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 w-64 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-96 bg-gray-200 rounded" />
          </div>

          {/* Metrics skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-6 h-24" />
            ))}
          </div>

          {/* Summary cards skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-2 bg-gray-200 rounded-full w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Search and filters skeleton */}
          <div className="mb-6 space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded-lg" />
            <div className="flex gap-2 flex-wrap">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-9 w-32 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>

          {/* Anomaly cards skeleton */}
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
