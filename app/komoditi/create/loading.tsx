export default function CreateKomoditiLoading() {
  return (
    <div className="flex">
      <div className="ml-[220px] mt-16 w-full p-8">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
          </div>

          {/* Form sections skeleton */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Button skeleton */}
          <div className="flex justify-end gap-3">
            <div className="h-10 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
