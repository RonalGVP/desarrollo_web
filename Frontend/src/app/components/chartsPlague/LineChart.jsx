'use client';
import { Line } from "react-chartjs-2";
import { useWeatherData } from "../../hooks/useWeatherData";
import { getChartOptions } from "../../utils/chartUtils";

export default function LineChartPlague({ filteredData }) {
  const { weatherData, loading, error } = useWeatherData();

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al obtener datos: {error}</p>;
  if (!weatherData || Object.keys(weatherData).length === 0) return <p>No hay datos disponibles.</p>;

  if (!filteredData || !filteredData.time || !filteredData.temperature || !filteredData.relativehumidity) {
    return <p>No hay datos suficientes para generar el gráfico.</p>;
  }

  // Obtener valores máximos y mínimos para normalizar el índice de plagas
  const tempMin = Math.min(...filteredData.temperature);
  const tempMax = Math.max(...filteredData.temperature);
  const humMin = Math.min(...filteredData.relativehumidity);
  const humMax = Math.max(...filteredData.relativehumidity);

  // Calcular el índice de proliferación de plagas
  const plagueRiskIndex = filteredData.temperature.map((temp, index) => {
    const normTemp = (temp - tempMin) / (tempMax - tempMin);
    const normHum = (filteredData.relativehumidity[index] - humMin) / (humMax - humMin);
    return normTemp * normHum * 100; // Normalizar el índice a una escala de 0-100
  });

  // Configuración de datos para el gráfico
  const data = {
    labels: filteredData.time,
    datasets: [
      {
        label: "Temperatura a lo largo del tiempo",
        data: filteredData.temperature,
        borderColor: "#ff6384",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: false,
      },
      {
        label: "Humedad Relativa a lo largo del tiempo",
        data: filteredData.relativehumidity,
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: false,
      },
      {
        label: "Índice de Proliferación de Plagas",
        data: plagueRiskIndex,
        borderColor: "#ffa500",
        backgroundColor: "rgba(255,165,0,0.2)",
        fill: false,
        borderDash: [5, 5], // Línea punteada para diferenciar
      },
    ],
  };

  return <Line data={data} options={getChartOptions("Crecimiento de la plaga: Temperatura, Humedad y Riesgo de Plagas")} />;
}
