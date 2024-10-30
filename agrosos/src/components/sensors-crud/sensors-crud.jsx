import React, { useEffect, useState } from "react";
import axios from "axios";

function SensorsCrud() {
  const [data, setData] = useState({ sensors: [] });
  const [newSensorType, setNewSensorType] = useState("");
  const [newSensorValue, setNewSensorValue] = useState("");
  const [newSensorDate, setNewSensorDate] = useState("");
  const [newPlotId, setNewPlotId] = useState("");
  const [editingSensor, setEditingSensor] = useState(null);
  const [editingSensorType, setEditingSensorType] = useState("");
  const [editingSensorValue, setEditingSensorValue] = useState("");
  const [editingSensorDate, setEditingSensorDate] = useState("");
  const [editingPlotId, setEditingPlotId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3000/api/sensors')
      .then((response) => {
        console.log("Datos recibidos de la API:", response.data); // Asegúrate de que esto se muestre con datos válidos
        setData({ sensors: response.data });
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  };

  const handleAddSensor = () => {
    if (!newSensorType || !newSensorValue || !newSensorDate || !newPlotId) return;
    axios
      .post("http://localhost:3000/api/sensors", {
        type: newSensorType,
        value: newSensorValue,
        date: newSensorDate,
        plot_id: newPlotId,
      })
      .then(() => {
        setNewSensorType("");
        setNewSensorValue("");
        setNewSensorDate("");
        setNewPlotId("");
        fetchData();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSensor = (id) => {
    if (!editingSensorType || !editingSensorValue || !editingSensorDate || !editingPlotId) return;
    axios
      .put(`http://localhost:3000/api/sensors/${id}`, {
        type: editingSensorType,
        value: editingSensorValue,
        date: editingSensorDate,
        plot_id: editingPlotId,
      })
      .then(() => {
        setEditingSensor(null);
        setEditingSensorType("");
        setEditingSensorValue("");
        setEditingSensorDate("");
        setEditingPlotId("");
        fetchData();
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDeleteSensor = (id) => {
    axios
      .delete(`http://localhost:3000/api/sensors/${id}`)
      .then(fetchData)
      .catch((error) => console.error("Error:", error));
  };

  const handleEditClick = (sensor) => {
    setEditingSensor(sensor.id);
    setEditingSensorType(sensor.type);
    setEditingSensorValue(sensor.value);
    setEditingSensorDate(sensor.date);
    setEditingPlotId(sensor.plot_id);
  };

  return (
    <div>
      <h1>Datos de Sensores Agrícolas</h1>
      <h2>Añadir Sensor</h2>
      <input
        type="text"
        value={newSensorType}
        onChange={(e) => setNewSensorType(e.target.value)}
        placeholder="Tipo de sensor"
      />
      <input
        type="number"
        value={newSensorValue}
        onChange={(e) => setNewSensorValue(e.target.value)}
        placeholder="Valor del sensor"
      />
      <input
        type="date"
        value={newSensorDate}
        onChange={(e) => setNewSensorDate(e.target.value)}
        placeholder="Fecha de registro"
      />
      <input
        type="number"
        value={newPlotId}
        onChange={(e) => setNewPlotId(e.target.value)}
        placeholder="ID de la parcela"
      />
      <button onClick={handleAddSensor}>Añadir Sensor</button>

      <h2>Sensores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Fecha</th>
            <th>ID Parcela</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>
                {editingSensor === sensor.id ? (
                  <input
                    type="text"
                    value={editingSensorType}
                    onChange={(e) => setEditingSensorType(e.target.value)}
                  />
                ) : (
                  sensor.type
                )}
              </td>
              <td>
                {editingSensor === sensor.id ? (
                  <input
                    type="number"
                    value={editingSensorValue}
                    onChange={(e) => setEditingSensorValue(e.target.value)}
                  />
                ) : (
                  sensor.value
                )}
              </td>
              <td>
                {editingSensor === sensor.id ? (
                  <input
                    type="date"
                    value={editingSensorDate}
                    onChange={(e) => setEditingSensorDate(e.target.value)}
                  />
                ) : (
                  sensor.date
                )}
              </td>
              <td>
                {editingSensor === sensor.id ? (
                  <input
                    type="number"
                    value={editingPlotId}
                    onChange={(e) => setEditingPlotId(e.target.value)}
                  />
                ) : (
                  sensor.plot_id
                )}
              </td>
              <td>
                {editingSensor === sensor.id ? (
                  <button onClick={() => handleUpdateSensor(sensor.id)}>
                    Actualizar
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(sensor)}>Editar</button>
                    <button onClick={() => handleDeleteSensor(sensor.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SensorsCrud;
