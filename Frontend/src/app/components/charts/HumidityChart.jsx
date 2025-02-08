'use client'
import {getChartOptions,CloudRain,Droplets,Bar,Line,Radar} from '../../utils/chartUtils'
export default function HumidityChart({ filteredData }) {
  return (
    <div className="space-y-8">
      {/* Precipitation Chart */}
      <div className="bg-gradient-to-br from-white to-sky-50/50 rounded-2xl p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CloudRain className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Precipitación</h2>
          </div>
        </div>
        <Bar
          data={{
            labels: filteredData.time,
            datasets: [
              {
                label: 'Precipitación Total',
                data: filteredData.precipitation,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
              },
              {
                label: 'Precipitación Convectiva',
                data: filteredData.convective_precipitation,
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
              },
            ],
          }}
          options={getChartOptions('Precipitación (mm)')}
        />
      </div>

      {/* Humidity Chart */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Humedad Relativa</h2>
          </div>
        </div>
        <Line
          data={{
            labels: filteredData.time,
            datasets: [
              {
                label: 'Humedad Relativa',
                data: filteredData.relativehumidity,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
              },
            ],
          }}
          options={getChartOptions('Humedad (%)')}
        />
      </div>
    </div>
  );
}
