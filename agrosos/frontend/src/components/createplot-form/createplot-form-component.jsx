import React, { useState } from "react";
import axios from "axios";
import plot from "./ImagewithFixedRatio.png";
import pre from "./image29.png";
import { useNavigate } from "react-router-dom";
import "./createplot-form-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { useTranslation } from "react-i18next"; // Importar useTranslation

const CreatePlotForm = () => {
  const { t } = useTranslation(); // Usar el hook useTranslation
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
      setError(t("error_message2"));
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
      setError(t("error_message2"));
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
      setError(t("error_message2"));
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
      <h2 className="create-plot-form-title">{t("create_plot_form_title")}</h2>
      {error && <p className="create-plot-error-message">{error}</p>}
      {success && (
        <p role="status" className="create-plot-success-message">
          {t("success_message2")}
        </p>
      )}
      <div className="create-plot-form-group">
        <label htmlFor="name" className="create-plot-form-label">{t("name_label2")}</label>
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
        <label htmlFor="size" className="create-plot-form-label">{t("size_label")}</label>
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
        <label htmlFor="image-option" className="create-plot-form-label">{t("upload_image")}</label>
        <select
          id="image-option"
          value={imageOption}
          onChange={(e) => setImageOption(e.target.value)}
          className="create-plot-form-select"
          aria-required="true"
        >
          <option value="upload">{t("upload_image")}</option>
          <option value="default">{t("default_image")}</option>
          <option value="solid-color">{t("solid_color")}</option>
        </select>
      </div>
      {imageOption === "upload" && (
        <div
          className="create-plot-upload-container"
          onClick={() => document.getElementById("file-input").click()}
          role="button"
          aria-label={t("upload_image")}
        >
          <img src={plot} alt="Ícono de subir imagen" />
          <p>{t("upload_image")}</p>
          <input
            id="file-input"
            type="file"
            onChange={handleImageChange}
            aria-label={t("upload_image")}
          />
        </div>
      )}
      {imageOption === "upload" && imageName && (
        <div className="create-plot-image-preview-container">
          <p>{t("upload_image")}: {imageName}</p>
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
          <p>{t("default_image")}</p>
          <img
            src={pre}
            alt="Imagen predeterminada de terreno"
            className="image-preview"
          />
        </div>
      )}
      {imageOption === "solid-color" && (
        <div className="create-plot-color-picker-container">
          <label htmlFor="create-plot-color-picker">{t("select_color")}</label>
          <input
            type="color"
            id="color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label={t("select_color")}
          />
          <p>{t("color_description")}</p>
        </div>
      )}
      <div className="create-plot-form-buttons">
        <button
          type="submit"
          disabled={loading}
          className="create-plot-submit-button"
          aria-live="polite"
        >
          {loading ? t("loading_button2") : t("create_button2")}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="create-plot-cancel-button"
        >
          {t("cancel_button2")}
        </button>
      </div>
    </form>
  );
};

export default CreatePlotForm;
