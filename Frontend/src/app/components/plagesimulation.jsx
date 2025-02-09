import { useState, useEffect } from "react";
import LineChartPlague from "./chartsPlague/LineChart";
import ScatterChartPlague from "./chartsPlague/ScatterChart";
import HeatmapChartPlague from "./chartsPlague/HeatmapChart";
import { getChartOptions } from "../utils/chartUtils";
import { filterDataByDateRange } from "../utils/dataUtils"; // Asegúrate de importar la función
import { useWeatherData } from "../hooks/useWeatherData";
import DateRangePicker from "./DateRangePicker"; // Asegúrate de tener un componente de selección de rango de fechas
import SelectChart from "./SelectCharPlague"; // Aquí importamos el nuevo componente SelectChart

export default function PlagueSimulation() {
  const [selectedChart, setSelectedChart] = useState("line");
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date("2025-01-09"),
    end: new Date("2025-02-19"),
  });

  // Suponiendo que useWeatherData obtiene los datos meteorológicos
  const { weatherData } = useWeatherData(); // O ajusta según tu forma de obtener datos

  useEffect(() => {
    if (weatherData) {
      // Filtrar los datos usando la función filterDataByDateRange
      const data = filterDataByDateRange(weatherData, dateRange);
      setFilteredData(data);
      setLoading(false);
    }
  }, [weatherData, dateRange]); // Ahora depende del dateRange también

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    setLoading(true); // Vuelve a cargar los datos cuando el rango cambie
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al obtener datos: {error}</p>;

  // Los componentes de gráfico
  const chartComponents = {
    line: LineChartPlague,
    scatter: ScatterChartPlague,
    heatmap: HeatmapChartPlague,
  };

  const ChartComponent = chartComponents[selectedChart];

  return (
    <div>
      <h2>Simulación de Plagas</h2>

      {/* Selector de fecha */}
      <div>
        <h3>Seleccionar Rango de Fechas</h3>
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      {/* Usamos el componente SelectChart */}
      <div>
        <h3>Seleccionar Tipo de Gráfico</h3>
        <SelectChart onChange={setSelectedChart} />
      </div>

      {/* Renderizado del gráfico */}
      <div>
        {filteredData ? (
          <ChartComponent filteredData={filteredData} options={getChartOptions("Simulación de Plagas")} />
        ) : (
          <p>No hay datos filtrados disponibles.</p>
        )}
      </div>
    </div>
  );
}
