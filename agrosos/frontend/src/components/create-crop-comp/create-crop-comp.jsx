import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create-crop-comp.css";

const CreateCropForm = () => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [cropImage, setCropImage] = useState(null);
  const [cropImagePreview, setCropImagePreview] = useState(null);
  const [graphicImage, setGraphicImage] = useState(null);
  const [graphicImagePreview, setGraphicImagePreview] = useState(null);
  const [harvestStartMonth, setHarvestStartMonth] = useState(""); // Mes de inicio de cosecha
  const [harvestEndMonth, setHarvestEndMonth] = useState(""); // Mes de fin de cosecha
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const validateForm = () => {
    if (!name || !info || !cropImage || !graphicImage || !harvestStartMonth || !harvestEndMonth) {
      setError("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || loading) return;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Autenticación requerida. Por favor, inicia sesión.");
      navigate("/login");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("info", info);
    formData.append("crop_image", cropImage);
    formData.append("graphic_image", graphicImage);
    formData.append("harvest_start_month", harvestStartMonth);
    formData.append("harvest_end_month", harvestEndMonth);

    try {
      await axios.post("http://localhost:3000/api/crops", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      setName("");
      setInfo("");
      setCropImage(null);
      setCropImagePreview(null);
      setGraphicImage(null);
      setGraphicImagePreview(null);
      setError("");
      setSuccess(true);

      navigate("/crops");
    } catch (error) {
      setError("Error al crear el cultivo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/crops");
  };

  const handleKeyDown = (e, inputId) => {
    if (e.key === "Enter") {
      document.getElementById(inputId).click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-crop-form">
      <h2 className="create-crop-form-title">Crear Nuevo Cultivo</h2>
      {error && <p className="create-crop-error-message">{error}</p>}
      {success && (
        <p className="create-crop-success-message">
          Cultivo creado exitosamente!
        </p>
      )}
      <div className="create-crop-form-group">
        <label className="create-crop-form-label">Nombre del cultivo*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-crop-form-input"
          tabIndex="0"
        />
      </div>
      <div className="create-crop-form-group">
        <label className="create-crop-form-label">Información*</label>
        <textarea
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className="create-crop-form-textarea"
          tabIndex="0"
        ></textarea>
      </div>
      <div className="create-crop-form-group">
        <label className="create-crop-form-label">Sube tus imágenes*</label>
      </div>
      <div
        className="create-crop-upload-container"
        onClick={() => document.getElementById("crop-image-input").click()}
        onKeyDown={(e) => handleKeyDown(e, "crop-image-input")}
        tabIndex="0"
      >
        <p>Sube una imagen del cultivo</p>
        <input
          id="crop-image-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setCropImage, setCropImagePreview)}
          style={{ display: "none" }}
          tabIndex="0"
        />
      </div>
      {cropImagePreview && (
        // Texto alternativo añadido a la vista previa de la imagen
        <img src={cropImagePreview} alt="Vista previa de la imagen del cultivo" className="create-crop-image-preview" />
      )}
      <div
        className="create-crop-upload-container"
        onClick={() => document.getElementById("graphic-image-input").click()}
        onKeyDown={(e) => handleKeyDown(e, "graphic-image-input")}
        tabIndex="0"
      >
        <p>Sube una imagen gráfica</p>
        <input
          id="graphic-image-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setGraphicImage, setGraphicImagePreview)}
          style={{ display: "none" }}
          tabIndex="0"
        />
      </div>
      {graphicImagePreview && (
        // Texto alternativo añadido a la vista previa de la imagen gráfica
        <img src={graphicImagePreview} alt="Vista previa de la imagen gráfica del cultivo" className="create-crop-image-preview" />
      )}
      <div className="create-crop-form-group">
        <label className="create-crop-form-label">Tiempo de Cosecha*</label>
        <div className="create-crop-time-range">
          <select
            value={harvestStartMonth}
            onChange={(e) => setHarvestStartMonth(e.target.value)}
            className="create-crop-form-select"
            tabIndex="0"
          >
            <option value="">Seleccionar mes de inicio</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={harvestEndMonth}
            onChange={(e) => setHarvestEndMonth(e.target.value)}
            className="create-crop-form-select"
            tabIndex="0"
          >
            <option value="">Seleccionar mes de fin</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="create-crop-form-buttons">
        <button
          type="submit"
          disabled={loading}
          className="create-crop-submit-button"
          tabIndex="0"
        >
          {loading ? "Cargando..." : "Crear Cultivo"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="create-crop-cancel-button"
          tabIndex="0"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateCropForm;
