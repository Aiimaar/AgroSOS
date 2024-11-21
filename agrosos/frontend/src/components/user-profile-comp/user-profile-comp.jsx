import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./user-profile-comp.css";

const UserProfileComp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profile_image: "",
  });

  const [editingField, setEditingField] = useState(null);
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
          profile_image: response.data.profile_image || "", // Almacenar la imagen de perfil
        });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async () => {
    if (!userData.name.trim() || !userData.email.trim()) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");

      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        { name: userData.name, email: userData.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Datos actualizados correctamente.");
      setEditingField(null);
    } catch (error) {
      alert(
        error.response
          ? error.response.data.error
          : "No se pudo actualizar la información."
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageSelected(true); // Hacer visible el botón de "Subir Imagen" y ocultar la cámara
      setImageFile(file); // Guardar el archivo seleccionado
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("profile_image", imageFile); // Asegúrate de que el nombre coincida con el del backend

    try {
      // Cambiar estado a 'subiendo' para ocultar botones
      setIsUploading(true);
      setIsImageSelected(false); // Ocultar la cámara al comenzar la subida

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

      // Actualiza el estado de la imagen de perfil inmediatamente después de la subida
      const updatedProfileImage = response.data.profile_image;
      console.log("Imagen actualizada:", updatedProfileImage);

      alert("Imagen de perfil actualizada");

      // Actualiza el estado en el frontend sin necesidad de recargar la página
      setUserData({
        ...userData,
        profile_image: updatedProfileImage, // Actualizar la imagen en el estado
      });

      // Limpiar la selección de imagen después de la carga
      setImageFile(null);
    } catch (error) {
      alert("Error al subir la imagen de perfil");
      console.error("Error al subir la imagen:", error);
    } finally {
      // Restablecer el estado 'subiendo' después de completar la carga
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    // Eliminar los datos de sesión del localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  
    // Navegar a la página de login
    navigate("/login");
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {/* Foto de perfil */}
        <div className="profile-photo-container">
          <img
            src={`http://localhost:3000/uploads/${userData.profile_image}`}
            alt="profile"
            className="profile-photo"
          />
          <button
            className="edit-photo-button"
            style={{
              display: isUploading || isImageSelected ? "none" : "block",
            }} // Ocultar el botón de cámara cuando se selecciona la imagen o se está subiendo
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="profileImageInput"
            />
            <label htmlFor="profileImageInput">
              <i className="camera-icon">📸</i>
            </label>
          </button>

          {isImageSelected && !isUploading && (
            <span className="upload-text" onClick={handleImageUpload}>
              Subir Imagen
            </span>
          )}
        </div>

        {/* Campos de perfil */}
        <div className="profile-fields">
          {["name", "email"].map((field) => (
            <div className="field" key={field}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                className="profile-input"
                readOnly={editingField !== field}
              />
              {editingField === field ? (
                <button className="save-button" onClick={handleSave}>
                  💾
                </button>
              ) : (
                <button
                  className="edit-field-button"
                  onClick={() => handleEdit(field)}
                  disabled={editingField !== null && editingField !== field}
                >
                  ✎
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfileComp;
