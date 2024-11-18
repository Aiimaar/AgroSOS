import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para registrarse
  const register = async (credentials) => {
    const url = "http://localhost:3000/api/auth/register"; // API de backend
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Registro exitoso");
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  // Función para iniciar sesión
  const login = async (credentials, useBasic = false) => {
    const url = "http://localhost:3000/api/auth/login"; // API de backend
    const headers = useBasic
      ? { Authorization: `Basic ${btoa(`${credentials.email}:${credentials.password}`)}` }
      : { "Content-Type": "application/json" };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: useBasic ? null : JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem("token", data.token);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
