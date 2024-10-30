import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorsCrud from "./components/sensors-crud/sensors-crud";

function App() {
  const [data, setData] = useState({ plots: [] });
  const [newPlotName, setNewPlotName] = useState("");
  const [newPlotSize, setNewPlotSize] = useState("");
  const [editingPlot, setEditingPlot] = useState(null);
  const [editingPlotName, setEditingPlotName] = useState("");
  const [editingPlotSize, setEditingPlotSize] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/plots")
      .then((response) => setData({ plots: response.data }))
      .catch((error) => console.error("Error:", error));
  };

  const handleAddPlot = () => {
    if (!newPlotName || !newPlotSize) return;
    fetch("http://localhost:3000/api/plots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newPlotName, size: newPlotSize }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding plot");
        }
        return response.json();
      })
      .then(() => {
        setNewPlotName("");
        setNewPlotSize("");
        fetchData();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdatePlot = (id) => {
    if (!editingPlotName || !editingPlotSize) return;
    fetch(`http://localhost:3000/api/plots/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editingPlotName, size: editingPlotSize }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating plot");
        }
        return response.json();
      })
      .then(() => {
        setEditingPlot(null);
        setEditingPlotName("");
        setEditingPlotSize("");
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeletePlot = (id) => {
    fetch(`http://localhost:3000/api/plots/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting plot");
        }
        fetchData();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEditClick = (plot) => {
    setEditingPlot(plot.id);
    setEditingPlotName(plot.name);
    setEditingPlotSize(plot.size);
  };

  return (
    <div>
      <h1>Datos Agrícolas</h1>

      <h2>Añadir Parcela</h2>
      <input
        type="text"
        value={newPlotName}
        onChange={(e) => setNewPlotName(e.target.value)}
        placeholder="Nombre de la parcela"
      />
      <input
        type="number"
        value={newPlotSize}
        onChange={(e) => setNewPlotSize(e.target.value)}
        placeholder="Tamaño de la parcela"
      />
      <button onClick={handleAddPlot}>Añadir Parcela</button>

      <h2>Parcelas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tamaño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.plots.map((plot) => (
            <tr key={plot.id}>
              <td>{plot.id}</td>
              <td>
                {editingPlot === plot.id ? (
                  <input
                    type="text"
                    value={editingPlotName}
                    onChange={(e) => setEditingPlotName(e.target.value)}
                  />
                ) : (
                  plot.name
                )}
              </td>
              <td>
                {editingPlot === plot.id ? (
                  <input
                    type="number"
                    value={editingPlotSize}
                    onChange={(e) => setEditingPlotSize(e.target.value)}
                  />
                ) : (
                  plot.size
                )}
              </td>
              <td>
                {editingPlot === plot.id ? (
                  <button onClick={() => handleUpdatePlot(plot.id)}>
                    Actualizar
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(plot)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeletePlot(plot.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Gestión de Datos Agrícolas</h1>
      <div className="sensorsCrud">
        <SensorsCrud />
      </div>
    </div>
  );
}

export default App;
