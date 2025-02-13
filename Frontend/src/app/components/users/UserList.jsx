'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthUser";
import { getUsers, deleteUser } from "../../services/UserServices";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

const UsersList = () => {
  const { token, loading: authLoading, user } = useAuth();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      if (token) {
        getUsers(token)
          .then((data) => {
            setUsers(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      } else {
        setError("No se encuentra el token de autenticación.");
        setLoading(false);
      }
    }
  }, [authLoading, token]);

  const handleDelete = async (id) => {
    if (!token || id === user?.id) return;
    try {
      await deleteUser(id, token);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      setError("Error al eliminar usuario.");
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
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-4 bg-sky-50 border-sky-200 text-sky-800">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg border border-sky-200">
        <CardHeader className="bg-sky-400 text-white p-4">
          <CardTitle className="text-2xl">Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {users === null || users.length === 0 ? (
              <Alert variant="destructive" className="max-w-2xl mx-auto mt-4 bg-sky-50 border-sky-200 text-sky-800">
                <AlertDescription>No se encontraron usuarios.</AlertDescription>
              </Alert>
            ) : (
              <ul className="space-y-2">
                {users.map((u) => (
                  <li key={u.id} className="flex justify-between items-center text-sky-700">
                    <span>{u.username} - {u.email}</span>
                    {u.id !== user?.id && (
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(u.id)}>
                        Eliminar
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
