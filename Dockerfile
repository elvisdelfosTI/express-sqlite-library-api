# Etapa 1: Build con esbuild
FROM alpine:3.19 AS builder

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

RUN npx esbuild src/index.js \
  --bundle \
  --platform=node \
  --target=node18 \
  --minify \
  --outfile=dist/index.js

# Etapa 2: Imagen final ultra ligera
FROM alpine:3.19

RUN apk add --no-cache nodejs

WORKDIR /app

# Copia solo lo necesario
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/index.js ./index.js

CMD ["node", "index.js"]
