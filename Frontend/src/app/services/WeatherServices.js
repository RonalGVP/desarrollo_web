export const fetchWeatherData = async () => {

    try {
      const response = await fetch(
        "https://my.meteoblue.com/packages/basic-1h_agro-1h?lat=47.56&lon=7.57&apikey=d7Vo1slLyqZGtN6Y"
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.data_1h;
    } catch (err) {
      console.error('Error fetching weather data:', err);
      throw err;
    }
  };

