import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

function DateRangePicker({ dateRange, setDateRange }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDateChange = (type, value) => {
    setDateRange(prev => ({ ...prev, [type]: new Date(value) }));
  };

  const adjustDate = (type, days) => {
    const newDate = new Date(dateRange[type]);
    newDate.setDate(newDate.getDate() + days);
    setDateRange(prev => ({ ...prev, [type]: newDate }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Rango de Fechas</h2>
        <CalendarIcon 
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
        />
      </div>

      <div className="flex space-x-4">
        {/* Start Date */}
        <motion.div 
          className="flex-1 relative"
          whileTap={{ scale: 0.98 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha Inicial
          </label>
          <div className="flex items-center space-x-2">
            <motion.button 
              onClick={() => adjustDate('start', -1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-blue-500"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <input
              type="date"
              value={dateRange.start.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="flex-grow px-3 py-2 border border-blue-200 rounded-md 
                         focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <motion.button 
              onClick={() => adjustDate('start', 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-blue-500"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(dateRange.start)}
          </p>
        </motion.div>

        {/* End Date */}
        <motion.div 
          className="flex-1 relative"
          whileTap={{ scale: 0.98 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha Final
          </label>
          <div className="flex items-center space-x-2">
            <motion.button 
              onClick={() => adjustDate('end', -1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-blue-500"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <input
              type="date"
              value={dateRange.end.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="flex-grow px-3 py-2 border border-blue-200 rounded-md 
                         focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <motion.button 
              onClick={() => adjustDate('end', 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-blue-500"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(dateRange.end)}
          </p>
        </motion.div>
      </div>

      {/* Optional Calendar View (can be expanded) */}
      {isCalendarVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-gray-50 rounded-lg"
        >
          {/* Placeholder for future calendar component */}
          <p className="text-center text-gray-500">Vista de Calendario próximamente</p>
        </motion.div>
      )}
    </div>
  );
}

export default DateRangePicker;