import React, { useState } from "react";
import axios from "axios";
import { onCreatePlot } from "../../services/plotService";

const CreatePlotForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");

  if (!token) {
    navigate("/login");
    return;
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !size) {
      setError("Nombre y tamaño son obligatorios.");
      return;
    }

    if (loading) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("size", size);
    formData.append("temperature", temperature);
    formData.append("humidity", humidity);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/plots", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // onCreatePlot(response.data);
      
      setName("");
      setSize("");
      setImage(null);
      setTemperature("");
      setHumidity("");
    } catch (error) {
      setError("Error al crear el terreno.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Nuevo Terreno</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tamaño:</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Temperatura:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div>
        <label>Humedad:</label>
        <input
          type="number"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
        />
      </div>
      <div>
        <label>Imagen del Terreno:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Crear Terreno"}
      </button>
    </form>
  );
};

export default CreatePlotForm;
