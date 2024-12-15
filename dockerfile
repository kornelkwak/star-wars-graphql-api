# Użyj Node.js jako bazowego obrazu
FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki projektu
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików
COPY . .

# Expose port aplikacji
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "run", "start:dev"]
