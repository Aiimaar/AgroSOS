import React, { useState } from "react";
import axios from "axios";
import "./login-form.css";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Llamar a authenticateBasic para verificar las credenciales de forma local
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Codifica las credenciales en Base64
    const credentials = btoa(`${email}:${password}`);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`, // Incluye la cabecera
          },
        }
      );
  
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      onLogin();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error en el inicio de sesión. Revisa las credenciales e inténtalo de nuevo.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;