export const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        'https://my.meteoblue.com/packages/basic-1h_agro-1h?lat=47.56&lon=7.57&apikey=oGahnEkIrMS9HU8K'
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Asegurar que los datos sean un array con la estructura adecuada
      if (!data.data_1h || !Array.isArray(data.data_1h.time) || !Array.isArray(data.data_1h.temperature)) {
        return [];
      }
  
      // Transformar los datos en un array de objetos
      return data.data_1h.time.map((time, index) => ({
        time, 
        temperature: data.data_1h.temperature[index], 
      }));
    } catch (err) {
      console.error('Error fetching weather data:', err);
      return [];
    }
  };
  