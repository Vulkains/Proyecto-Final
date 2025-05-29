import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [idUsuario, setIdUsuario] = useState('');
  const [total, setTotal] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const obtenerOrdenes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/ordenes');
      setOrdenes(res.data);
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        id_usuario: parseInt(idUsuario),
        total: parseFloat(total),
      };

      if (editandoId) {
        await axios.put(`http://localhost:3001/api/ordenes/${editandoId}`, payload);
        setEditandoId(null);
      } else {
        await axios.post('http://localhost:3001/api/ordenes', payload);
      }

      setIdUsuario('');
      setTotal('');
      obtenerOrdenes();
    } catch (error) {
      console.error('Error al guardar orden:', error);
    }
  };

  const handleEditar = (orden) => {
    setIdUsuario(orden.id_usuario);
    setTotal(orden.total);
    setEditandoId(orden.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/ordenes/${id}`);
      obtenerOrdenes();
    } catch (error) {
      console.error('Error al eliminar orden:', error);
    }
  };

  return (
    <main>
      <section className="form-container">
        <h2>{editandoId ? 'Editar Orden' : 'Agregar Orden'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="idUsuario">ID Usuario:</label>
          <input
            type="number"
            id="idUsuario"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />

          <label htmlFor="total">Total:</label>
          <input
            type="number"
            id="total"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />

          <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        </form>
      </section>

      <section className="lista-ordenes">
        <h2>Lista de Órdenes</h2>
        <ul>
          {ordenes.map((o) => (
            <li key={o.id}>
              <span>
                <strong>ID Usuario:</strong> {o.id_usuario} —{' '}
                <strong>Total:</strong> ${Number(o.total || 0).toFixed(2)} —{' '}
                <strong>Fecha:</strong> {new Date(o.fecha).toLocaleString()}
              </span>
              <span>
                <button onClick={() => handleEditar(o)}>✏️ Editar</button>{' '}
                <button onClick={() => handleEliminar(o.id)}>🗑️ Eliminar</button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Ordenes;
