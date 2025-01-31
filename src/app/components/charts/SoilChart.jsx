
import { Line } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export default function SoilChart({ filteredData }) {
  return (
    <Line
      data={{
        labels: filteredData.time,
        datasets: [
          {
            label: 'Humedad del Suelo (0-10 cm)',
            data: filteredData.soilmoisture_0to10cm,
            borderColor: '#3b82f6',
          },
          {
            label: 'Temperatura del Suelo (0-10 cm)',
            data: filteredData.soiltemperature_0to10cm,
            borderColor: '#f97316',
          },
        ],
      }}
      options={getChartOptions('Condiciones del Suelo')}
    />
  );
}