import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
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
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

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
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        // Recuperar el plotId desde localStorage
        const plotId = localStorage.getItem("selectedPlotId");

        if (!plotId) {
          console.error("No plot ID found in localStorage");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/sensor_value/plot/${plotId}`
        );
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
              label: t("Temperature"),
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
              label: t("Humidity"),
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
              label: t("Optimal_points"),
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
          color: darkMode ? "white" : "#30590C",
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
          color: darkMode ? "white" : "#30590C",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? "white" : "#30590C",
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: darkMode ? "white" : "#30590C",
        },
        title: {
          display: true,
          text: "Valores",
          color: darkMode ? "white" : "#30590C",
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
        <p>{t("no_registered_sensors")}</p>
      )}
    </div>
  );
};

export default EvolutionGraph;
