'use client';
import { Bar } from "react-chartjs-2";
import { getChartOptions } from "../../utils/chartUtils";

export default function HeatmapChartPlague({ filteredData }) {
  console.log("Filtered data recibido:", filteredData); // Verifica que se reciba correctamente

  // Verificar que se reciban datos y las claves necesarias
  if (!filteredData || !filteredData.time || !filteredData.soilmoisture_0to10cm
  ) {
    return <p>No hay datos suficientes para generar el gráfico.</p>;
  }

  const labels = filteredData.time;  // Las etiquetas en el eje X (por ejemplo, fechas)
  const dataValues = filteredData.soilmoisture_0to10cm
  ;  // Los valores de humedad del suelo

  // Asignar un color de fondo según el valor de humedad del suelo
  const backgroundColors = dataValues.map((value) =>
    value > 30 ? "#ff0000" : value > 15 ? "#ffa500" : "#008000"
  );

  // Configuración de los datos del gráfico
  const data = {
    labels,  // Las etiquetas de tiempo
    datasets: [
      {
        label: "Humedad del Suelo y Proliferación de Plaga",  // Etiqueta del gráfico
        data: dataValues,  // Los valores de humedad del suelo
        backgroundColor: backgroundColors,  // El color de fondo basado en la humedad
      },
    ],
  };

  // Renderizar el gráfico de barras
  return <Bar data={data} options={getChartOptions("Mapa de Calor de Plagas vs Humedad del Suelo")} />;
}
