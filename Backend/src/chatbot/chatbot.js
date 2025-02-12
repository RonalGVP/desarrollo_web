// src/chatbot/chatbot.js
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getWeatherData } from '../services/weatherService';

export async function getWeatherChatbotResponse(userMessage, location) {
  try {
    // Obtener datos del clima
    const weatherData = await getWeatherData(location);

    if (!weatherData) {
      return "Lo siento, no pude obtener los datos del clima en este momento.";
    }

    // Extraer los datos relevantes del clima
    const temperature = weatherData.current_observation.condition.temperature;
    const conditions = weatherData.current_observation.condition.text;
    const city = weatherData.location.city;

    // Construir un mensaje que combine el clima con la consulta del usuario
    const messageToSend = `El clima en ${city} es de ${conditions} con una temperatura de ${temperature}°F. ¿En qué más te puedo ayudar?`;

    // Enviar el mensaje al chatbot para obtener una respuesta adicional
    const result = await streamText({
      model: openai('gpt-4o'),
      system: 'You are a helpful assistant.',
      messages: [
        { role: 'user', content: userMessage },
        { role: 'system', content: messageToSend }
      ],
    });

    return result;
  } catch (error) {
    console.error('Error en el chatbot:', error);
    return "Hubo un error al procesar tu solicitud.";
  }
}
