import { Bar, Line, Radar } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export function renderGraph(selectedCategory, filteredData) {
  switch (selectedCategory) {
    case 'humidity':
      return (
        <div className="space-y-6">
          <Bar data={{ labels: filteredData.time, datasets: [{ label: 'Precipitación', data: filteredData.precipitation, backgroundColor: 'rgba(59, 130, 246, 0.6)' }] }} options={getChartOptions('Precipitación')} />
          <Line data={{ labels: filteredData.time, datasets: [{ label: 'Humedad (%)', data: filteredData.relativehumidity, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }] }} options={getChartOptions('Humedad Relativa')} />
        </div>
      );
    case 'wind':
      return <Radar data={{ labels: filteredData.time, datasets: [{ label: 'Viento', data: filteredData.windspeed, backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6' }] }} options={getChartOptions('Velocidad del Viento')} />;
    default:
      return null;
  }
}
