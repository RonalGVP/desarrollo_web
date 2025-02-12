export const fetchWeatherData = async (date) => {
  try {
    const response = await fetch(
      "https://my.meteoblue.com/packages/basic-1h_agro-1h?lat=47.56&lon=7.57&apikey=d7Vo1slLyqZGtN6Y"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Verificamos si data_1h existe y tiene los datos correctos
    if (data.data_1h && Array.isArray(data.data_1h.time) && data.data_1h.time.length > 0) {
      // Convertimos la fecha solicitada al formato de la API "YYYY-MM-DD hh:mm"
      const targetDate = date || new Date().toISOString().split('T')[0]; // Si no se proporciona fecha, usar la fecha actual

      // Filtramos los datos para que coincidan con la fecha solicitada
      const filteredData = data.data_1h.time
        .map((time, index) => ({
          time: time,
          temperature: data.data_1h.temperature[index],
          relativehumidity: data.data_1h.relativehumidity[index]
        }))
        .filter(item => item.time.startsWith(targetDate));  // Compara solo la parte de la fecha sin la hora

      return filteredData;  // Retornamos los datos filtrados
    } else {
      throw new Error("No se encontraron datos climáticos.");
    }
  } catch (err) {
    console.error('Error fetching weather data:', err);
    throw err;
  }
};
