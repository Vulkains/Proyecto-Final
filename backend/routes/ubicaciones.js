const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ubicaciones ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener ubicaciones:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM ubicaciones WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error al obtener ubicación con ID ${id}:`, err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/', async (req, res) => {
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
  } catch (err) {
    console.error('Error al crear ubicación:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.put('/:id', async (req, res) => {
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
  } catch (err) {
    console.error(`Error al actualizar ubicación con ID ${id}:`, err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM ubicaciones WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json({ mensaje: 'Ubicación eliminada' });
  } catch (err) {
    console.error(`Error al eliminar ubicación con ID ${id}:`, err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
