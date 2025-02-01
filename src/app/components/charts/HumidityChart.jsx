import { Bar, Line } from 'react-chartjs-2';
import { CloudRain, Droplets } from 'lucide-react';

export default function HumidityChart({ filteredData }) {
  const chartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 600
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.6)'
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          }
        }
      }
    }
  };

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
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500/60" />
              <span className="text-sm text-slate-600">Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="text-sm text-slate-600">Convectiva</span>
            </div>
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
          options={{
            ...chartOptions,
            scales: {
              ...chartOptions.scales,
              y: {
                ...chartOptions.scales.y,
                title: {
                  display: true,
                  text: 'Precipitación (mm)',
                  font: {
                    family: "'Inter', sans-serif",
                    size: 12,
                    weight: 500
                  }
                }
              }
            }
          }}
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
          <div className="px-3 py-1.5 bg-blue-100 rounded-lg">
            <span className="text-sm font-medium text-blue-700">Promedio: {
              (filteredData.relativehumidity.reduce((a, b) => a + b, 0) / filteredData.relativehumidity.length).toFixed(1)
            }%</span>
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
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: 'white',
                pointHoverBorderColor: 'rgb(59, 130, 246)',
                pointHoverBorderWidth: 2,
              },
            ],
          }}
          options={{
            ...chartOptions,
            scales: {
              ...chartOptions.scales,
              y: {
                ...chartOptions.scales.y,
                title: {
                  display: true,
                  text: 'Humedad (%)',
                  font: {
                    family: "'Inter', sans-serif",
                    size: 12,
                    weight: 500
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}