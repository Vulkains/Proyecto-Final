import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    obtenerServicios();
  }, []);

  const obtenerServicios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/servicios');
      setServicios(res.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/servicios', {
        nombre,
        descripcion,
        precio: parseFloat(precio),
      });

      setNombre('');
      setDescripcion('');
      setPrecio('');
      obtenerServicios();
    } catch (error) {
      console.error('Error al guardar servicio:', error);
    }
  };

  return (
    <main className="container">
      <h2>Registrar Servicio</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del servicio</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>

        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Servicios</h2>
      <ul className="list">
        {servicios.map((s) => (
          <li className="list-item" key={s.id}>
            <div>
              <strong>{s.nombre}</strong><br />
              <small>{s.descripcion}</small><br />
              <span>${s.precio}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Servicios;

