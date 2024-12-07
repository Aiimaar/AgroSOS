import React, { useState } from 'react';
import { FaCamera, FaPen } from 'react-icons/fa';
import ReactDOM from 'react-dom'; // Importamos ReactDOM para usar createPortal
import './user-profile-content-component.css';

function UserProfileContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'Bob Dylan',
    lastName: 'Dylan',
    email: 'tupadre@gmail.com'
  });

  const openModal = (field) => {
    setFieldToEdit(field);
    setFieldValue(profileData[field]);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFieldValue(e.target.value);
  };

  const saveChanges = () => {
    setProfileData((prevData) => ({
      ...prevData,
      [fieldToEdit]: fieldValue
    }));
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal content
  const modal = isModalOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Editar {fieldToEdit === 'name' ? 'Nombre' : fieldToEdit === 'lastName' ? 'Apellidos' : 'Correo electrónico'}</h3>
        <input
          type="text"
          value={fieldValue}
          onChange={handleInputChange}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button onClick={saveChanges} className="modal-save-button">Guardar</button>
          <button onClick={closeModal} className="modal-cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="user-profile-container">
      <div className="profile-pic-container">
        <div className="profile-pic">
          <FaCamera className="camera-icon" />
        </div>
      </div>

      {/* Campos con íconos de editar */}
      <div className="form-field">
        <label className="label">Nombre</label>
        <div className="input-container">
          <input
            type="text"
            value={profileData.name}
            className="input-field"
            readOnly
          />
          <FaPen className="edit-icon" onClick={() => openModal('name')} />
        </div>
      </div>
      <div className="form-field">
        <label className="label">Apellidos</label>
        <div className="input-container">
          <input
            type="text"
            value={profileData.lastName}
            className="input-field"
            readOnly
          />
          <FaPen className="edit-icon" onClick={() => openModal('lastName')} />
        </div>
      </div>
      <div className="form-field">
        <label className="label">Correo electrónico</label>
        <div className="input-container">
          <input
            type="email"
            value={profileData.email}
            className="input-field"
            readOnly
          />
          <FaPen className="edit-icon" onClick={() => openModal('email')} />
        </div>
      </div>
      <button className="logout-button">Cerrar Sesión</button>

      {/* Usamos React Portal para renderizar el modal */}
      {ReactDOM.createPortal(modal, document.body)}
    </div>
  );
}

export default UserProfileContent;
