// services/ChabotServices.js

export const sendMessage = async (message) => {
  try {
    const response = await fetch('http://localhost:5000/api/chatbot/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el mensaje, asegurese de usar ¿? y en caso q especifique datos use sus respectivos signos °C y %');
    }

    const data = await response.json();
    return data; // Debe contener { message, recommendations }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Hubo un error al procesar tu mensaje.');
  }
};
