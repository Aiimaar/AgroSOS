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
        const response = await fetch(
          "http://localhost:3000/api/sensor_value/plot/36"
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
              label: "Temperatura (°C)",
              data: temperatureValues,
              borderColor: "red",
              pointBorderColor: "red",
              pointBackgroundColor: "red",
              pointStyle: "circle",
              pointRadius: 0,
              fill: false,
              tension: 0.3,
              z: 1,
            },
            {
              label: "Humedad (%)",
              data: humidityValues,
              borderColor: "blue",
              pointBorderColor: "blue",
              pointBackgroundColor: "blue",
              pointStyle: "circle",
              pointRadius: 0,
              fill: false,
              tension: 0.3,
              z: 1,
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
              z: 2,
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
        <p>Loading sensor data...</p>
      )}
    </div>
  );
};

export default EvolutionGraph;
