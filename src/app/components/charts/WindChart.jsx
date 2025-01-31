import { Radar } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export default function WindChart({ filteredData }) {
  return (
    <Radar
      data={{
        labels: filteredData.time,
        datasets: [
          {
            label: 'Velocidad del Viento (m/s)',
            data: filteredData.windspeed,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6',
          },
        ],
      }}
      options={getChartOptions('Velocidad del Viento')}
    />
  );
}