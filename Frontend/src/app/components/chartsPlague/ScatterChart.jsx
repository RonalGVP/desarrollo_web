'use client';
import { Scatter } from "react-chartjs-2";
import { getChartOptions } from "../../utils/chartUtils";
import { calculateRegressionLine } from "../../utils/Plagueregression"; // Importamos la función de regresión

export default function ScatterChartPlague({ filteredData }) {
  // Verificar que los datos están disponibles
  if (!filteredData || Object.keys(filteredData).length === 0) return <p>No hay datos disponibles.</p>;

  // Obtener los datos de Temperatura y Humedad
  const xData = filteredData.temperature;
  const yData = filteredData.relativehumidity;

  // Calcular la regresión lineal
  const { regressionLine } = calculateRegressionLine(xData, yData); // Obtenemos la línea de regresión

  // Formatear los datos para ScatterChart usando filteredData
  const scatterData = {
    datasets: [
      {
        label: "Relación entre Temperatura y Humedad",
        data: xData.map((_, index) => ({
          x: xData[index], // Temperatura en el eje X
          y: yData[index], // Humedad relativa en el eje Y
        })),
        backgroundColor: "#36a2eb",
      },
      {
        label: "Línea de Regresión",
        data: xData.map((x, index) => ({
          x: x, // Temperatura en el eje X
          y: regressionLine[index], // Valor calculado de la línea de regresión
        })),
        borderColor: "#ff0000", // Color de la línea de regresión
        borderWidth: 2,
        fill: false, // No llenar la área debajo de la línea
        type: 'line', // Hacemos que esta serie sea una línea
      }
    ],
  };

  return (
    <div>
      {/* Aquí está el gráfico */}
      <Scatter data={scatterData} options={getChartOptions("Temperatura vs. Humedad con Regresión Lineal")} />
    </div>
  );
}
