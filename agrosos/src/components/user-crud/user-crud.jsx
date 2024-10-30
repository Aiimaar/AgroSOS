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
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://localhost:3000/users/${editId}`, formData);
            setEditId(null);
        } else {
            await axios.post('http://localhost:3000/users', formData);
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
        await axios.delete(`http://localhost:3000/users/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <h2>CRUD de Usuarios</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Rol"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Editar</button>
                                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserCRUD;
