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
    <div className="register-form-container" aria-labelledby="register-form-title">
      <form onSubmit={handleSubmit} className="register-form" aria-describedby="form-instructions">
        <h1 id="register-form-title">Registro</h1>
        <p id="form-instructions">
          Completa los campos para crear tu cuenta. Todos los campos son obligatorios.
        </p>
        <label htmlFor="name-input">Nombre</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          aria-required="true"
        />
        <label htmlFor="email-input">Correo electrónico</label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          aria-required="true"
        />
        <label htmlFor="password-input">Contraseña</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          aria-required="true"
        />
        <label htmlFor="confirm-password-input">Confirmar contraseña</label>
        <input
          id="confirm-password-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
          aria-required="true"
        />
        {errorMessage && (
          <p
            className="register-form-error-message"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p
            className="register-form-success-message"
            role="status"
            aria-live="polite"
          >
            {successMessage}
          </p>
        )}
        <button
          type="submit"
          className="register-form-submit-button"
          aria-label="Crear cuenta"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterFormComp;
