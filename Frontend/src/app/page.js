'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "./components/ui/card";
import { Cloud, Mountain } from 'lucide-react';

const ScienceDashboard = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Climate Card */}
          <div 
            onClick={() => router.push('/clima')} 
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

          {/* Geology Card */}
          <div 
            onClick={() => router.push('/plagas')} 
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 border-2 border-transparent hover:border-amber-200">
              <CardContent className="p-8 flex flex-col items-center space-y-6">
                <div className="p-4 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors duration-300 transform group-hover:-rotate-12">
                  <Mountain className="w-16 h-16 text-amber-600 group-hover:animate-bounce" />
                </div>
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-800">Datos Geológicos</h2>
                  <p className="text-gray-600">
                    Monitoree actividad sísmica, composición del suelo y características del terreno
                  </p>
                </div>
                <div className="text-amber-600 group-hover:translate-x-2 transition-transform duration-300">
                  Ver Datos Geológicos →
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceDashboard;