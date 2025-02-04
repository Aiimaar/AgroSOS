import React, { useEffect, useState } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./user-profile-comp.css";
import { useDarkMode } from "../../context/DarkModeContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const UserProfileComp = () => {
  const [userData, setUserData] = useState({ name: "", email: "", profile_image: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

        if (!userId || !token) {
          console.error("Faltan credenciales de autenticación.");
          return;
        }

        const response = await axios.get(`${API_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({
          name: response.data.name || "",
          email: response.data.email || "",
          profile_image: response.data.profile_image || "",
        });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
    setFieldValue(userData[field]);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");

      const updatedData = { ...userData, [editingField]: fieldValue };

      await axios.put(`${API_URL}/api/users/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(updatedData);
      setIsModalOpen(false);
      setEditingField(null);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los cambios.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageSelected(true);
      setImageFile(file);
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("profile_image", imageFile);

    try {
      setIsUploading(true);

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");

      const response = await axios.put(`${API_URL}/api/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setUserData((prev) => ({ ...prev, profile_image: response.data.profile_image }));
      setImageFile(null);
      setIsImageSelected(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("No se pudo subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("language"); // ✅ Eliminar preferencia de idioma al cerrar sesión
    navigate("/login");
  };

  const modal = isModalOpen && (
    <div className={`modal-overlay ${darkMode ? "dark-mode" : ""}`}>
      <div className={`modal ${darkMode ? "dark-mode" : ""}`}>
        <h3>Editar {editingField}</h3>
        <input
          type={editingField === "email" ? "email" : "text"}
          aria-label={`Editar ${editingField}`}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          className={`modal-input ${darkMode ? "dark-mode" : ""}`}
        />
        <div className="modal-buttons">
          <button onClick={handleSave} className="modal-save-button">
            Guardar
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setEditingField(null);
            }}
            className="modal-cancel-button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`user-profile-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="profile-pic-container">
        <img
          src={userData.profile_image || "/default-profile.png"}
          alt="Imagen de perfil"
          className="profile-pic"
          role="img"
          aria-label="Imagen de perfil del usuario"
        />
        <div
          className="camera-icon"
          role="button"
          aria-label="Cambiar imagen de perfil"
          tabIndex="0"
          onClick={() => document.getElementById("imageUpload").click()}
          onKeyDown={(e) => e.key === "Enter" && document.getElementById("imageUpload").click()}
        >
          <FaCamera />
        </div>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          aria-label="Seleccionar imagen"
        />
        {isImageSelected && (
          <button
            onClick={handleImageUpload}
            className="upload-button"
            disabled={isUploading}
            aria-label="Subir imagen seleccionada"
          >
            {isUploading ? "Subiendo..." : "Subir Imagen"}
          </button>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="name">Nombre</label>
        <div className="input-container">
          <input id="name" value={userData.name} readOnly className="input-field" />
          <FaPen
            className="edit-icon"
            role="button"
            aria-label="Editar nombre"
            tabIndex="0"
            onClick={() => handleEditClick("name")}
            onKeyDown={(e) => e.key === "Enter" && handleEditClick("name")}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <div className="input-container">
          <input id="email" value={userData.email} readOnly className="input-field" />
          <FaPen
            className="edit-icon"
            role="button"
            aria-label="Editar email"
            tabIndex="0"
            onClick={() => handleEditClick("email")}
            onKeyDown={(e) => e.key === "Enter" && handleEditClick("email")}
          />
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button" aria-label="Cerrar sesión">
        Cerrar Sesión
      </button>
      <button onClick={() => navigate(-1)} className="go-back-button" aria-label="Volver a la página anterior">
        Volver
      </button>
      {ReactDOM.createPortal(modal, document.body)}
    </div>
  );
};

export default UserProfileComp;
