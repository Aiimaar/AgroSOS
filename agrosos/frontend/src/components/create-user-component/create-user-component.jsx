import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create-user-component.css";

const CreateUserComp = ({ onCreate }) => {
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

      setErrorMessage("");
      setSuccessMessage("¡Usuario creado exitosamente!");

      setName("");
      setRole("Farmer");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (typeof onCreate === "function") {
        onCreate();
      }

      navigate("/admin-user-crud");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setErrorMessage("Error al crear el usuario. Revisa los datos e inténtalo de nuevo.");
    }
  };

  return (
    <div className="create-user-container">
      <form onSubmit={handleSubmit} className="create-user-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="Farmer">Farmer</option>
          <option value="Admin">Admin</option>
          <option value="Technician">Technician</option>
        </select>
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
        {errorMessage && <p className="create-user-error-message">{errorMessage}</p>}
        {successMessage && <p className="create-user-success-message">{successMessage}</p>}
        <button type="submit" className="create-user-submit-button">
          Crear usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUserComp;
