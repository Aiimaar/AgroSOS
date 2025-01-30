import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login-form-comp.css";

const LoginFormComp = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Codificar las credenciales en Base64
    const credentials = btoa(`${email}:${password}`);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { token, userId, role } = response.data;
      console.log(response.data);

      // Almacenar en localStorage los datos de autenticación
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      // Solicitar el idioma del usuario
      const languageResponse = await axios.get(
        `http://localhost:3000/api/users/${userId}/language`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token en el header para autenticar
          },
        }
      );

      const { language } = languageResponse.data; // Recuperar el idioma de la respuesta
      console.log("Idioma recibido:", language);

      // Almacenar el idioma en localStorage
      localStorage.setItem("language", language);

      if (typeof onLogin === "function") {
        onLogin();
      }

      navigate("/plot-list");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error en el inicio de sesión. Intenta de nuevo más tarde.");
    }
  };

  return (
    <div className="login-form-container">
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
        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
      </form>

      <div className="register-link">
        <p>¿Aún no tienes cuenta?</p>
        <Link to="/register" className="create-account-button">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default LoginFormComp;
