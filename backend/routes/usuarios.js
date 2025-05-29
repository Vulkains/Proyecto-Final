const express = require('express');
const router = express.Router();
const pool = require('../db'); 


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3 RETURNING *',
      [nombre, correo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
