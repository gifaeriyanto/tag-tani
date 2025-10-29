export default function PupukDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-[220px] mt-16 p-8">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-10 w-64 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Basic Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-200 rounded w-3/4" />
            ))}
          </div>

          {/* Stock Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg p-4 h-32" />
            ))}
          </div>

          {/* Tables skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
