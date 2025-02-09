import React from 'react';
import UserForm from '../../components/UserForm';
import { useRouter } from 'next/router';
import { register } from '../services/UserServices';

const CreateUserPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      await register(formData); // Llama a la API para crear un usuario
      router.push('/dashboard'); // Redirige al dashboard después de crear el usuario
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateUserPage;