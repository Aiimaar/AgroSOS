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
  
      // Actualizar el campo editado en el objeto local
      const updatedData = {
        ...userData, // Incluye todos los datos existentes
        [editingField]: fieldValue, // Actualiza solo el campo editado
      };
  
      // Enviar todos los datos al backend
      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Actualizar el estado local con los nuevos datos
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
    <div className="modal-overlay" role="dialog" aria-labelledby="edit-modal-title" aria-hidden={!isModalOpen}>
      <div className="modal">
        <h3 id="edit-modal-title">Editar {editingField}</h3>
        <input
          type={editingField === "email" ? "email" : "text"}
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          className="modal-input"
          aria-describedby="field-description"
        />
        <div className="modal-buttons">
          <button onClick={handleSave} className="modal-save-button" aria-label="Guardar cambios">Guardar</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setEditingField(null);
            }}
            className="modal-cancel-button" 
            aria-label="Cancelar edición"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="user-profile-container">
      <div className="profile-pic-container" aria-labelledby="profile-picture">
        <img
          src={userData.profile_image || "/default-profile.png"}
          alt="Imagen de perfil"
          className="profile-pic"
          role="img"
          aria-label="Imagen de perfil del usuario"
        />
        <div
          className="camera-icon"
          onClick={() => document.getElementById("imageUpload").click()}
          role="button"
          aria-label="Cambiar imagen de perfil"
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
            Subir Imagen
          </button>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="name-input">Nombre</label>
        <div className="input-container">
          <input
            id="name-input"
            value={userData.name}
            readOnly
            className="input-field"
            aria-label="Nombre del usuario"
          />
          <FaPen 
            className="edit-icon" 
            onClick={() => handleEditClick("name")} 
            aria-label="Editar nombre"
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="email-input">Email</label>
        <div className="input-container">
          <input
            id="email-input"
            value={userData.email}
            readOnly
            className="input-field"
            aria-label="Correo electrónico del usuario"
          />
          <FaPen 
            className="edit-icon" 
            onClick={() => handleEditClick("email")} 
            aria-label="Editar correo electrónico"
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
