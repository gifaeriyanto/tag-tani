export default function PupukCreateLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-[220px] mt-16 p-8">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-96 bg-gray-200 rounded" />
          </div>

          {/* Form skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            ))}
            <div className="flex justify-end gap-3 pt-4">
              <div className="h-10 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
