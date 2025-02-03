import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register-form-comp.css";
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { useTranslation } from 'react-i18next';  // Importar useTranslation

const RegisterFormComp = ({ onRegister }) => {
  const { t } = useTranslation();  // Usar el hook useTranslation para acceder a las traducciones

  const [name, setName] = useState("");
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(t('passwordsDoNotMatch'));  // Usar traducción para mensaje de error
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
      setSuccessMessage(t('registrationSuccessful'));  // Usar traducción para mensaje de éxito

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (typeof onRegister === "function") {
        onRegister();
      }

      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(t('registrationError'));  // Usar traducción para mensaje de error
    }
  };

  return (
    <div className={`register-form-container ${darkMode ? 'dark-mode' : ''}`} aria-labelledby="register-form-title">
      <form onSubmit={handleSubmit} className="register-form" aria-describedby="form-instructions">
        <h1 id="register-form-title">{t('register')}</h1>  {/* Usar traducción para el título */}
        <p id="form-instructions">
          {t('formInstructions')}  {/* Usar traducción para las instrucciones */}
        </p>
        <label htmlFor="name-input">{t('name2')}</label>  {/* Usar traducción para el label */}
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('name')}
          required
          aria-required="true"
        />
        <label htmlFor="email-input">{t('email')}</label>  {/* Usar traducción para el label */}
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email')}
          required
          aria-required="true"
        />
        <label htmlFor="password-input">{t('password')}</label>  {/* Usar traducción para el label */}
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password')}
          required
          aria-required="true"
        />
        <label htmlFor="confirm-password-input">{t('confirmPassword')}</label>  {/* Usar traducción para el label */}
        <input
          id="confirm-password-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('confirmPassword')}
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
          aria-label={t('createAccount')}
        >
          {t('createAccount')}  {/* Usar traducción para el botón */}
        </button>
      </form>
    </div>
  );
};

export default RegisterFormComp;
