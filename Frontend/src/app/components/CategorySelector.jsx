import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Wind, CloudSun, Thermometer, Leaf, Snowflake, CloudRain } from 'lucide-react';
import HumidityChart from './charts/HumidityChart';
import WindChart from './charts/WindChart';
import EvapotranspirationChart from './charts/EvapotranspirationChart';
import PressureChart from './charts/PressureChart';
import SoilChart from './charts/SoilChart';
import SolarChart from './charts/SolarChart';
import SnowChart from './charts/SnowChart';

const categories = [
  { value: 'humidity', label: 'Humedad y Precipitación', icon: Droplet, color: 'text-blue-500' },
  { value: 'wind', label: 'Viento', icon: Wind, color: 'text-gray-500' },
  { value: 'solar', label: 'Luz Solar y UV', icon: CloudSun, color: 'text-yellow-500' },
  { value: 'pressure', label: 'Presión y Flujo de Calor', icon: Thermometer, color: 'text-red-500' },
  { value: 'soil', label: 'Suelo', icon: Leaf, color: 'text-green-500' },
  { value: 'snow', label: 'Nieve', icon: Snowflake, color: 'text-sky-300' },
  { value: 'evapotranspiration', label: 'Evapotranspiración', icon: CloudRain, color: 'text-indigo-400' },
];

function CategorySelector({ onChange, selectedCategory, filteredData }) {
  const handleCategorySelect = (category) => {
    onChange(category.value);
  };

  const renderGraph = () => {
    switch (selectedCategory) {
      case 'humidity': return <HumidityChart filteredData={filteredData} />;
      case 'wind': return <WindChart filteredData={filteredData} />;
      case 'evapotranspiration': return <EvapotranspirationChart filteredData={filteredData} />;
      case 'pressure': return <PressureChart filteredData={filteredData} />;
      case 'soil': return <SoilChart filteredData={filteredData} />;
      case 'solar': return <SolarChart filteredData={filteredData} />;
      case 'snow': return <SnowChart filteredData={filteredData} />;
      default: return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-3 gap-2 p-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.value;

          return (
            <motion.div
              key={category.value}
              onClick={() => handleCategorySelect(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer transition-all
                ${isSelected ? `${category.color} bg-blue-50 border-2 border-blue-300` : 'bg-gray-100 hover:bg-blue-50'}
              `}
            >
              <Icon size={40} className={`mb-2 ${category.color} ${isSelected ? 'animate-pulse' : ''}`} />
              <p className={`text-xs font-medium text-center px-1 ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                {category.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Contenedor del gráfico */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-inner min-h-[400px] mt-4">
        {renderGraph()}
      </div>
    </div>
  );
}

export default CategorySelector;
