export default function PenyuluhLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-8">
        <div className="animate-pulse space-y-4">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="h-10 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>

          {/* Search skeleton */}
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-6" />

          {/* Cards skeleton */}
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
