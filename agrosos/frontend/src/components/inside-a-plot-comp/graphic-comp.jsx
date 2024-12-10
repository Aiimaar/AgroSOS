import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const EvolutionGraph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        // Recuperar el plotId y el token desde localStorage
        const plotId = localStorage.getItem("selectedPlotId");
        const token = localStorage.getItem("authToken");

        if (!plotId) {
          console.error("No plot ID found in localStorage");
          return;
        }

        if (!token) {
          console.error("No auth token found in localStorage");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/sensor_value/plot/${plotId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Añade el token aquí
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const sensorData = await response.json();

        const temperatureSensors = sensorData.filter(
          (sensor) => sensor.Sensor.type === "temperature"
        );
        const humiditySensors = sensorData.filter(
          (sensor) => sensor.Sensor.type === "humidity"
        );

        const hours = [0, 4, 8, 12, 16, 20, 23];

        const temperatureValues = new Array(hours.length).fill(null);
        const humidityValues = new Array(hours.length).fill(null);
        const optimalPoints = new Array(hours.length).fill(null);

        const roundToNearestHour = (sensorHour) => {
          return hours.reduce((nearest, hour) =>
            Math.abs(sensorHour - hour) < Math.abs(sensorHour - nearest)
              ? hour
              : nearest
          );
        };

        temperatureSensors.forEach((sensor) => {
          const date = new Date(sensor.createdAt);
          if (!isNaN(date)) {
            const sensorHour = date.getHours();
            const nearestHour = roundToNearestHour(sensorHour);
            const hourIndex = hours.indexOf(nearestHour);
            if (hourIndex !== -1) {
              temperatureValues[hourIndex] = sensor.value;
            }
          }
        });

        humiditySensors.forEach((sensor) => {
          const date = new Date(sensor.createdAt);
          if (!isNaN(date)) {
            const sensorHour = date.getHours();
            const nearestHour = roundToNearestHour(sensorHour);
            const hourIndex = hours.indexOf(nearestHour);
            if (hourIndex !== -1) {
              humidityValues[hourIndex] = sensor.value;
            }
          }
        });

        for (let i = 0; i < hours.length; i++) {
          if (temperatureValues[i] !== null && humidityValues[i] !== null) {
            optimalPoints[i] =
              temperatureValues[i] === humidityValues[i]
                ? temperatureValues[i]
                : null;
          }
        }

        setData({
          labels: hours,
          datasets: [
            {
              label: "Temperatura (°C)",
              data: temperatureValues,
              borderColor: "red",
              pointBorderColor: "red",
              pointBackgroundColor: "red",
              pointStyle: "circle",
              pointRadius: 4,
              fill: false,
              tension: 0.3,
              z: 0,
            },
            {
              label: "Humedad (%)",
              data: humidityValues,
              borderColor: "blue",
              pointBorderColor: "blue",
              pointBackgroundColor: "blue",
              pointStyle: "circle",
              pointRadius: 4,
              fill: true,
              tension: 0.3,
              z: 0,
            },
            {
              label: "Puntos Óptimos",
              data: optimalPoints,
              borderColor: "green",
              pointBackgroundColor: "green",
              pointBorderColor: "green",
              pointRadius: 6,
              fill: false,
              showLine: false,
              z: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#30590C",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo (Horas)",
          color: "#30590C",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#30590C",
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#30590C",
        },
        title: {
          display: true,
          text: "Valores",
          color: "#30590C",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data ? (
        <Line data={data} options={options} />
      ) : (
        <p>No hay sensores registrados.</p>
      )}
    </div>
  );
};

export default EvolutionGraph;
