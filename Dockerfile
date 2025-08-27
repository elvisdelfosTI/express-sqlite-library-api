# Usa una imagen base de Node.js
FROM node:18

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "index.js"]
