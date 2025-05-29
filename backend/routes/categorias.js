const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Categoría no encontrada');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Categoría no encontrada');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Categoría no encontrada');
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
