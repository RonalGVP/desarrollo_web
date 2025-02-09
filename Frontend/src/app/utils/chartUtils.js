import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ScatterController,  // Importación del ScatterElement
} from 'chart.js';
import { Bar, Line, Radar, Scatter } from 'react-chartjs-2';  // Importar Scatter desde react-chartjs-2
import { CloudRain, Droplets } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ScatterController  // Registrar el ScatterElement
);

export const getChartOptions = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: title,
    },
  },
});

export { Bar, Line, Radar, Scatter, CloudRain, Droplets };  // Exportar Scatter además de los otros componentes
