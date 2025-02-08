'use client'
import { Line } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export default function PressureChart({ filteredData }) {
  return (
    <Line
      data={{
        labels: filteredData.time,
        datasets: [
          {
            label: 'Presión al Nivel del Mar (hPa)',
            data: filteredData.sealevelpressure,
            borderColor: '#3b82f6',
          },
          {
            label: 'Flujo de Calor Sensible',
            data: filteredData.sensibleheatflux,
            borderColor: '#22c55e',
          },
          {
            label: 'Temperatura Superficial (°C)',
            data: filteredData.skintemperature,
            borderColor: '#f97316',
          },
        ],
      }}
      options={getChartOptions('Presión y Temperatura')}
    />
  );
}
