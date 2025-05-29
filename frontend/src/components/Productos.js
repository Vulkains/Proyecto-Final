import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/productos');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
    };

    try {
      if (editandoId) {
        await axios.put(`http://localhost:3001/api/productos/${editandoId}`, payload);
        setEditandoId(null);
      } else {
        await axios.post('http://localhost:3001/api/productos', payload);
      }
      setNombre('');
      setDescripcion('');
      setPrecio('');
      obtenerProductos();
    } catch (error) {
      console.error(editandoId ? 'Error al actualizar producto:' : 'Error al crear producto:', error);
    }
  };

  const handleEditar = (producto) => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion || '');
    setPrecio(producto.precio);
    setEditandoId(producto.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <main>
      <section className="form-container">
        <h2>{editandoId ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            step="0.01"
            min="0"
            required
          />
          <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        </form>
      </section>

      <section className="lista-productos">
        <h2>Lista de Productos</h2>
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              <span>
                <strong>{p.nombre}</strong> - ${Number(p.precio).toFixed(2)} {p.descripcion && `- ${p.descripcion}`}
              </span>
              <span>
                <button onClick={() => handleEditar(p)}>✏️ Editar</button>
                <button onClick={() => handleEliminar(p.id)}>🗑️ Eliminar</button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Productos;
