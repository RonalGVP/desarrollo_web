import { Bar, Line } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export default function HumidityChart({ filteredData }) {
  return (
    <div className="space-y-6">
      <Bar
        data={{
          labels: filteredData.time,
          datasets: [
            {
              label: 'Precipitación',
              data: filteredData.precipitation,
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
            },
            {
              label: 'Precipitación Convectiva',
              data: filteredData.convective_precipitation,
              backgroundColor: 'rgba(34, 197, 94, 0.6)',
            },
          ],
        }}
        options={getChartOptions('Precipitación')}
      />
      <Line
        data={{
          labels: filteredData.time,
          datasets: [
            {
              label: 'Humedad Relativa (%)',
              data: filteredData.relativehumidity,
              borderColor: '#3b82f6',
              fill: true,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          ],
        }}
        options={getChartOptions('Humedad Relativa')}
      />
    </div>
  );
}