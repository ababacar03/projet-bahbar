# BahBar — Monorepo

Monorepo du projet **BahBar** :
- `back-end/` — API REST Express + MongoDB Atlas
- `mobile-app/` — App mobile Expo/React Native

---

## Prérequis
- **Node.js 18+** et **npm**
- Accès à **MongoDB Atlas** (URI + credentials)

---

## Ordre de démarrage
1. **Base de données** : MongoDB Atlas (aucune action locale si l’URI est valide)
2. **Back-end** : démarre l’API (port par défaut `5001`)
3. **Client** : app mobile Expo pointant vers l’API

---

## Démarrage rapide

```bash
# 1) API
cd back-end
npm install
npm run start

# 2) App mobile
cd ../mobile-app
npm install
npm run start          # ou: npx expo start
