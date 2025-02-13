'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud, Sun, ThermometerSun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { register } from "../../services/UserServices";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Estado para el rol
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password, role });
      router.push('/');
    } catch (error) {
      setError('Error al registrar el usuario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="h-8 w-8 text-blue-500" />
            <Sun className="h-8 w-8 text-yellow-500" />
            <ThermometerSun className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">WeatherAPI</CardTitle>
          <CardDescription className="text-center">
            Regístrate para acceder a nuestra API de clima
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
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Registrarse
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={() => router.push('/pag/login')}
              className="text-blue-500 hover:underline"
            >
              Iniciar sesión
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
