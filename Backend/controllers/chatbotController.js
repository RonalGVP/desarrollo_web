export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Extraer temperatura y humedad del mensaje
    const regex = /(\d+)\s?°?C/; // Para encontrar la temperatura (puede incluir °C)
    const regexHumidity = /(\d+)%/; // Para encontrar la humedad

    const temperatureMatch = message.match(regex);
    const humidityMatch = message.match(regexHumidity);

    if (!temperatureMatch || !humidityMatch) {
      return res.status(400).json({ error: "Debe proporcionar tanto la temperatura como la humedad." });
    }

    const temperature = parseInt(temperatureMatch[1]);
    const humidity = parseInt(humidityMatch[1]);

    // Lógica para determinar la proliferación de plagas en base a temperatura y humedad
    let plagueMessage = "En base a los valores proporcionados, las siguientes plagas pueden proliferar: ";

    // Evaluar en función de temperatura y humedad
    if (temperature > 25 && humidity > 70) {
      plagueMessage += "Mosquitos, moscas, y termitas. Las condiciones son ideales para su proliferación.";
    } else if (temperature > 20 && humidity > 50) {
      plagueMessage += "Hormigas y cucarachas. Son más activos bajo estas condiciones.";
    } else if (temperature > 15 && humidity < 50) {
      plagueMessage += "Plagas menores como pulgas y arañas. Menos prolíferas, pero aún presentes.";
    } else {
      plagueMessage += "Las condiciones no son ideales para la proliferación de plagas.";
    }

    res.status(200).json({ message: plagueMessage });
  } catch (error) {
    console.error("Error completo:", error.response?.data);
    res.status(500).json({ error: error.message });
  }
};
