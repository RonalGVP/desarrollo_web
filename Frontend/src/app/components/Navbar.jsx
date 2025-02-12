'use client';

import { useState } from 'react';
import {
  Menu,
  ChevronDown,
  Bug,
  BarChart2,
  Settings,
  Cloud,
  Database,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/AuthUser';

export default function Navbar() {
  const { logout } = useAuth(); // Obtiene la función de logout del contexto de autenticación
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [

    {
      label: 'Simulación de Plagas',
      icon: Bug,
      color: 'text-green-500'
    },

    {
      label: 'Perfil',
      icon: Settings,
      color: 'text-gray-500'
    }
  ];

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <Bug className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold text-gray-800">
              SimuPlagas
            </span>
          </div>

          {/* Menú principal */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg
                    transition-all duration-300 hover:bg-gray-50"
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-gray-700 hover:text-gray-900">
                    {item.label}
                  </span>
                </button>
              );
            })}
            <button 
              onClick={logout} 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600
              hover:text-red-700 transition-colors duration-300">
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              <Menu className="h-6 w-6" />
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300
                  ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white
                ring-1 ring-black ring-opacity-5 divide-y divide-gray-100
                transform origin-top transition-all duration-300">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center space-x-2 px-4 py-3
                        text-gray-700 hover:bg-gray-50 transition-all duration-300"
                    >
                      <Icon className={`h-5 w-5 ${item.color}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <div className="px-4 py-3">
                  <button className="w-full flex items-center space-x-2 text-gray-700
                    hover:text-gray-900 transition-colors duration-300">
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                    <span>Ayuda</span>
                  </button>
                  <button 
                    onClick={logout} 
                    className="w-full flex items-center space-x-2 text-red-600
                    hover:text-red-700 transition-colors duration-300 mt-2">
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}