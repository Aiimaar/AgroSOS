import React, { useState } from "react";
import axios from "axios";
import plot from "./ImagewithFixedRatio.png";
import pre from "./image29.png";
import { useNavigate } from "react-router-dom";
import "./createplot-form-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const CreatePlotForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("m2");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageOption, setImageOption] = useState("upload");
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !size || (imageOption === "upload" && !image) || !userId) {
      setError("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("size", size);
    formData.append("unit", unit);

    // Verificar y añadir farmer_id
    if (userId) {
      formData.append("user_id", userId);
    } else {
      setError("Error: No se encontró el ID del usuario. Intenta iniciar sesión de nuevo.");
      setLoading(false);
      return;
    }

    try {
      if (imageOption === "upload" && image) {
        formData.append("image", image);
      } else if (imageOption === "default") {
        formData.append("default_image", "X");
      } else if (imageOption === "solid-color") {
        formData.append("color", color);
      }

      console.log("Contenido de FormData antes del envío:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      await axios.post("http://localhost:3000/api/plots", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Resetear el formulario
      setName("");
      setSize("");
      setUnit("m2");
      setImage(null);
      setImageName("");
      setError("");
      setSuccess(true);

      // Navegar a la lista de terrenos
      navigate("/plot-list");
    } catch (error) {
      setError("Error al crear el terreno.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/plot-list");
  };

  return (
    <form onSubmit={handleSubmit} className={`create-plot-form ${darkMode ? 'dark-mode' : ''}`}>
      <h2 className="create-plot-form-title">Crear Nuevo Terreno</h2>
      {error && <p className="create-plot-error-message">{error}</p>}
      {success && (
        <p role="status" className="create-plot-success-message">
          Terreno creado exitosamente!
        </p>
      )}
      <div className="create-plot-form-group">
        <label htmlFor="name" className="create-plot-form-label">Nombre del terreno*</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-plot-form-input"
          aria-required="true"
        />
      </div>
      <div className="create-plot-form-group">
        <label htmlFor="size" className="create-plot-form-label">Dimensiones del terreno*</label>
        <div className="size-unit-container">
          <input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="create-plot-form-input"
            aria-required="true"
          />
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="create-plot-form-select"
            aria-required="true"
          >
            <option value="m2">m²</option>
            <option value="ha">ha</option>
          </select>
        </div>
      </div>
      <div className="create-plot-form-group">
        <label htmlFor="image-option" className="create-plot-form-label">Personaliza tu terreno*</label>
        <select
          id="image-option"
          value={imageOption}
          onChange={(e) => setImageOption(e.target.value)}
          className="create-plot-form-select"
          aria-required="true"
        >
          <option value="upload">Subir imagen</option>
          <option value="default">Imagen predeterminada</option>
          <option value="solid-color">Color sólido</option>
        </select>
      </div>
      {imageOption === "upload" && (
        <div
          className="create-plot-upload-container"
          onClick={() => document.getElementById("file-input").click()}
          role="button"
          aria-label="Subir una imagen"
        >
          <img src={plot} alt="Ícono de subir imagen" />
          <p>Sube una foto</p>
          <input
            id="file-input"
            type="file"
            onChange={handleImageChange}
            aria-label="Selecciona una imagen para subir"
          />
        </div>
      )}
      {imageOption === "upload" && imageName && (
        <div className="create-plot-image-preview-container">
          <p>Vista previa de la imagen seleccionada:</p>
          <img
            src={URL.createObjectURL(image)}
            alt="Vista previa de la imagen subida"
            className="image-preview"
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />
        </div>
      )}
      {imageOption === "default" && (
        <div className="create-plot-default-image-container">
          <p>Se utilizará la siguiente imagen predeterminada:</p>
          <img
            src={pre}
            alt="Imagen predeterminada de terreno"
            className="image-preview"
          />
        </div>
      )}
      {imageOption === "solid-color" && (
        <div className="create-plot-color-picker-container">
          <label htmlFor="create-plot-color-picker">Seleccionar color:</label>
          <input
            type="color"
            id="color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Selecciona un color para el fondo"
          />
          <p>El color seleccionado será el fondo del terreno.</p>
        </div>
      )}
      <div className="create-plot-form-buttons">
        <button
          type="submit"
          disabled={loading}
          className="create-plot-submit-button"
          aria-live="polite"
        >
          {loading ? "Cargando..." : "Crear Terreno"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="create-plot-cancel-button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreatePlotForm;
