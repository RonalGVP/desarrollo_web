import axios from 'axios';

async function getWeatherData(location) {
  try {
    const response = await axios.get('https://yahoo-weather5.p.rapidapi.com/weather', {
      params: {
        location: location,
        format: 'json',
        u: 'f' // Usar Fahrenheit
      },
      headers: {
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
        'x-rapidapi-key': 'a1bdd7ab9amsh7dd1328c2b35fe0p1a3c8bjsnb8116b2d260'
      }
    });

    // Procesar la respuesta
    const weatherData = response.data;
    return weatherData;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    return null;
  }
}
