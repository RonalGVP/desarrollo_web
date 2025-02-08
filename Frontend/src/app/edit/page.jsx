"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EditUserForm from "../components/users/EditUser";

const EditUserPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const handleSuccess = () => {
    router.push("/dashboard"); // Redirige al dashboard tras actualizar el usuario
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Editar Usuario</h1>
      <EditUserForm userId={userId} onSuccess={handleSuccess} />
    </div>
  );
};

export default EditUserPage;


