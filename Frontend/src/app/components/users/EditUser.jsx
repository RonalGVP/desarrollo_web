'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthUser";
import { updateUser, getUserById } from "../../services/UserServices";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Input } from "../ui/input";
import { useRouter } from 'next/navigation';  // Importa el hook useRouter

const EditProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();  // Inicializa el hook useRouter

  useEffect(() => {
    if (user === null) return;
    if (!user || !user.id) {
      setError("Usuario no encontrado.");
      setLoading(false);
      return;
    }

    getUserById(user.id)
      .then((response) => {
        if (response.data) {
          setUserData(response.data);
          setNewUsername(response.data.username);
          setNewEmail(response.data.email);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { username: newUsername, email: newEmail };
      const response = await updateUser(user.id, updatedUser);
      setUserData(response.data);
      setError(null);  // Clear any previous error
      setSuccessMessage("Perfil actualizado correctamente!");  // Display success message
      // Redirige a la página del perfil después de la actualización
      router.push('/pag/perfil');  // Redirección
    } catch (error) {
      setError("Hubo un error al actualizar el perfil.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="max-w-2xl mx-auto mt-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!userData || !userData.username) {
    return (
      <Alert className="max-w-2xl mx-auto mt-4">
        <AlertDescription>Error: Datos inválidos.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg border border-sky-200">
        <CardHeader className="space-y-1 bg-sky-400 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit className="h-6 w-6" />
              <CardTitle className="text-2xl">Editar Perfil</CardTitle>
            </div>
          </div>
          <CardDescription className="text-center">
            Actualiza tu información personal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {successMessage && (
            <Alert className="max-w-2xl mx-auto mt-4 bg-green-100 border-green-400 text-green-700">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sky-700">
                <span className="font-medium">Nombre:</span>
                <Input 
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Nuevo nombre"
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2 text-sky-700">
                <span className="font-medium">Email:</span>
                <Input 
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Nuevo correo electrónico"
                  className="w-full"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-sky-500 hover:bg-sky-600"
            >
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
