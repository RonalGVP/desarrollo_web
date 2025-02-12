// import { useState } from 'react';
// import fetchGpt4Response from '../services/chatgptServices';

// const useChatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const sendMessage = async (query) => {
//     // Evitar enviar solicitudes si ya estamos esperando una respuesta
//     if (loading) return;

//     // Agregar el mensaje del usuario
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: query },
//     ]);

//     try {
//       setLoading(true);
//       setError(null);

//       // Llamada a la API para obtener la respuesta del bot (GPT-4)
//       const response = await fetchGpt4Response(query);

//       // Agregar la respuesta del bot
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: response },
//       ]);
//     } catch (err) {
//       setError('Error al obtener respuesta de GPT-4: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { messages, sendMessage, loading, error };
// };

// export default useChatbot;


import { useState } from 'react';
import fetchGpt4Response from '../services/chatweather';

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null); // Guardar el tiempo de la última solicitud

  const sendMessage = async (query) => {
    // Evitar enviar solicitudes si ya estamos esperando una respuesta
    if (loading) return;

    // Evitar enviar solicitudes con demasiada rapidez
    const now = Date.now();
    if (lastRequestTime && now - lastRequestTime < 1000) { // Evitar enviar solicitudes más rápido que cada 1 segundo
      setError("Por favor, espera un momento antes de enviar otra solicitud.");
      return;
    }

    // Agregar el mensaje del usuario
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: query },
    ]);

    try {
      setLoading(true);
      setError(null);

      // Actualizar el tiempo de la última solicitud
      setLastRequestTime(now);

      // Llamada a la API para obtener la respuesta del bot (GPT-4)
      const response = await fetchGpt4Response(query);

      // Agregar la respuesta del bot
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response },
      ]);
    } catch (err) {
      setError('Error al obtener respuesta de GPT-4: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};

export default useChatbot;

