const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Servicio no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.post('/', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO servicios (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, descripcion, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE servicios SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
      [nombre, descripcion, precio, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Servicio no encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM servicios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Servicio no encontrado');
    res.json({ mensaje: 'Servicio eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
