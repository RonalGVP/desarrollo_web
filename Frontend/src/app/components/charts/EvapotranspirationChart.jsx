'use client'
import { Line } from 'react-chartjs-2';
import { getChartOptions } from '../../utils/chartUtils';

export default function EvapotranspirationChart({ filteredData }) {
  return (
    <Line
      data={{
        labels: filteredData.time,
        datasets: [
          {
            label: 'Evapotranspiración',
            data: filteredData.evapotranspiration,
            borderColor: '#3b82f6',
          },
          {
            label: 'Evapotranspiración Potencial',
            data: filteredData.potentialevapotranspiration,
            borderColor: '#22c55e',
          },
          {
            label: 'Evapotranspiración FAO',
            data: filteredData.referenceevapotranspiration_fao,
            borderColor: '#f97316',
          },
        ],
      }}
      options={getChartOptions('Evapotranspiración')}
    />
  );
}