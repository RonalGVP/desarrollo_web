'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { CalendarDays, Sunrise, CloudRain, Wind, Thermometer, BarChart2, Droplets } from 'lucide-react';
import { fetchWeatherData } from '../services/WeatherServices';
import { filterDataByDateRange } from '../utils/dataUtils';
import HumidityChart from './charts/HumidityChart';
import WindChart from './charts/WindChart';
import EvapotranspirationChart from './charts/EvapotranspirationChart';
import PressureChart from './charts/PressureChart';
import SoilChart from './charts/SoilChart';
import SolarChart from './charts/SolarChart';
import SnowChart from './charts/SnowChart';



const CategorySelect = ({ value, onChange, categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 
            ${value === category.value 
              ? 'bg-sky-600 text-white shadow-lg' 
              : 'bg-white/80 hover:bg-sky-50 text-sky-900 shadow-sm hover:shadow-md'}`}
        >
          {category.icon}
          <span className="font-medium">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

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
    { 
      value: 'humidity', 
      label: 'Humedad', 
      icon: <Droplets className="h-5 w-5" /> 
    },
    { 
      value: 'wind', 
      label: 'Viento', 
      icon: <Wind className="h-5 w-5" /> 
    },
    { 
      value: 'evapotranspiration', 
      label: 'Evaporación', 
      icon: <CloudRain className="h-5 w-5" /> 
    },
    { 
      value: 'pressure', 
      label: 'Presión', 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
    { 
      value: 'soil', 
      label: 'Suelo', 
      icon: <Thermometer className="h-5 w-5" /> 
    },
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-50">
        <div className="p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="animate-spin h-12 w-12 border-4 border-sky-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-50">
        <div className="bg-red-50/90 backdrop-blur-sm text-red-500 p-6 rounded-xl shadow-lg max-w-md">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Error
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
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
              <CategorySelect 
                value={selectedCategory} 
                onChange={setSelectedCategory}
                categories={categories}
              />
            </div>

            {/* Date Range Selector */}
            <div className="space-y-4 bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-semibold text-sky-900 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-sky-700" />
                Rango de Fechas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="block text-sm font-medium text-sky-800 mb-2">
                    Fecha Inicial
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dateRange.start.toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange('start', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-sky-200 
                               bg-white/80 backdrop-blur-sm
                               focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                               transition-all duration-200
                               text-sky-900 placeholder-sky-400
                               shadow-sm hover:shadow-md"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/10 to-blue-400/10 pointer-events-none" />
                  </div>
                </div>
                
                <div className="relative group">
                  <label className="block text-sm font-medium text-sky-800 mb-2">
                    Fecha Final
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dateRange.end.toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange('end', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-sky-200 
                               bg-white/80 backdrop-blur-sm
                               focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                               transition-all duration-200
                               text-sky-900 placeholder-sky-400
                               shadow-sm hover:shadow-md"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/10 to-blue-400/10 pointer-events-none" />
                  </div>
                </div>
              </div>
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