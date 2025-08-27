
# 📚 Biblioteca – Proyecto Express + SQLite + Docker
Este proyecto fue creado con fines educativos para estudiar el funcionamiento de Docker en tiempo de ejecución, junto con una API REST construida en Node.js usando Express y SQLite como base de datos local.

## Incluye funcionalidades como:

* CRUD de libros
* CRUD de categorías
* Relación entre libros y categorías mediante claves foráneas
* Dockerización completa para facilitar despliegue y pruebas
 
## ▶️ Ejecutar el contenedor
``` bash
docker run -p 3000:3000 express-sqlite-library-api

``` 

## 🔧 Construir la imagen
``` bash
docker build -t express-sqlite-library-api .
```


🚀 Cómo usar 
``` bash
npm install 
npm run start 
``` 

Esto expone tu API en http://localhost:3000
``` 
🗂️ Estructura del proyecto
books-crud/
├── index.js
├── db.js
├── routes/
│   ├── books.js
│   ├── categories.js
│   └── index.js
├── database.db
├── Dockerfile
├── .dockerignore
├── package.json
``` 