function DateRangePicker({ dateRange, setDateRange }) {
    const handleDateChange = (type, value) => {
      setDateRange(prev => ({ ...prev, [type]: new Date(value) }));
    };
  
    return (
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicial</label>
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Final</label>
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
          />
        </div>
      </div>
    );
  }
  
  export default DateRangePicker;
  