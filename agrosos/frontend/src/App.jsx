import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorsCrud from "./components/sensors-crud/sensors-crud";
import UserCRUD from "./components/user-crud/user-crud";
import RegisterForm from "./components/register-form/register-form.jsx";

function App() {
  const [data, setData] = useState({ plots: [] });
  const [newPlotName, setNewPlotName] = useState("");
  const [newPlotSize, setNewPlotSize] = useState("");
  const [editingPlot, setEditingPlot] = useState(null);
  const [editingPlotName, setEditingPlotName] = useState("");
  const [editingPlotSize, setEditingPlotSize] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleAddPlot = () => {
    const newPlot = {
      name: newPlotName,
      size: newPlotSize,
    };

    axios
      .post("http://localhost:3000/api/plots", newPlot)
      .then((response) => {
        setData((prevData) => ({
          plots: [...prevData.plots, response.data],
        }));
        setNewPlotName("");
        setNewPlotSize("");
      })
      .catch((error) => console.error("Error al añadir parcela:", error));
  };

  useEffect(() => {
    if (isRegistered) {
      fetchData();
    }
  }, [isRegistered]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/plots")
      .then((response) => setData({ plots: response.data }))
      .catch((error) => console.error("Error:", error));
  };

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
  };

  if (!isRegistered) {
    return <RegisterForm onRegister={handleRegistrationComplete} />;
  }

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

      <div className="sensorsCrud">
        <SensorsCrud />
      </div>

      <div className="user-crud">
        <UserCRUD />
      </div>
    </div>
  );
}

export default App;
