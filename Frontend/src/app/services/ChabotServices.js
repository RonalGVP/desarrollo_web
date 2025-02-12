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
      throw new Error('Error al enviar el mensaje');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error:', error);
    return 'Hubo un error al procesar tu mensaje.';
  }
};