import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
import "./login-form-comp.css";

const LoginFormComp = ({ onLogin }) => {
  const { t } = useTranslation(); // Accedemos a la función de traducción
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      // Obtener el idioma del usuario
      const languageResponse = await axios.get(
        `http://localhost:3000/api/users/${userId}/language`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { language } = languageResponse.data;
      localStorage.setItem("language", language);

      if (typeof onLogin === "function") {
        onLogin();
      }

      navigate("/plot-list");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage(t("login_error"));
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password")}
          required
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" className="submit-button">
          {t("login")}
        </button>
      </form>

      <div className="register-link">
        <p>{t("no_account")}</p>
        <Link to="/register" className="create-account-button">
          {t("create_account")}
        </Link>
      </div>
    </div>
  );
};

export default LoginFormComp;
