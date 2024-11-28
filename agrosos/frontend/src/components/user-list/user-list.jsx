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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/users/${currentUser.id}`, currentUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        closeModal();
      })
      .catch((error) => console.error("Error al guardar:", error));
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3000/api/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error al eliminar:", error));
  };

  return (
    <div className="user-list-container">
      <button className="user-list-back-button" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="user-list-title">Lista de usuarios</h1>

      <div className="user-list">
        {currentUsers.map((user) => (
          <div key={user.id}>
            <div className="user-list-item">
              <div className="user-list-details">
                <div className="user-list-avatar"></div>
                <div className="user-list-info">
                  <p className="user-list-name">{user.name}</p>
                  <p className="user-list-role">{user.role}</p>
                </div>
              </div>
              <div className="user-list-actions">
                <button
                  className="user-list-action-button"
                  onClick={() => handleEdit(user)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  className="user-list-action-button"
                  onClick={() => handleDelete(user.id)}
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
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="user-list-modal-overlay">
          <div className="user-list-modal">
            <h2 className="user-list-modal-title">Editar Usuario</h2>
            <form id="user-list-edit-form">
              <label htmlFor="user-list-name">Nombre</label>
              <input
                type="text"
                id="user-list-name"
                value={currentUser?.name || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
              <label htmlFor="user-list-email">Correo</label>
              <input
                type="email"
                id="user-list-email"
                value={currentUser?.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
              <label htmlFor="user-list-role">Rol</label>
              <select
                id="user-list-role"
                value={currentUser?.role || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                <option value="farmer">Farmer</option>
                <option value="technician">Technician</option>
                <option value="admin">Admin</option>
              </select>
              <div className="user-list-modal-actions">
                <button
                  type="button"
                  onClick={closeModal}
                  className="user-list-cancel-button"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleSave}
                  className="user-list-save-button"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
