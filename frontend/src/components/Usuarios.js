import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editandoId) {
      try {
        await axios.put(`http://localhost:3001/api/usuarios/${editandoId}`, {
          nombre,
          correo: email,
        });
        setEditandoId(null);
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:3001/api/usuarios', {
          nombre,
          correo: email,
        });
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    }

    setNombre('');
    setEmail('');
    obtenerUsuarios();
  };

  const handleEditar = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.correo);
    setEditandoId(usuario.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <>
      <main>
        <section className="form-container">
          <h2>{editandoId ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              placeholder="Ej: juan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
          </form>
        </section>

        <section className="lista-usuarios">
          <h2>Lista de Usuarios</h2>
          <ul>
            {usuarios.map((u) => (
              <li key={u.id}>
                <span>
                  <strong>{u.nombre}</strong> - {u.correo}
                </span>
                <span>
                  <button onClick={() => handleEditar(u)}>✏️ Editar</button>
                  <button onClick={() => handleEliminar(u.id)}>🗑️ Eliminar</button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Usuarios;
