import React, { useEffect, useState } from "react"; // Importa React y hooks para manejar estado y efectos
import "./user-list.css"; // Importa los estilos CSS para la lista de usuarios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importa el componente FontAwesomeIcon para iconos
import {
  faArrowLeft,
  faTrash,
  faPencilAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Importa varios iconos para la interfaz de usuario
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para la navegación
import axios from "axios"; // Importa Axios para realizar solicitudes HTTP
import defaultAvatar from "./default-avatar.png"; // Importa una imagen predeterminada de avatar

const UserList = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual de la paginación
  const [usersPerPage] = useState(10); // Número de usuarios por página
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si el modal está abierto o cerrado
  const [currentUser, setCurrentUser] = useState(null); // Estado para manejar el usuario actualmente seleccionado para editar
  const [imageFile, setImageFile] = useState(null); // Estado para manejar la imagen de perfil seleccionada
  const navigate = useNavigate(); // Hook para la navegación programática

  // useEffect se ejecuta cuando el componente se monta, haciendo una solicitud para obtener la lista de usuarios
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Obtiene el token de autenticación almacenado

    if (!token) {
      navigate("/login"); // Si no hay token, redirige a la página de login
      return;
    }

    // Hace una solicitud GET a la API para obtener los usuarios
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Pasa el token en los encabezados para autenticación
        },
      })
      .then((response) => {
        console.log(response.data); // Imprime los datos recibidos de la API (para depuración)
        setUsers(response.data); // Establece la lista de usuarios en el estado
      })
      .catch((error) => setError(error.message)); // Si hay un error, lo guarda en el estado de error
  }, [navigate]); // El useEffect se ejecuta una sola vez al cargar el componente

  // Si hay un error, muestra el mensaje de error
  if (error) {
    return <div className="user-list-error-message">Error: {error}</div>;
  }

  // Cálculos para la paginación: determina los índices de los usuarios a mostrar
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Obtiene los usuarios de la página actual

  // Función para ir a la siguiente página
  const nextPage = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para abrir el modal y editar un usuario
  const handleEdit = (user) => {
    setCurrentUser(user); // Establece el usuario seleccionado en el estado
    setIsModalOpen(true); // Abre el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setCurrentUser(null); // Limpia el estado del usuario seleccionado
    setImageFile(null); // Limpia la imagen de perfil seleccionada
  };

  // Función que maneja el cambio de la imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo de imagen seleccionado
    if (file) {
      setImageFile(file); // Establece la imagen seleccionada en el estado
    }
  };

  // Función para guardar los cambios realizados al editar el usuario
  const handleSave = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Prepara los datos del usuario para actualizarlo
    let formData = { ...currentUser };
    if (imageFile) {
      // Si se seleccionó una nueva imagen, la subimos al servidor
      const form = new FormData();
      form.append("profile_image", imageFile); // Agrega la imagen al formulario

      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${currentUser.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Indicamos que estamos enviando un formulario con archivos
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Agregamos el token de autenticación
            },
          }
        );

        const updatedUser = response.data; // El usuario actualizado
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        ); // Actualiza la lista de usuarios con los datos del usuario actualizado
        closeModal(); // Cierra el modal después de guardar
      } catch (error) {
        console.error("Error al subir la imagen:", error); // Si hay un error, lo imprime
      }
    } else {
      // Si no se seleccionó una imagen nueva, solo actualiza los demás datos del usuario
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${currentUser.id}`,
          currentUser,
          {
            headers: {
              "Content-Type": "application/json", // Indicamos que los datos son JSON
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Agregamos el token de autenticación
            },
          }
        );

        const updatedUser = response.data; // El usuario actualizado
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        ); // Actualiza la lista de usuarios con los datos del usuario actualizado
        closeModal(); // Cierra el modal después de guardar
      } catch (error) {
        console.error("Error al guardar:", error); // Si hay un error, lo imprime
      }
    }
  };

  // Función para eliminar un usuario
  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3000/api/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Elimina el usuario de la lista
      })
      .catch((error) => console.error("Error al eliminar:", error)); // Si hay un error, lo imprime
  };

  return (
    <div className="user-list-container">
      {/* Botón de retroceso que navega a la página principal */}
      <button className="user-list-back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="user-list-title">Lista de usuarios</h1>

      <div className="user-list">
        {/* Mapea y muestra la lista de usuarios */}
        {currentUsers.map((user) => (
          <div key={user.id}>
            <div className="user-list-item">
              <div className="user-list-details">
                <div className="user-list-avatar">
                  <img
                    src={
                      user.profile_image
                        ? user.profile_image
                        : defaultAvatar // Si no hay imagen, muestra una imagen predeterminada
                    }
                    alt={user.name ? `${user.name} avatar` : "Avatar predeterminado"}
                    className="user-avatar-img"
                  />
                </div>
                <div className="user-list-info">
                  <p className="user-list-name">{user.name}</p>
                  <p className="user-list-role">{user.role}</p>
                </div>
              </div>
              <div className="user-list-actions">
                {/* Botones para editar o eliminar el usuario */}
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

      {/* Botones de paginación */}
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

      {/* Modal para editar usuario */}
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
              <label htmlFor="user-list-avatar">Imagen de Perfil</label>
              <input
                type="file"
                id="user-list-avatar"
                onChange={handleImageChange}
              />
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