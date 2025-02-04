'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Thermometer } from 'lucide-react';
import { fetchWeatherData } from '../services/WeatherServicesArray';
import DateRangePicker from '../components/DateRangePicker'; // Asegúrate de importar el componente correctamente
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PlagueChart from './charts/PlaguesChart';

const PlagueSimulation = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl rounded-xl overflow-hidden backdrop-blur-sm bg-white/90">
          <CardHeader className="bg-gradient-to-r from-sky-600 to-blue-700 p-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Thermometer className="h-6 w-6" />
              Simulación de Plagas
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Asegúrate de pasar la función setDateRange */}
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            
            {/* Plague Simulation Chart */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-inner min-h-[400px]">
              <PlagueChart weatherData={weatherData} dateRange={dateRange} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlagueSimulation;
