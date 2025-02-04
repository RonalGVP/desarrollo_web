import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, Wind, CloudSun, Thermometer, Leaf, Snowflake, CloudRain 
} from 'lucide-react';

const categories = [
  { 
    value: 'humidity', 
    label: 'Humedad y Precipitación', 
    icon: Droplet,
    color: 'text-blue-500'
  },
  { 
    value: 'wind', 
    label: 'Viento', 
    icon: Wind,
    color: 'text-gray-500'
  },
  { 
    value: 'solar', 
    label: 'Luz Solar y UV', 
    icon: CloudSun,
    color: 'text-yellow-500'
  },
  { 
    value: 'pressure', 
    label: 'Presión y Flujo de Calor', 
    icon: Thermometer,
    color: 'text-red-500'
  },
  { 
    value: 'soil', 
    label: 'Suelo', 
    icon: Leaf,
    color: 'text-green-500'
  },
  { 
    value: 'snow', 
    label: 'Nieve', 
    icon: Snowflake,
    color: 'text-sky-300'
  },
  { 
    value: 'evapotranspiration', 
    label: 'Evapotranspiración', 
    icon: CloudRain,
    color: 'text-indigo-400'
  }
];

function CategorySelector({ onChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onChange(category.value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow grid grid-cols-3 gap-2 p-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory?.value === category.value;

          return (
            <motion.div
              key={category.value}
              onClick={() => handleCategorySelect(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex flex-col items-center justify-center 
                w-full h-full rounded-lg cursor-pointer transition-all
                ${isSelected 
                  ? `${category.color} bg-blue-50 border-2 border-blue-300` 
                  : 'bg-gray-100 hover:bg-blue-50'}
              `}
            >
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  <Icon 
                    size={40} 
                    className={`
                      mb-2 
                      ${category.color}
                      ${isSelected ? 'animate-pulse' : ''}
                    `} 
                  />
                  <p className={`
                    text-xs font-medium text-center px-1
                    ${isSelected ? 'text-blue-700' : 'text-gray-700'}
                  `}>
                    {category.label}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-2 text-center text-sm text-gray-600 bg-gray-50"
        >
          Categoría seleccionada: {selectedCategory.label}
        </motion.div>
      )}
    </div>
  );
}

export default CategorySelector;