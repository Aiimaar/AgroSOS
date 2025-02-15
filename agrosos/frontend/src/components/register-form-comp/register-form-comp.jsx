import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register-form-comp.css";
import { useDarkMode } from "../../context/DarkModeContext"; 
import { useTranslation } from 'react-i18next';  

const RegisterFormComp = ({ onRegister }) => {
  const { t } = useTranslation();  

  const [name, setName] = useState("");
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(t('passwordsDoNotMatch'));
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
      localStorage.setItem("firstTime", "true"); // Guardar el flag de primera vez

      setErrorMessage("");
      setSuccessMessage(t('registrationSuccessful'));

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
      setErrorMessage(t('registrationError'));
    }
  };

  return (
    <div className={`register-form-container ${darkMode ? 'dark-mode' : ''}`} aria-labelledby="register-form-title">
      <form onSubmit={handleSubmit} className="register-form" aria-describedby="form-instructions">
        <h1 id="register-form-title">{t('register')}</h1>  
        <p id="form-instructions">
          {t('formInstructions')}  
        </p>
        <label htmlFor="name-input">{t('name2')}</label>  
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('name')}
          required
          aria-required="true"
        />
        <label htmlFor="email-input">{t('email')}</label>  
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email')}
          required
          aria-required="true"
        />
        <label htmlFor="password-input">{t('password')}</label>  
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password')}
          required
          aria-required="true"
        />
        <label htmlFor="confirm-password-input">{t('confirmPassword')}</label>  
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
          <p className="register-form-error-message" role="alert" aria-live="assertive">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="register-form-success-message" role="status" aria-live="polite">
            {successMessage}
          </p>
        )}
        <button type="submit" className="register-form-submit-button" aria-label={t('createAccount')}>
          {t('createAccount')}  
        </button>
      </form>
    </div>
  );
};

export default RegisterFormComp;
