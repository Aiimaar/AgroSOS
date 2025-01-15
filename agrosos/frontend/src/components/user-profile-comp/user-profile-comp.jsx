import React, { useState, useEffect } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./user-profile-comp.css";

const UserProfileComp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profile_image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

      const updatedData = {
        ...userData,
        [editingField]: fieldValue,
      };

      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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

      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prev) => ({
        ...prev,
        profile_image: response.data.profile_image,
      }));
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
    navigate("/login");
  };

  const modal = isModalOpen && (
    <div
      className="modal-overlay"
      aria-hidden={!isModalOpen}
      aria-labelledby="edit-modal-title"
    >
      <div className="modal">
        <h3 id="edit-modal-title">Editar {editingField}</h3>
        <input
          type={editingField === "email" ? "email" : "text"}
          aria-label={`Editar ${editingField}`}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          className="modal-input"
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
    <div className="user-profile-container">
      <div className="profile-pic-container">
        <img
          src={userData.profile_image || "/default-profile.png"}
          alt="profile"
          className="profile-pic"
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
        />
        {isImageSelected && (
          <button
            onClick={handleImageUpload}
            className="upload-button"
            disabled={isUploading}
          >
            Subir Imagen
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
      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>
      <button onClick={() => navigate(-1)} className="go-back-button">
        Volver
      </button>
      {ReactDOM.createPortal(modal, document.body)}
    </div>
  );
};

export default UserProfileComp;
