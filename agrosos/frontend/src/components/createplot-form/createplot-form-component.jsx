import React, { useState } from "react";
import axios from "axios";
import plot from "./ImagewithFixedRatio.png";
import "./createplot-form-component.css";

const CreatePlotForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("m2");
  const [image, setImage] = useState(null);
  const [imageOption, setImageOption] = useState("upload");
  const [color, setColor] = useState("#ffffff");
  const [temperature, setTemperature] = useState("");
  const [irrigationSystem, setIrrigationSystem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!name) {
      setError("Nombre es obligatorio.");
      return false;
    }
    if (!size) {
      setError("Dimensiones del terreno son obligatorias.");
      return false;
    }
    if (!temperature) {
      setError("Cantidad de sensores es obligatoria.");
      return false;
    }
    if (irrigationSystem === null) {
      setError("Sistema de riego es obligatorio.");
      return false;
    }
    if (imageOption === "upload" && !image) {
      setError("Sube una imagen o selecciona otra opción.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (loading) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("size", size);
    formData.append("unit", unit);
    formData.append("temperature", temperature);
    formData.append("irrigationSystem", irrigationSystem);

    if (imageOption === "upload" && image) {
      formData.append("image", image);
    } else if (imageOption === "default") {
      formData.append("image", "default_image.jpg");
    } else if (imageOption === "solid-color") {
      formData.append("image", color);
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/plots", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setSize("");
      setUnit("m2");
      setImage(null);
      setTemperature("");
      setIrrigationSystem(false);
      setError("");
    } catch (error) {
      setError("Error al crear el terreno.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="plot-form">
      <h2 className="form-title">Crear Nuevo Terreno</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label className="form-label">Nombre del terreno*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Dimensiones del terreno*</label>
        <div className="size-unit-container">
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="form-input"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="form-select"
          >
            <option value="m2">m²</option>
            <option value="ha">ha</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Cantidad de sensores*</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group checkbox-container">
        <label className="form-label">Sistema de riego*</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={irrigationSystem}
              onChange={(e) => setIrrigationSystem(e.target.checked)}
              className="form-checkbox"
            />
            Sí
          </label>
          <label>
            <input
              type="checkbox"
              checked={!irrigationSystem}
              onChange={(e) => setIrrigationSystem(!e.target.checked)}
              className="form-checkbox"
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Personaliza tu terreno*</label>
        <select
          value={imageOption}
          onChange={(e) => setImageOption(e.target.value)}
          className="form-select"
        >
          <option value="upload">Subir imagen</option>
          <option value="default">Imagen predeterminada</option>
          <option value="solid-color">Color sólido</option>
        </select>
      </div>

      {imageOption === "upload" && (
        <div
          className="upload-container"
          onClick={() => document.getElementById("file-input").click()}
        >
          <img src={plot} alt="Ícono de subir" />
          <p>Suba una foto</p>
          <input id="file-input" type="file" onChange={handleImageChange} />
        </div>
      )}

      {imageOption === "upload" && image && (
        <div className="image-preview-container">
          <p>Vista previa de la imagen seleccionada:</p>
          <img src={image} alt="Vista previa" className="image-preview" />
        </div>
      )}

      {imageOption === "default" && (
        <div className="default-image-container">
          <p>Se utilizará una imagen predeterminada para este terreno.</p>
          <img
            src={
              "https://via.placeholder.com/150x100.png?text=Imagen+predeterminada"
            }
            alt="Imagen predeterminada"
          />
        </div>
      )}

      {imageOption === "solid-color" && (
        <div className="color-picker-container">
          <label htmlFor="color-picker">Seleccionar color:</label>
          <input
            type="color"
            id="color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <p>El color seleccionado será el fondo del terreno.</p>
        </div>
      )}

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Cargando..." : "Crear Terreno"}
      </button>
    </form>
  );
};

export default CreatePlotForm;
