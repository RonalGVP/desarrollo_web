'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Register from '../components/users/Register'; // Asumimos que Register está en la misma carpeta

const CreateUserPage = () => {
  const router = useRouter();

  // Manejo de redirección después de registro
  const handleSuccess = () => {
    router.push('/dashboard'); // Redirige al dashboard después del registro
  };

  return (
    <div>

      <Register onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateUserPage;
