'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PlagueChart = ({ filteredData }) => {
  const calculateDegreeDays = (temperature, baseTemperature = 5) => {
    return Math.max(temperature - baseTemperature, 0);
  };

  const accumulatedDegreeDays = filteredData.reduce((acc, data) => {
    const degreeDays = calculateDegreeDays(data.temperature);
    return acc + degreeDays;
  }, 0);

  const plagueStage = (accumulatedDegreeDays) => {
    if (accumulatedDegreeDays < 100) return 'Huevo';
    if (accumulatedDegreeDays < 300) return 'Larva';
    if (accumulatedDegreeDays < 500) return 'Pupa';
    return 'Adulto';
  };

  const labels = filteredData.map((data) => data.time);
  const degreeDaysData = filteredData.map((data, index) =>
    filteredData.slice(0, index + 1).reduce((acc, d) => acc + calculateDegreeDays(d.temperature), 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Grados-Día Acumulados',
        data: degreeDaysData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Etapa de la Plaga: ${plagueStage(accumulatedDegreeDays)}`,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PlagueChart;