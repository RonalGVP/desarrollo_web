'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { CalendarDays, Sunrise } from 'lucide-react';
import { fetchWeatherData } from '../services/WeatherServices';  
import { filterDataByDateRange } from '../utils/dataUtils';
import CategorySelector from '../components/CategorySelector';
import HumidityChart from './charts/HumidityChart';
import WindChart from './charts/WindChart';
import EvapotranspirationChart from './charts/EvapotranspirationChart';
import PressureChart from './charts/PressureChart';
import SoilChart from './charts/SoilChart';
import SolarChart from './charts/SolarChart';
import SnowChart from './charts/SnowChart';
import DateRangePicker from '../components/DateRangePicker';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const categories = [
  { value: 'humidity', label: 'Humedad' },
  { value: 'wind', label: 'Viento' },
  { value: 'evapotranspiration', label: 'Evaporación' },
  { value: 'pressure', label: 'Presión' },
  { value: 'soil', label: 'Suelo' },
];

function WeatherStats() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('humidity');
  const [dateRange, setDateRange] = useState({
    start: new Date('2025-01-28'),
    end: new Date('2025-02-02'),
  });

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl rounded-xl overflow-hidden backdrop-blur-sm bg-white/90">
          <CardHeader className="bg-gradient-to-r from-sky-600 to-blue-700 p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Sunrise className="h-6 w-6" />
                Estadísticas Meteorológicas
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-8">
            {/* Category Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sky-900">
                Seleccionar Categoría
              </h3>
              <CategorySelector 
                value={selectedCategory} 
                onChange={setSelectedCategory} 
              />
            </div>

            {/* Date Range Selector */}
            <div className="space-y-4 bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-semibold text-sky-900 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-sky-700" />
                Rango de Fechas
              </h3>
              <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            </div>

            {/* Graph Container */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-inner min-h-[400px]">
              {renderGraph()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WeatherStats;
