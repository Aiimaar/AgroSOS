import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register-form-comp.css";

const RegisterFormComp = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        role,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("authToken", token);

      setErrorMessage("");
      setSuccessMessage("¡Registro exitoso!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (typeof onRegister === "function") {
        onRegister();
      }

      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrorMessage("Error al registrar. Revisa los datos e inténtalo de nuevo.");
    }
  };

  return (
    <div className="register-form-container">
      <form id="register-form-form" onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
        />
        {errorMessage && <p className="register-form-error-message">{errorMessage}</p>}
        {successMessage && <p className="register-form-success-message">{successMessage}</p>}
        <button type="submit" className="register-form-submit-button">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterFormComp;
