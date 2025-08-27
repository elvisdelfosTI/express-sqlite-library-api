const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./database.db");

// Activar soporte de claves foráneas
db.run('PRAGMA foreign_keys = ON');

db.serialize(() => {
  // Crear tabla de categorías primero
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // Crear tabla de libros con clave foránea
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);
});

module.exports = db;
