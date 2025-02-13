'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, ChevronDown, Bug, Cloud, CircleUser, LogOut, Users,Bot } from 'lucide-react';
import { useAuth } from '../hooks/AuthUser';
import { getUserById } from '../services/UserServices';  // Asegúrate de importar esta función si la usas

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Leer y obtener los datos del usuario desde el backend (o localStorage si es necesario)
  useEffect(() => {
    if (user === null || !user.id) return;

    getUserById(user.id)
      .then((response) => {
        if (response.data) {
          setUserData(response.data);
        } else {
          setError("No se encontraron datos del usuario.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Hubo un error al obtener tus datos.");
        setLoading(false);
      });
  }, [user]);

  const menuItems = [
    { label: 'Simulación de Plagas', icon: Bug, color: 'text-green-500', route: '/pag/plagas' },
    { label: 'Perfil', icon: CircleUser, color: 'text-gray-500', route: '/pag/perfil' },
    { label: 'Clima', icon: Cloud, color: 'text-gray-500', route: '/pag/clima' },
    { label: 'Chatbot', icon: Bot, color: 'text-gray-500', route: '/pag/chatbot' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-16">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-16 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => router.push('/')}
          >
            <Bug className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold text-gray-800">SimuPlagas</span>
          </div>

          {/* Menú principal para pantallas grandes */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ label, icon: Icon, color, route }) => (
              <button
                key={label}
                onClick={() => router.push(route)} 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50"
              >
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-gray-700 hover:text-gray-900">{label}</span>
              </button>
            ))}

            {/* Solo mostrar el botón de lista de usuarios si el rol es 'admin' */}
            {userData?.role === 'admin' && (
              <button 
                onClick={() => router.push('/pag/userlist')} 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                <Users className="h-5 w-5" />
                <span>Lista de Usuarios</span>
              </button>
            )}

            <button 
              onClick={logout} 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:text-red-700 transition-colors duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              <Menu className="h-6 w-6" />
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Desplegar menú móvil */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 transform origin-top transition-all duration-300">
                {menuItems.map(({ label, icon: Icon, color, route }) => (
                  <button
                    key={label}
                    onClick={() => router.push(route)} 
                    className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                    <span>{label}</span>
                  </button>
                ))}

                {/* Solo mostrar el botón de lista de usuarios si el rol es 'admin' */}
                {userData?.role === 'admin' && (
                  <button 
                    onClick={() => router.push('/pag/userlist')} 
                    className="w-full flex items-center space-x-2 px-4 py-3 text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    <Users className="h-5 w-5" />
                    <span>Lista de Usuarios</span>
                  </button>
                )}

                <div className="px-4 py-3">
                  <button 
                    onClick={logout} 
                    className="w-full flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-300 mt-2"
                  >
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
