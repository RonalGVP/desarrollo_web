import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/AuthUser';

const AuthRedirect = ({ children }) => {
  const { user } = useAuth();  // Obtiene el usuario del contexto de autenticación
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // Evita el renderizado antes de que React se haya montado

  useEffect(() => {
    if (!user) {
      router.push("/pages/login");  // Asegúrate de que esta sea la ruta correcta al login
    } else {
      setMounted(true);  // Si hay usuario, permite el renderizado
    }
  }, [user, router]);

  if (!mounted || !user) return null;  // Evita el renderizado hasta que se confirme el estado de autenticación

  return <>{children}</>;  // Si el usuario está autenticado, renderiza los hijos (la vista protegida)
};

export default AuthRedirect;
