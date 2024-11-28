import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCRUD = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', role: '', email: '', password: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("FormData:", formData);
        if (editId) {
            await axios.put(`http://localhost:3000/api/users/${editId}`, formData);
            setEditId(null);
        } else {
            await axios.post('http://localhost:3000/api/users', formData);
        }
        // Restablecer el formulario
        setFormData({ name: '', role: '', email: '', password: '' });
        fetchUsers();
    };

    const handleEdit = (user) => {
        setEditId(user.id);
        setFormData({ name: user.name || '', role: user.role || '', email: user.email || '', password: user.password || '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        fetchUsers();
    };

    return (
        <div className="user-crud-container">
            <h2 className="user-crud-title">CRUD de Usuarios</h2>
            <form className="user-crud-form" onSubmit={handleSubmit}>
                <input
                    className="user-crud-input"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="user-crud-input"
                    type="text"
                    name="role"
                    placeholder="Rol"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="user-crud-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="user-crud-input"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button className="user-crud-submit-button" type="submit">
                    {editId ? "Actualizar" : "Agregar"}
                </button>
            </form>
            <table className="user-crud-table">
                <thead>
                    <tr>
                        <th className="user-crud-table-header">Nombre</th>
                        <th className="user-crud-table-header">Rol</th>
                        <th className="user-crud-table-header">Email</th>
                        <th className="user-crud-table-header">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="user-crud-table-row">
                            <td className="user-crud-table-cell">{user.name}</td>
                            <td className="user-crud-table-cell">{user.role}</td>
                            <td className="user-crud-table-cell">{user.email}</td>
                            <td className="user-crud-table-cell">
                                <button
                                    className="user-crud-edit-button"
                                    onClick={() => handleEdit(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="user-crud-delete-button"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserCRUD;
