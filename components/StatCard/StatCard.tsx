import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isNegative?: boolean;
  };
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor,
  iconColor,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBgColor} rounded-lg p-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>

      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span
            className={`text-sm font-medium mb-1 ${
              trend.isNegative ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {trend.isNegative ? '↓' : '↑'} {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
}
