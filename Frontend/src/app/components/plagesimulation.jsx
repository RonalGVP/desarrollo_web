'use client';

import { useState } from "react";
import LineChartPlague from "./chartsPlague/LineChart";
import ScatterChartPlague from "./chartsPlague/ScatterChart";
import HeatmapChartPlague from "./chartsPlague/HeatmapChart";
import { getChartOptions } from "../utils/chartUtils";
import { filterDataByDateRange } from "../utils/dataUtils";
import { useWeatherData } from "../hooks/useWeatherData";
import DateRangePicker from "./DateRangePicker";
import SelectChart from "./SelectCharPlague";
import Navbar from "./Navbar";

export default function PlagueSimulation() {
  const [selectedChart, setSelectedChart] = useState("line");
  const [dateRange, setDateRange] = useState({
    start: new Date("2025-01-09"),
    end: new Date("2025-02-19"),
  });

  const { weatherData, loading, error } = useWeatherData();
  const filteredData = weatherData ? filterDataByDateRange(weatherData, dateRange) : null;

  if (loading) return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600">Error al obtener datos: {error}</p>
      </div>
    </>
  );

  const chartComponents = {
    line: LineChartPlague,
    scatter: ScatterChartPlague,
    heatmap: HeatmapChartPlague,
  };

  const ChartComponent = chartComponents[selectedChart];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Simulación de Plagas
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            <SelectChart onChange={setSelectedChart} />
          </div>

          {/* Contenedor centrado para los gráficos */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-4xl bg-white rounded-lg p-4 shadow-inner">
              {filteredData ? (
                <div className="aspect-video">
                  <ChartComponent 
                    filteredData={filteredData} 
                    options={getChartOptions("Simulación de Plagas")} 
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">
                    No hay datos filtrados disponibles.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

