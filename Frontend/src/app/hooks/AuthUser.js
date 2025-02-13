"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Importamos la función para decodificar JWT

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Agregar estado para el token
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("user");
    console.log("Token almacenado en localStorage:", storedToken);

    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken); // Decodificamos el token
        console.log("Usuario decodificado:", decodedUser);
        setUser({ ...decodedUser, token: storedToken }); // Guardamos el usuario y token
        setToken(storedToken); // Guardamos el token en el estado
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token); // Decodificamos el token recibido
      console.log("Usuario después de login:", decodedUser);
      setUser({ ...decodedUser, token }); // Guardamos el usuario y token
      setToken(token); // Guardamos el token en el estado
      localStorage.setItem("user", token);
      router.push("/pag/perfil"); // Asegúrate de que la ruta es correcta
    } catch (error) {
      console.error("Error al decodificar el token en login:", error);
    }
  };

  const logout = () => {
    console.log("Logout");
    setUser(null);
    setToken(null); // Limpiamos el token del estado
    localStorage.removeItem("user");
    router.push("/pag/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
