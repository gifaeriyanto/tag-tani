export default function KomoditiLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-8">
        <div className="animate-pulse space-y-4">
          {/* Header skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-10 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>

          {/* Search bar skeleton */}
          <div className="mb-6 h-10 w-64 bg-gray-200 rounded" />

          {/* List items skeleton */}
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-lg border border-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
