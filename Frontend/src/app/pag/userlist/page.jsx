'use client';
import Navbar from '../../components/Navbar';  // Asegúrate de que la ruta sea correcta
import UsersList from '../../components/users/UserList';  // Componente que contiene la lista de usuarios
import AuthRedirect from '../../components/users/AuthRedirect';  // Redirección de autenticación si es necesario

export default function UsersPage() {
  return (
    <div>
      <Navbar />  
      <AuthRedirect>
        <UsersList />
      </AuthRedirect>
    </div>
  );
}
