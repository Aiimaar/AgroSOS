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
          profile_image: response.data.profile_image || "",
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
      setIsImageSelected(true);
      setImageFile(file);
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("profile_image", imageFile);

    try {
      setIsUploading(true);
      setIsImageSelected(false);

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

      const updatedProfileImage = response.data.profile_image;
      console.log("Imagen actualizada:", updatedProfileImage);

      alert("Imagen de perfil actualizada");

      setUserData({
        ...userData,
        profile_image: updatedProfileImage,
      });

      setImageFile(null);
    } catch (error) {
      alert("Error al subir la imagen de perfil");
      console.error("Error al subir la imagen:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <div className="user-profile-comp-page">
      <div className="user-profile-comp-container">
        <div className="user-profile-comp-photo-container">
          <img
            src={`http://localhost:3000/uploads/${userData.profile_image}`}
            alt="profile"
            className="user-profile-comp-photo"
          />
          <button
            className="user-profile-comp-edit-photo-button"
            style={{
              display: isUploading || isImageSelected ? "none" : "block",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="userProfileCompImageInput"
            />
            <label htmlFor="userProfileCompImageInput">
              <i className="user-profile-comp-camera-icon">📸</i>
            </label>
          </button>

          {isImageSelected && !isUploading && (
            <span
              className="user-profile-comp-upload-text"
              onClick={handleImageUpload}
            >
              Subir Imagen
            </span>
          )}
        </div>

        <div className="user-profile-comp-fields">
          {["name", "email"].map((field) => (
            <div className="user-profile-comp-field" key={field}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                className="user-profile-comp-input"
                readOnly={editingField !== field}
              />
              {editingField === field ? (
                <button
                  className="user-profile-comp-save-button"
                  onClick={handleSave}
                >
                  💾
                </button>
              ) : (
                <button
                  className="user-profile-comp-edit-field-button"
                  onClick={() => handleEdit(field)}
                  disabled={editingField !== null && editingField !== field}
                >
                  ✎
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          className="user-profile-comp-logout-button"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfileComp;
