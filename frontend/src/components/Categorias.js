import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editandoId) {
      try {
        await axios.put(`http://localhost:3001/api/categorias/${editandoId}`, {
          nombre,
          descripcion,
        });
        setEditandoId(null);
      } catch (error) {
        console.error('Error al actualizar categoría:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:3001/api/categorias', {
          nombre,
          descripcion,
        });
      } catch (error) {
        console.error('Error al crear categoría:', error);
      }
    }

    setNombre('');
    setDescripcion('');
    obtenerCategorias();
  };

  const handleEditar = (categoria) => {
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
    setEditandoId(categoria.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/categorias/${id}`);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <div>
      <h2>{editandoId ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <h2>Lista de Categorías</h2>
      <ul>
        {categorias.map((c) => (
          <li key={c.id}>
            <strong>{c.nombre}</strong> - {c.descripcion}{' '}
            <button onClick={() => handleEditar(c)}>✏️ Editar</button>{' '}
            <button onClick={() => handleEliminar(c.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
