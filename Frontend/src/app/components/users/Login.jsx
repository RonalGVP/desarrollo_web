'use client';
import React, { useState } from 'react';
import { Cloud, Sun, ThermometerSun, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { login } from "../../services/UserServices";
import { useAuth } from "../../hooks/AuthUser";
import { useRouter } from 'next/navigation'; // Importa useRouter de next/navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth(); // Usa la función login del contexto
  const router = useRouter(); // Inicializa el router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      authLogin(response.data.token); // Usa la función login del contexto
      router.push('/'); // Redirige a la ruta /page/register después de iniciar sesión
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="h-8 w-8 text-blue-500 animate-bounce" />
            <Sun className="h-8 w-8 text-yellow-500 animate-pulse" />
            <ThermometerSun className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">WeatherAPI</CardTitle>
          <CardDescription className="text-center">
            Bienvenido de nuevo a tu portal del clima
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{' '}
            <span
              onClick={() => router.push('/pag/register')} // Usamos el método push para redirigir
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Regístrate aquí
            </span>
          </div>
          <div className="mt-2 text-center text-xs text-gray-400">
            Accede a datos meteorológicos en tiempo real
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
