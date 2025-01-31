'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import Select from './ui/select';
import Spinner from './ui/spinner';
import { fetchWeatherData } from '../services/WeatherServices';
import { filterDataByDateRange } from '../utils/dataUtils';
import HumidityChart from './charts/HumidityChart';
import WindChart from './charts/WindChart';
import EvapotranspirationChart from './charts/EvapotranspirationChart';
import PressureChart from './charts/PressureChart';
import SoilChart from './charts/SoilChart';
import SolarChart from './charts/SolarChart';
import SnowChart from './charts/SnowChart';

// 🔹 Importa y registra las escalas y elementos necesarios de Chart.js
import {
  Chart as ChartJS,
  CategoryScale, // <- 🔹 Esto evita el error
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 🔹 Registra las escalas y elementos
ChartJS.register(
  CategoryScale, // <- 🔹 Registra CategoryScale
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

function WeatherStats() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('humidity');
  const [dateRange, setDateRange] = useState({
    start: new Date('2025-01-28'),
    end: new Date('2025-02-02'),
  });

  const categories = [
    { value: 'humidity', label: 'Humedad y Precipitación' },
    { value: 'evapotranspiration', label: 'Evapotranspiración' },
    { value: 'wind', label: 'Viento' },
    { value: 'pressure', label: 'Presión y Flujo de Calor' },
    { value: 'soil', label: 'Suelo' },
    { value: 'solar', label: 'Luz Solar y UV' },
    { value: 'snow', label: 'Nieve' },
  ];

  const handleDateChange = (type, value) => {
    setDateRange((prev) => ({
      ...prev,
      [type]: new Date(value),
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderGraph = () => {
    if (!weatherData) return null;
    const filteredData = filterDataByDateRange(weatherData, dateRange);

    switch (selectedCategory) {
      case 'humidity':
        return <HumidityChart filteredData={filteredData} />;
      case 'wind':
        return <WindChart filteredData={filteredData} />;
      case 'evapotranspiration':
        return <EvapotranspirationChart filteredData={filteredData} />;
      case 'pressure':
        return <PressureChart filteredData={filteredData} />;
      case 'soil':
        return <SoilChart filteredData={filteredData} />;
      case 'solar':
        return <SolarChart filteredData={filteredData} />;
      case 'snow':
        return <SnowChart filteredData={filteredData} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="h-16 w-16" color="border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
            <CardTitle className="text-2xl font-bold text-white">Estadísticas del Clima</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <Select options={categories} value={selectedCategory} onChange={setSelectedCategory} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicial</label>
                  <input
                    type="date"
                    value={dateRange.start.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Final</label>
                  <input
                    type="date"
                    value={dateRange.end.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-inner">
              {renderGraph()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WeatherStats;