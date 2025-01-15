import React, { useEffect, useState } from "react";
import "./user-list.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrash,
  faPencilAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultAvatar from "./default-avatar.png";
import addUserIcon from "./add-user-icon.png";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => setError(error.message));
  }, [navigate]);

  if (error) {
    return <div className="user-list-error-message">Error: {error}</div>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let formData = { ...currentUser };
    if (imageFile) {
      const form = new FormData();
      form.append("profile_image", imageFile);

      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${currentUser.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        closeModal();
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${currentUser.id}`,
          currentUser,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        closeModal();
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    }
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3000/api/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error al eliminar:", error));
  };

  const handleCreateSubmit = async (newUser) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:3000/api/users",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUsers((prevUsers) => [...prevUsers, response.data]);
      setIsCreatePopupOpen(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div className="user-list-container">
      <button className="user-list-back-button" onClick={() => navigate(-1)} aria-label="Volver a la página anterior">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="user-list-title">Lista de usuarios</h1>
      <div
        className="plot-list-create-plot-img-container"
        onClick={() => setIsCreatePopupOpen(true)}
        aria-label="Crear nuevo usuario"
      >
        <img src={addUserIcon} alt="Icono para crear un nuevo usuario" />
      </div>

      <div className="user-list">
        {currentUsers.map((user) => (
          <div key={user.id}>
            <div className="user-list-item">
              <div className="user-list-details">
                <div className="user-list-avatar">
                  <img
                    src={
                      user.profile_image ? user.profile_image : defaultAvatar
                    }
                    alt={
                      user.name
                        ? `${user.name} avatar`
                        : "Avatar predeterminado"
                    }
                    className="user-avatar-img"
                  />
                </div>
                <div className="user-list-info">
                  <p className="user-list-name">{user.name}</p>
                  <p className="user-list-role">{user.role}</p>
                </div>
              </div>
              <div className="user-list-actions">
                <button
                  className="user-list-action-button"
                  onClick={() => handleEdit(user)}
                  aria-label={`Editar usuario ${user.name}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  className="user-list-action-button"
                  onClick={() => handleDelete(user.id)}
                  aria-label={`Eliminar usuario ${user.name}`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <div className="user-list-divider"></div>
          </div>
        ))}
      </div>

      <div className="user-list-arrow-buttons">
        {currentPage > 1 ? (
          <button
            className="user-list-arrow-button user-list-arrow-left"
            onClick={prevPage}
            aria-label="Página anterior"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        ) : (
          <div style={{ width: "40px" }}></div>
        )}

        {indexOfLastUser < users.length && (
          <button
            className="user-list-arrow-button user-list-arrow-right"
            onClick={nextPage}
            aria-label="Página siguiente"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>

      {isCreatePopupOpen && (
        <div className="modal-overlay">
          <CreateUserPopup
            onSubmit={handleCreateSubmit}
            onClose={() => setIsCreatePopupOpen(false)}
          />
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="popup-container">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                id="popup-name"
                value={currentUser?.name || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
                placeholder="Nombre"
                required
              />
              <select
                id="popup-role"
                value={currentUser?.role || ""}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    role: e.target.value,
                  })
                }
                required
              >
                <option value="Farmer">Farmer</option>
                <option value="Admin">Admin</option>
                <option value="Technician">Technician</option>
              </select>
              <input
                type="email"
                id="popup-email"
                value={currentUser?.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                placeholder="Correo electrónico"
                required
              />
              <button type="submit" id="popup-save">
                Guardar
              </button>
              <button type="button" id="popup-cancel" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CreateUserPopup = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    onSubmit({ name, role, email, password });
  };

  return (
    <div className="popup-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          className="user-list-text"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="Farmer">Farmer</option>
          <option value="Admin">Admin</option>
          <option value="Technician">Technician</option>
        </select>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          className="user-list-email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="user-list-password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
          className="user-list-password"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Crear</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UserList;
