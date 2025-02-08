'use client'
import React, { useState, useEffect } from "react";
import { Cloud, Sun, ThermometerSun, User, Mail, Lock, Loader2 } from 'lucide-react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { updateUser, getUserById } from "../../services/UserServices";

const EditUserForm = ({ userId, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError("Error al obtener los datos del usuario.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateUser(userId, { username, email, password });
      setSuccess("Usuario actualizado correctamente");
      onSuccess?.();
    } catch (err) {
      setError("Error al actualizar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="h-8 w-8 text-blue-500 animate-bounce" />
            <Sun className="h-8 w-8 text-yellow-500 animate-pulse" />
            <ThermometerSun className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">
            Editar Usuario
          </CardTitle>
          <CardDescription className="text-center">
            Actualiza tu información de WeatherAPI
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-8"
                  placeholder="Nombre de usuario"
                />
                <User className="w-4 h-4 absolute left-2.5 top-3 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-8"
                  placeholder="Correo electrónico"
                />
                <Mail className="w-4 h-4 absolute left-2.5 top-3 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña (opcional)</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8"
                  placeholder="Nueva contraseña"
                />
                <Lock className="w-4 h-4 absolute left-2.5 top-3 text-gray-500" />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                'Actualizar Usuario'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserForm;