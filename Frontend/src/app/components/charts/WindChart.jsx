'use client'
import { Radar } from 'react-chartjs-2';
import { Wind } from 'lucide-react';

export default function WindChart({ filteredData }) {
  const getWindDirection = (speed) => {
    // Simplificado para ejemplo - normalmente se calcularía basado en datos reales
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const maxWindSpeed = Math.max(...filteredData.windspeed);
  const avgWindSpeed = (filteredData.windspeed.reduce((a, b) => a + b, 0) / filteredData.windspeed.length).toFixed(1);

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          color: 'rgba(226, 232, 240, 0.6)'
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.6)'
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          backdropColor: 'transparent'
        },
        pointLabels: {
          font: {
            family: "'Inter', sans-serif",
            size: 11,
            weight: 500
          },
          color: '#475569'
        }
      }
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
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const direction = getWindDirection(value);
            return `Velocidad: ${value} m/s - Dirección: ${direction}`;
          }
        },
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 600
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-sky-50/50 rounded-2xl p-6 shadow-lg">
      <div className="mb-6">
        {/* Header with Icon and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wind className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Velocidad del Viento</h2>
          </div>
        </div>

        {/* Wind Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Velocidad Máxima</p>
            <p className="text-2xl font-semibold text-blue-900">{maxWindSpeed} m/s</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Velocidad Promedio</p>
            <p className="text-2xl font-semibold text-blue-900">{avgWindSpeed} m/s</p>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="aspect-square max-w-2xl mx-auto">
        <Radar
          data={{
            labels: filteredData.time.map(time => time.split(' ')[1]), // Mostrar solo la hora
            datasets: [
              {
                label: 'Velocidad del Viento',
                data: filteredData.windspeed,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true
              }
            ]
          }}
          options={chartOptions}
        />
      </div>
    </div>
  );
}