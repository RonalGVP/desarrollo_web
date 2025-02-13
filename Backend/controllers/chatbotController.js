export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Extraer temperatura y humedad del mensaje
    const regex = /(\d+)\s?°?C/; // Para encontrar la temperatura (puede incluir °C)
    const regexHumidity = /(\d+)%/; // Para encontrar la humedad

    const temperatureMatch = message.match(regex);
    const humidityMatch = message.match(regexHumidity);

    if (!temperatureMatch || !humidityMatch) {
      return res.status(400).json({ error: "Sé más específico con el tema y asegúrate de usar los iconos de temperatura (°C) y humedad (%)." });
    }

    const temperature = parseInt(temperatureMatch[1]);
    const humidity = parseInt(humidityMatch[1]);

    // Lógica para determinar la proliferación de plagas en base a temperatura y humedad
    let plagueMessage = "En base a los valores proporcionados, las siguientes plagas pueden proliferar: ";
    let recommendations = "";

    // Evaluación por cultivo y plagas

    // Gusano perforador de la caña
    if (message.toLowerCase().includes("gusano perforador de la caña")) {
      if (temperature > 28 && humidity > 75) {
        plagueMessage += "Gusano perforador de la caña. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Controlar la humedad para evitar condiciones favorables.
          2. Utilizar insecticidas de acción sistémica.
          3. Realizar un monitoreo frecuente en las cañas afectadas.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación del Gusano perforador de la caña.";
      }
    }

    // Barrnador del tallo de la caña
    else if (message.toLowerCase().includes("barrnador del tallo de la caña")) {
      if (temperature > 30 && humidity > 80) {
        plagueMessage += "Barrnador del tallo de la caña. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Usar trampas de luz para atraer y controlar los adultos.
          2. Practicar la rotación de cultivos y la eliminación de residuos.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación del Barrnador del tallo de la caña.";
      }
    }

    // Picudo negro en banano
    else if (message.toLowerCase().includes("picudo negro en banano")) {
      if (temperature > 26 && humidity > 65) {
        plagueMessage += "Picudo negro en banano. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Aplicar tratamientos fitosanitarios a base de insecticidas.
          2. Eliminar las hojas infectadas y evitar el contacto con cultivos no afectados.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación del Picudo negro en banano.";
      }
    }

    // Cacao - Hormigas
    else if (message.toLowerCase().includes("hormigas") && message.toLowerCase().includes("cacao")) {
      if (temperature > 25 && humidity > 70) {
        plagueMessage += "Hormigas en cacao. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Controlar la humedad en las áreas cercanas a las raíces.
          2. Aplicar tratamientos biológicos y/o químicos para controlarlas.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de hormigas en cacao.";
      }
    }

    // Cacao - Ácaros
    else if (message.toLowerCase().includes("ácaros") && message.toLowerCase().includes("cacao")) {
      if (temperature > 22 && humidity > 60) {
        plagueMessage += "Ácaros en cacao. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Controlar la humedad y la temperatura.
          2. Usar acaricidas específicos para la plaga.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de ácaros en cacao.";
      }
    }

    // Cacao - Tríps
    else if (message.toLowerCase().includes("tríps") && message.toLowerCase().includes("cacao")) {
      if (temperature > 24 && humidity > 60) {
        plagueMessage += "Tríps en cacao. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Usar trampas cromáticas para reducir la población de tríps.
          2. Aplicar insecticidas selectivos.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de tríps en cacao.";
      }
    }

    // Palma aceitera - Polilla
    else if (message.toLowerCase().includes("polilla") && message.toLowerCase().includes("palma aceitera")) {
      if (temperature > 30 && humidity > 75) {
        plagueMessage += "Polilla en palma aceitera. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Controlar la humedad en la zona de cultivo.
          2. Utilizar feromonas para atrapar polillas adultas.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de polillas en palma aceitera.";
      }
    }

    // Palma aceitera - Gusanos canasta
    else if (message.toLowerCase().includes("gusanos canasta") && message.toLowerCase().includes("palma aceitera")) {
      if (temperature > 30 && humidity > 80) {
        plagueMessage += "Gusanos canasta en palma aceitera. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Realizar un monitoreo frecuente y eliminar las canastas afectadas.
          2. Aplicar productos biológicos como Bacillus thuringiensis.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de gusanos canasta en palma aceitera.";
      }
    }

    // Piña - Picuda de la piña
    else if (message.toLowerCase().includes("picuda de la piña") && message.toLowerCase().includes("piña")) {
      if (temperature > 28 && humidity > 70) {
        plagueMessage += "Picuda de la piña. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Tratar los cultivos con insecticidas específicos para picuda.
          2. Eliminar las piñas infectadas inmediatamente.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de la picuda de la piña.";
      }
    }

    // Piña - Cochinilla
    else if (message.toLowerCase().includes("cochinilla") && message.toLowerCase().includes("piña")) {
      if (temperature > 25 && humidity > 60) {
        plagueMessage += "Cochinilla en piña. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Utilizar insecticidas sistémicos para eliminar las cochinillas.
          2. Controlar la humedad y eliminar las malas hierbas.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de cochinilla en piña.";
      }
    }

    // Piña - Broca de la corona
    else if (message.toLowerCase().includes("broca de la corona") && message.toLowerCase().includes("piña")) {
      if (temperature > 30 && humidity > 80) {
        plagueMessage += "Broca de la corona en piña. Las condiciones son ideales para su proliferación.";
        recommendations = `
          **Recomendación:**
          1. Eliminar las plantas infectadas para evitar la propagación.
          2. Aplicar tratamientos fitosanitarios a base de piretroides.
        `;
      } else {
        plagueMessage += "Las condiciones no son ideales para la proliferación de la broca de la corona en piña.";
      }
    }

    // Respuesta final
    res.status(200).json({ message: plagueMessage, recommendations });

  } catch (error) {
    console.error("Error completo:", error.message);
    res.status(500).json({ error: "Hubo un error al procesar tu mensaje." });
  }
};
