const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  password: '45547',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// ------------------- SERVICIOS -------------------
app.get('/api/servicios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/servicios', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || precio == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO servicios (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, descripcion, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar servicio:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.put('/api/servicios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || precio == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'UPDATE servicios SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
      [nombre, descripcion, precio, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/api/servicios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM servicios WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json({ mensaje: 'Servicio eliminado' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ------------------- USUARIOS -------------------
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/usuarios', async (req, res) => {
  const { nombre, correo } = req.body;
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING *',
      [nombre, correo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  try {
    // Verificar si el usuario existe
    const userExist = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (userExist.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar usuario
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3 RETURNING *',
      [nombre, correo, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
   
    const userExist = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (userExist.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }


    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


// ------------------- PRODUCTOS -------------------
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || precio == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, descripcion, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || precio == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
      [nombre, descripcion, precio, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ------------------- CATEGORIAS -------------------
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/categorias', async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar categoria:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.put('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM categorias WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ------------------- UBICACIONES -------------------
app.get('/api/ubicaciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ubicaciones ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/ubicaciones', async (req, res) => {
  const { direccion, ciudad } = req.body;
  if (!direccion || !ciudad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO ubicaciones (direccion, ciudad) VALUES ($1, $2) RETURNING *',
      [direccion, ciudad]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar ubicación:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.put('/api/ubicaciones/:id', async (req, res) => {
  const { id } = req.params;
  const { direccion, ciudad } = req.body;
  if (!direccion || !ciudad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'UPDATE ubicaciones SET direccion = $1, ciudad = $2 WHERE id = $3 RETURNING *',
      [direccion, ciudad, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar ubicación:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/api/ubicaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM ubicaciones WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json({ mensaje: 'Ubicación eliminada' });
  } catch (error) {
    console.error('Error al eliminar ubicación:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ------------------- ORDENES -------------------
app.get('/api/ordenes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ordenes ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ordenes:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/api/ordenes', async (req, res) => {
  const { id_usuario, total } = req.body;
  if (!id_usuario || total == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO ordenes (id_usuario, total) VALUES ($1, $2) RETURNING *',
      [id_usuario, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar orden:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.put('/api/ordenes/:id', async (req, res) => {
  const { id } = req.params;
  const { id_usuario, total } = req.body;
  if (!id_usuario || total == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'UPDATE ordenes SET id_usuario = $1, total = $2 WHERE id = $3 RETURNING *',
      [id_usuario, total, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar orden:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/api/ordenes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM ordenes WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json({ mensaje: 'Orden eliminada' });
  } catch (error) {
    console.error('Error al eliminar orden:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
