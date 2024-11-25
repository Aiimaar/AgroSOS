import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const EvolutionGraph = () => {
  const [error, setError] = useState(null);

  // Datos estáticos generados de manera aleatoria
  const hours = [0, 4, 8, 12, 16, 20, 23]; // Horas en el eje X
  const generateRandomData = () => Math.floor(Math.random() * (40 - 10 + 1)) + 10; // Genera un valor aleatorio entre 10 y 40

  // Generar datos de temperatura, humedad y puntos óptimos
  const temperatureData = hours.map(() => generateRandomData());
  const humidityData = hours.map(() => generateRandomData());
  const optimalPoints = hours.map((_, index) => (temperatureData[index] === humidityData[index] ? temperatureData[index] : null));

  // Datos para la gráfica
  const data = {
    labels: hours, // Usamos las horas como etiquetas en el eje X
    datasets: [
      {
        label: "Temperatura",
        data: temperatureData,
        borderColor: "red",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Humedad",
        data: humidityData,
        borderColor: "blue",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Puntos Óptimos",
        data: optimalPoints,
        borderColor: "green",
        pointRadius: 5,
        pointBackgroundColor: "green",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Opciones de la gráfica
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Evolución de Temperatura y Humedad",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Tiempo",
        },
        grid: {
          color: "#30590C", // Color de las líneas del eje X
        },
        ticks: {
          color: "#30590C", // Color de las etiquetas del eje X
        },
      },
      y: {
        min: 0,  // Mínimo en 0
        max: 50, // Máximo en 50
        ticks: {
          stepSize: 5,  // Incremento de 5 en 5
          color: "#30590C",  // Color de las etiquetas del eje Y
          callback: function(value) {
            return value;  // Mostrar los valores del eje Y como están
          }
        },
        title: {
          display: true,
          text: "Valor",
        },
        grid: {
          color: "#30590C", // Color de las líneas del eje Y
        },
      },
    },
  };

  return (
    <div className="graph-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default EvolutionGraph;
