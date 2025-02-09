'use client';
import { Line } from "react-chartjs-2";
import { useWeatherData } from "../../hooks/useWeatherData"; 
import { getChartOptions } from "../../utils/chartUtils";

export default function LineChartPlague({ filteredData }) {
  const { weatherData, loading, error } = useWeatherData();

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al obtener datos: {error}</p>;
  if (!weatherData || Object.keys(weatherData).length === 0) return <p>No hay datos disponibles.</p>;

  // Verifica si los datos están siendo pasados correctamente en `filteredData`
  console.log("Filtered data recibido:", filteredData);

  // Asegúrate de que `filteredData` contiene las claves correctas
  if (!filteredData || !filteredData.time || !filteredData.temperature || !filteredData.relativehumidity) {
    return <p>No hay datos suficientes para generar el gráfico.</p>;
  }

  // Datos que se pasarán al gráfico
  const data = {
    labels: filteredData.time,
    datasets: [
      {
        label: "Temperatura a lo largo del tiempo",
        data: filteredData.temperature,
        borderColor: "#ff6384",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: false,  // Asegúrate de que no haya un relleno que interfiera
      },
      {
        label: "Humedad Relativa a lo largo del tiempo",
        data: filteredData.relativehumidity,
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: false,  // Asegúrate de que no haya un relleno que interfiera
      }
    ],
  };

  return <Line data={data} options={getChartOptions("Crecimiento de la plaga: Temperatura y Humedad Relativa")} />;
}
