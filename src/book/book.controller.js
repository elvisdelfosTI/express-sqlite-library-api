const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear libro
router.post('/', (req, res) => {
  const { title, author, year, category_id } = req.body;
  db.run(
    'INSERT INTO books (title, author, year, category_id) VALUES (?, ?, ?, ?)',
    [title, author, year, category_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Obtener todos los libros con nombre de categoría
router.get('/', (req, res) => {
  const query = `
    SELECT books.*, categories.name AS category_name
    FROM books
    LEFT JOIN categories ON books.category_id = categories.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener libro por ID con nombre de categoría
router.get('/:id', (req, res) => {
  const query = `
    SELECT books.*, categories.name AS category_name
    FROM books
    LEFT JOIN categories ON books.category_id = categories.id
    WHERE books.id = ?
  `;
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(row);
  });
});

// Actualizar libro
router.put('/:id', (req, res) => {
  const { title, author, year, category_id } = req.body;
  db.run(
    'UPDATE books SET title = ?, author = ?, year = ?, category_id = ? WHERE id = ?',
    [title, author, year, category_id, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Libro no encontrado' });
      res.json({ message: 'Libro actualizado' });
    }
  );
});

// Eliminar libro
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM books WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado' });
  });
});

module.exports = router;
