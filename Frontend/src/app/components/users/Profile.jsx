'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthUser";
import { getUserById,getUsers} from "../../services/UserServices";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { AlertCircle, User, Mail, Cloud } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { useRouter } from 'next/navigation';  // Importa el hook useRouter

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleEditClick = () => {
    router.push('/pag/edit');  // Redirige a la página de edición
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
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-4 bg-sky-50 border-sky-200 text-sky-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!userData || !userData.username) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-4 bg-sky-50 border-sky-200 text-sky-800">
        <AlertCircle className="h-4 w-4" />
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
              <Cloud className="h-6 w-6" />
              <CardTitle className="text-2xl">Perfil del Usuario</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-sky-500"
              onClick={handleEditClick}  // Llama a la función de redirección
            >
              Editar Perfil
            </Button>
          </div>
          <CardDescription className="text-center">
            Información personal del usuario.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sky-700">
                <User className="h-4 w-4 text-sky-500" />
                <span className="font-medium">Nombre:</span>
                <span>{userData.username}</span>
              </div>
              <div className="flex items-center space-x-2 text-sky-700">
                <Mail className="h-4 w-4 text-sky-500" />
                <span className="font-medium">Email:</span>
                <span>{userData.email}</span>
              </div>
              {/* Mostrar el campo role */}
              <div className="flex items-center space-x-2 text-sky-700">
                <span className="font-medium">Rol:</span>
                <span>{userData.role}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
