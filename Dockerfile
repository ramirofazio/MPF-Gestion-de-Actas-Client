FROM node:alpine as builder

WORKDIR /app

# Copiar los archivos de configuración y el código fuente del proyecto
COPY package.json .
COPY . .

# Instalar las dependencias y construir el proyecto Vite
RUN npm install
RUN npm run build

# Etapa final: Servir archivos estáticos con Nginx
FROM nginx:alpine

# Copiar los archivos generados por react a la carpeta de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Configurar Nginx para que sirva los archivos estáticos
EXPOSE 80

# Comando para iniciar el servidor web de Nginx
CMD ["nginx", "-g", "daemon off;"]