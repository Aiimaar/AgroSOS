import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import arrow from "./ArrowLeftOutlined.png";
import clock from "./image71.png";
import "./irrigation-frecuency-component.css"

function IrrigationFrecuencyComponent() {
  const [selectedDays, setSelectedDays] = useState([]);

  const days = [
    { name: "mon", icon: faCalendarDays, label: "Lun" },
    { name: "tue", icon: faCalendarDays, label: "Mar" },
    { name: "wed", icon: faCalendarDays, label: "Mie" },
    { name: "thu", icon: faCalendarDays, label: "Jue" },
    { name: "fri", icon: faCalendarDays, label: "Vie" },
    { name: "sat", icon: faCalendarDays, label: "Sab" },
    { name: "sun", icon: faCalendarDays, label: "Dom" }
  ];

  const handleClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div id="irrigation-frecuency-component">
      <div className="irrigation-frecuency-arrow">
        <img
          src={arrow}
          alt="arrow"
          className="irrigation-frecuency-arrow-img"
        />
      </div>
      <h1 className="irrigation-frecuency-title">Frecuencia de riego</h1>
      <p className="irrigation-frecuency-p">Días de riego</p>
      <div className="irrigation-frecuency-calendar">
        {days.map((day) => (
          <div key={day.name} className="irrigation-frecuency-day">
            <FontAwesomeIcon
              icon={day.icon}
              size="2xl"
              className={`irrigation-frecuency-calendar-icon ${selectedDays.includes(day.name) ? 'selected' : ''}`}
              onClick={() => handleClick(day.name)}
            />
            <span className="irrigation-frecuency-day-label">{day.label}</span>
          </div>
        ))}
      </div>
      <p className="irrigation-frecuency-p2">Horas de riego</p>
      <div className="irrigation-frecuency-clock">
        <img src={clock} alt="clock" className="irrigation-frecuency-clock-img"/>
      </div>
      <button className="irrigation-frecuency-pro">Programar riego</button>
    </div>
  );
}

export default IrrigationFrecuencyComponent;
