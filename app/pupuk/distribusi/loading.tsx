export default function PupukDistributionLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-[220px] mt-16 p-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-10 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-96 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-6 h-24" />
            ))}
          </div>

          {/* Search and filters skeleton */}
          <div className="mb-6 space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
