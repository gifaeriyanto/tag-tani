interface OrderCardProps {
  carName: string;
  customerName: string;
  dateRange: string;
  price: string;
  isPaid: boolean;
}

export function OrderCard({
  carName,
  customerName,
  dateRange,
  price,
  isPaid,
}: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{carName}</h3>
        {isPaid && (
          <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
            PAID
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-1">
        {customerName} • {dateRange}
      </p>

      <p className="text-sm font-semibold text-gray-900">{price}</p>
    </div>
  );
}
