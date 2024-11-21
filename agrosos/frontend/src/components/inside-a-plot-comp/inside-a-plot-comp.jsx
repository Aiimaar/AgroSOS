import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './inside-a-plot-comp.css'; // Asegúrate de estilizar el componente

const InsideAPlotComp = () => {
  const [crops, setCrops] = useState([]); // Estado inicial definido como un array vacío
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null); // Manejo de errores para la API

  // Obtener cultivos
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('/api/crops');
        if (Array.isArray(response.data)) {
          setCrops(response.data);
        } else {
          throw new Error('La respuesta de la API no es un array');
        }
      } catch (error) {
        console.error('Error al obtener cultivos:', error);
        setError('Error al cargar los cultivos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchCrops();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      console.log('Nueva tarea añadida:', newTask);
      setNewTask('');
    }
  };

  return (
    <div className="plot-details">
      <section className="crops-section">
        <h3>Cultivos en el terreno</h3>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="crops">
            {Array.isArray(crops) && crops.length > 0 ? (
              crops.map(crop => (
                <img
                  key={crop.id}
                  src={`/uploads/${crop.crop_image}`}
                  alt={crop.name}
                  title={crop.name}
                  className="crop-image"
                />
              ))
            ) : (
              <p className="no-crops">No hay cultivos registrados.</p>
            )}
          </div>
        )}
      </section>

      <section className="evolution-section">
        <h3>Evolución Temperatura / Humedad</h3>
        {/* Aquí iría un componente de gráfico */}
        <div className="chart-placeholder">[Gráfico]</div>
      </section>

      <section className="climate-section">
        <h3>Clima</h3>
        <div className="climate-stats">
          <p>25°C <span>Temperatura</span></p>
          <p>28°C <span>Temperatura del terreno</span></p>
          <p>34% <span>Humedad</span></p>
          <p>56% <span>Humedad del terreno</span></p>
        </div>
      </section>

      <section className="actions-section">
        <h3>Acciones</h3>
        <button className="action-button">Activar Riego</button>
        <button className="action-button">Desactivar Riego</button>
      </section>

      <section className="tasks-section">
        <h3>Tareas</h3>
        <ul className="task-list">
          <li>Regar</li>
          <li>Fumigar</li>
          <li>Podar</li>
        </ul>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            placeholder="Añadir tarea completada..."
            onChange={e => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask} className="add-task-button">Añadir</button>
        </div>
      </section>
    </div>
  );
};

export default InsideAPlotComp;
