/** @type {import('next').NextConfig} */
const nextConfig = {
    // Habilitar soporte para la escritura de código fuente en ES6
    reactStrictMode: true,
  
    // Configuración de reescritura de rutas si es necesario
    async rewrites() {
      return [
        {
          source: '/api/chatbot',
          destination: '/page/chatbot', // Redirige correctamente las solicitudes a la API de chatbot
        },
      ];
    },
  

  
    // Configuración de las variables de entorno
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY, // Asegúrate de que la clave de API esté disponible en el entorno
    },
  

  };
  
  export default nextConfig;
  