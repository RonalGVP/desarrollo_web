import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/AuthUser";

const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth(); // Ahora también obtenemos "loading"
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!loading) { // Solo ejecutar si ya terminó de cargar
      if (!user) {
        router.push("/pag/login");
      } else {
        setMounted(true);
      }
    }
  }, [user, router, loading]);

  if (loading || !mounted) return null; // Espera hasta que todo esté listo

  return <>{children}</>;
};

export default AuthRedirect;
