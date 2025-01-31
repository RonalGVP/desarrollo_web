import { Bar } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export default function SnowChart({ filteredData }) {
  return (
    <Bar
      data={{
        labels: filteredData.time,
        datasets: [
          {
            label: 'Fracción de Nieve (%)',
            data: filteredData.snowfraction,
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
          },
        ],
      }}
      options={getChartOptions('Fracción de Nieve')}
    />
  );
}