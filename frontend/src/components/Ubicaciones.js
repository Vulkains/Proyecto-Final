import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerUbicaciones();
  }, []);

  const obtenerUbicaciones = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/ubicaciones');
      setUbicaciones(res.data);
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      direccion,
      ciudad,
    };

    try {
      if (editandoId) {
        await axios.put(`http://localhost:3001/api/ubicaciones/${editandoId}`, data);
        setEditandoId(null);
      } else {
        await axios.post('http://localhost:3001/api/ubicaciones', data);
      }
      setDireccion('');
      setCiudad('');
      obtenerUbicaciones();
    } catch (error) {
      console.error('Error al guardar ubicación:', error);
    }
  };

  const handleEditar = (ubicacion) => {
    setDireccion(ubicacion.direccion);
    setCiudad(ubicacion.ciudad);
    setEditandoId(ubicacion.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/ubicaciones/${id}`);
      obtenerUbicaciones();
    } catch (error) {
      console.error('Error al eliminar ubicación:', error);
    }
  };

  return (
    <div>
      <h2>{editandoId ? 'Editar Ubicación' : 'Agregar Ubicación'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
        />
        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <h2>Lista de Ubicaciones</h2>
      <ul>
        {ubicaciones.map((u) => (
          <li key={u.id}>
            <strong>{u.direccion}</strong> - {u.ciudad}{' '}
            <button onClick={() => handleEditar(u)}>✏️ Editar</button>{' '}
            <button onClick={() => handleEliminar(u.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ubicaciones;
