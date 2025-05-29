const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ordenes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM ordenes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Orden no encontrada');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});


router.post('/', async (req, res) => {
  const { id_usuario, fecha, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ordenes (id_usuario, fecha, total) VALUES ($1, $2, $3) RETURNING *',
      [id_usuario, fecha, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_usuario, fecha, total } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ordenes SET id_usuario = $1, fecha = $2, total = $3 WHERE id = $4 RETURNING *',
      [id_usuario, fecha, total, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Orden no encontrada');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM ordenes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Orden no encontrada');
    res.json({ mensaje: 'Orden eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
