'use client';
import React, { useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Cloud, Bug,Bot } from 'lucide-react'; // Importar el ícono de MessageCircle para el chatbot
import AuthRedirect from './components/users/AuthRedirect';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';

 const ScienceDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    // Bloquear el scroll en el body cuando el navbar sea fijo


    return () => {
      // Restaurar el scroll cuando el componente se desmonte
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Navbar fijo */}
        <Navbar className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg" /> 

        {/* Contenedor de contenido, con margen superior para compensar el navbar */}
        <div className="max-w-7xl mx-auto pt-32"> {/* pt-32 es el margen superior ajustado */}
          {/* Header */}
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
              Explorador de Datos Científicos
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Seleccione una categoría para explorar datos científicos detallados
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Climate Card */}
            <div 
              onClick={() => router.push('/pag/clima')} 
              className="cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 border-2 border-transparent hover:border-blue-200">
                <CardContent className="p-8 flex flex-col items-center space-y-6">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300 transform group-hover:rotate-12">
                    <Cloud className="w-16 h-16 text-blue-600 group-hover:animate-pulse" />
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">Datos Climáticos</h2>
                    <p className="text-gray-600">
                      Explore temperatura, humedad, patrones de viento y condiciones atmosféricas
                    </p>
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                    Ver Datos Climáticos →
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plagas Card */}
            <div 
              onClick={() => router.push('/pag/plagas')} 
              className="cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 border-2 border-transparent hover:border-green-200">
                <CardContent className="p-8 flex flex-col items-center space-y-6">
                  {/* Icono de Plagas */}
                  <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors duration-300 transform group-hover:-rotate-12">
                    <Bug className="w-16 h-16 text-green-600 group-hover:animate-bounce" />
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">Datos de Plagas</h2>
                    <p className="text-gray-600">
                      Monitoree la proliferación de plagas como trips, moscas blancas y más.
                    </p>
                  </div>
                  <div className="text-green-600 group-hover:translate-x-2 transition-transform duration-300">
                    Ver Datos de Plagas →
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chatbot de Plagas Card */}
            <div 
              onClick={() => router.push('pag/chatbot')} 
              className="cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 border-2 border-transparent hover:border-purple-200">
                <CardContent className="p-8 flex flex-col items-center space-y-6">
                  {/* Icono de Chatbot */}
                  <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300 transform group-hover:rotate-12">
                    <Bot className="w-16 h-16 text-purple-600 group-hover:animate-pulse" />
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">Chatbot de Plagas</h2>
                    <p className="text-gray-600">
                      Hable con nuestro chatbot para obtener información sobre la proliferación de plagas.
                    </p>
                  </div>
                  <div className="text-purple-600 group-hover:translate-x-2 transition-transform duration-300">
                    Iniciar Chat → 
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default ScienceDashboard;
