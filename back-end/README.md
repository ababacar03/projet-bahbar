# Back-end — API BahBar (Express)

API REST construite avec **Node.js 18+** / **Express**, **MongoDB Atlas**, **JWT**, **Jest + Supertest**.


## Prérequis
- Node.js 18+ et npm
- Accès MongoDB Atlas (URI et credentials)


## Installation
```bash
cd back-end
npm install
```

## Variables d’environnement
Exemple .env minimal :

PORT=5001
NODE_ENV=development

# MongoDB (assemblée dans database/connect.js)
DATABASE_URL=@cluster0.example.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DATABASE_PASSWORD=<<mot_de_passe>>

# Auth
JWT_SECRET=<secret>
JWT_EXPIRATION=1h

## Démarrer le serveur
``` bash
npm run start
```
Par défaut : http://localhost:5001

## Tests
```bash
npm run test
```