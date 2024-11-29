import React, { useState } from "react";
import axios from "axios";
import plot from "./ImagewithFixedRatio.png";
import pre from "./image29.png";
import "./createplot-form-component.css";
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
  const validateForm = () => {
    if (
      !name ||
      !size ||
      (imageOption === "upload" && !image)
    ) {
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
  
    try {
      // Subir imagen según la opción seleccionada
      if (imageOption === "upload" && image) {
        formData.append("image", image);
      } else if (imageOption === "default") {
        // Convertir la imagen predeterminada en un archivo Blob
        const response = await fetch(pre); // Descargar la imagen
        const blob = await response.blob(); // Convertirla a Blob
        const defaultImageFile = new File([blob], "default-image.png", { type: blob.type }); // Crear un archivo
        formData.append("image", defaultImageFile); // Agregarlo al FormData
      } else if (imageOption === "solid-color") {
        formData.append("imageName", color);
      }
  
      await axios.post("http://localhost:3000/api/plots", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Reiniciar estado tras éxito
      setName("");
      setSize("");
      setUnit("m2");
      setImage(null);
      setImageName("");
      setError("");
      setSuccess(true);
    } catch (error) {
      setError("Error al crear el terreno.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="create-plot-form">
      {" "}
      <h2 className="create-plot-form-title">Crear Nuevo Terreno</h2>{" "}
      {error && <p className="create-plot-error-message">{error}</p>}{" "}
      {success && (
        <p className="create-plot-success-message">
          Terreno creado exitosamente!
        </p>
      )}{" "}
      <div className="create-plot-form-group">
        {" "}
        <label className="create-plot-form-label">
          Nombre del terreno*
        </label>{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-plot-form-input"
        />{" "}
      </div>{" "}
      <div className="create-plot-form-group">
        {" "}
        <label className="create-plot-form-label">
          Dimensiones del terreno*
        </label>{" "}
        <div className="size-unit-container">
          {" "}
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="create-plot-form-input"
          />{" "}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="create-plot-form-select"
          >
            {" "}
            <option value="m2">m²</option> <option value="ha">ha</option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      <div className="create-plot-form-group">
        {" "}
        <label className="create-plot-form-label">
          Personaliza tu terreno*
        </label>{" "}
        <select
          value={imageOption}
          onChange={(e) => setImageOption(e.target.value)}
          className="create-plot-form-select"
        >
          {" "}
          <option value="upload">Subir imagen</option>{" "}
          <option value="default">Imagen predeterminada</option>{" "}
          <option value="solid-color">Color sólido</option>{" "}
        </select>{" "}
      </div>{" "}
      {imageOption === "upload" && (
        <div
          className="create-plot-upload-container"
          onClick={() => document.getElementById("file-input").click()}
        >
          {" "}
          <img src={plot} alt="Ícono de subir" /> <p>Sube una foto</p>{" "}
          <input id="file-input" type="file" onChange={handleImageChange} />{" "}
        </div>
      )}{" "}
      {imageOption === "upload" && imageName && (
        <div className="create-plot-image-preview-container">
          {" "}
          <p>Vista previa de la imagen seleccionada:</p>{" "}
          <img
            src={URL.createObjectURL(image)}
            alt="Vista previa"
            className="image-preview"
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />{" "}
        </div>
      )}{" "}
      {imageOption === "default" && (
        <div className="create-plot-default-image-container">
          {" "}
          <p>Se utilizará la siguiente imagen predeterminada:</p>{" "}
          <img
            src={pre}
            alt="Imagen predeterminada"
            className="image-preview"
          />{" "}
        </div>
      )}{" "}
      {imageOption === "solid-color" && (
        <div className="create-plot-color-picker-container">
          {" "}
          <label htmlFor="create-plot-color-picker">
            Seleccionar color:
          </label>{" "}
          <input
            type="color"
            id="color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <p>El color seleccionado será el fondo del terreno.</p>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="create-plot-submit-button"
      >
        {loading ? "Cargando..." : "Crear Terreno"}
      </button>
    </form>
  );
};

export default CreatePlotForm;
