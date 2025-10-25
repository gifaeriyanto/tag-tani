interface CommodityData {
  name: string;
  value: number;
  color: string;
}

interface KecamatanData {
  label: string;
  commodities: CommodityData[];
}

interface HorizontalBarChartProps {
  data: KecamatanData[];
}

const commodityColors: { [key: string]: string } = {
  Padi: '#22c55e',
  Jagung: '#eab308',
  Kedelai: '#f97316',
  'Kacang Tanah': '#ef4444',
  'Kacang Hijau': '#84cc16',
};

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  // Calculate max value across all commodities
  const maxValue = Math.max(
    ...data.flatMap((kec) => kec.commodities.map((c) => c.value))
  );

  return (
    <div className="space-y-6">
      {data.map((kecamatan, kecIndex) => {
        const totalValue = kecamatan.commodities.reduce(
          (sum, commodity) => sum + commodity.value,
          0
        );

        return (
          <div key={kecIndex} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{kecamatan.label}</h3>
              <span className="text-sm font-medium text-gray-600">
                Total: {totalValue.toLocaleString('id-ID')} ton
              </span>
            </div>

            <div className="space-y-1.5">
              {kecamatan.commodities.map((commodity, comIndex) => {
                const percentage = (commodity.value / maxValue) * 100;

                return (
                  <div key={comIndex} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 w-28 flex-shrink-0">
                      {commodity.name}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: commodity.color,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-16 text-right">
                        {commodity.value.toLocaleString('id-ID')} ton
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
