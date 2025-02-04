'use client';
import { useEffect, useState } from 'react';
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
import { fetchWeatherData } from '../../services/WeatherServicesArray';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PlagueChart = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();

        // Asegurar que `data` sea un array antes de asignarlo
        const transformedData = Array.isArray(data)
          ? data.map((entry, index) => ({
              time: entry.time || `Punto ${index + 1}`, 
              temperature: entry.temperature || 0, 
            }))
          : [];

        setWeatherData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando datos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!Array.isArray(weatherData) || weatherData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No hay datos disponibles para mostrar.</p>
      </div>
    );
  }

  // Función para calcular Grados-Día
  const calculateDegreeDays = (temperature, baseTemperature = 5) => {
    return Math.max(temperature - baseTemperature, 0);
  };

  // Calcular acumulación de Grados-Día
  const accumulatedDegreeDays = weatherData.reduce((acc, data) => {
    return acc + calculateDegreeDays(data.temperature);
  }, 0);

  // Determinar la etapa de la plaga
  const plagueStage = (accumulatedDegreeDays) => {
    if (accumulatedDegreeDays < 100) return 'Huevo';
    if (accumulatedDegreeDays < 300) return 'Larva';
    if (accumulatedDegreeDays < 500) return 'Pupa';
    return 'Adulto';
  };

  // Eje X (Fechas) y eje Y (Grados-Día acumulados)
  const labels = weatherData.map((data) => data.time);
  const degreeDaysData = weatherData.map((data, index) =>
    weatherData
      .slice(0, index + 1)
      .reduce((acc, d) => acc + calculateDegreeDays(d.temperature), 0)
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
