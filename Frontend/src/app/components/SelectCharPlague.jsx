'use client';

import { useState } from "react";
import { 
  LineChart,
  ScatterChart,
  Grid2X2,
  BarChart4,
  PieChart,
  ActivitySquare
} from "lucide-react";

const chartTypes = [
  {
    value: "line",
    label: "Evolución Temporal",
    icon: LineChart,
    color: "text-emerald-500"
  },
  {
    value: "scatter",
    label: "Correlación de Variables",
    icon: ScatterChart,
    color: "text-blue-500"
  },
  {
    value: "heatmap",
    label: "Distribución Espacial",
    icon: Grid2X2,
    color: "text-orange-500"
  },
 
];

export default function SelectChart({ onChange }) {
  const [selectedChart, setSelectedChart] = useState(null);

  const handleChartSelect = (chart) => {
    setSelectedChart(chart);
    onChange(chart.value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-grow grid grid-cols-3 gap-3 p-2">
        {chartTypes.map((chart) => {
          const Icon = chart.icon;
          const isSelected = selectedChart?.value === chart.value;
          
          return (
            <div
              key={chart.value}
              onClick={() => handleChartSelect(chart)}
              className={`
                flex flex-col items-center justify-center p-4
                rounded-lg cursor-pointer transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95
                ${isSelected 
                  ? `${chart.color} bg-gray-50 border-2 border-gray-200 shadow-md` 
                  : 'bg-white hover:bg-gray-50 border border-gray-200'}
              `}
            >
              <div className="flex flex-col items-center justify-center w-full h-full">
                <Icon
                  size={32}
                  className={`
                    mb-3 transition-all duration-300
                    ${chart.color}
                    ${isSelected ? 'scale-110' : ''}
                  `}
                />
                <p className={`
                  text-xs font-medium text-center px-1 transition-colors duration-300
                  ${isSelected ? 'text-gray-800' : 'text-gray-600'}
                `}>
                  {chart.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedChart && (
        <div 
          className={`
            w-full p-3 text-center text-sm rounded-lg
            bg-gray-50 border border-gray-200
            transform transition-all duration-300 ease-in-out
            ${selectedChart.color.replace('text-', 'text-')}
          `}
        >
          Tipo de visualización: {selectedChart.label}
        </div>
      )}
    </div>
  );
}