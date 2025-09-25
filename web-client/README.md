# BahBar - Web Client - Documentation

## 🚀 Démarrage

### Prérequis

```bash
# Cloner le dépôt
git clone <url>

# Aller dans le dossier du projet
cd web-client

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🛠️ Stack technique

### 🧱 Frontend

- [Next.js](https://nextjs.org/) – Framework React avec support SSR/SSG
- [React](https://reactjs.org/) – Librairie UI
- [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utilitaire

### 🖋️ Langages

- JavaScript
- HTML / CSS
- JSON

## 🧑‍💻 Règles de contribution

### 🧭 Workflow Git

Nous utilisons un **Gitflow simplifié** :

- `main` : toujours **stable** et déployable.
- `dev` : branche de développement principale.
- `feature/<nom-fonctionnalité>` : pour les nouvelles features.
- `fix/<nom-correctif>` : pour les bugs ou hotfixes.
- `refactor/<nom-refactor>` : pour les refactorisation de code.

### 📜 Conventions de commit

Nous suivons les conventions de commit suivantes :

- `feat:` pour les nouvelles fonctionnalités.
- `fix:` pour les corrections de bugs.
- `docs:` pour les modifications de documentation.
- `style:` pour les changements de style (formatage, espaces, etc.).
- `refactor:` pour les modifications de code qui n'ajoutent pas de fonctionnalité.
- `test:` pour les ajouts ou modifications de tests.
- `chore:` pour les tâches de maintenance ou de configuration.
- `ci:` pour les modifications liées à l'intégration continue.
- `build:` pour les modifications liées à la construction du projet.
- `revert:` pour les revert de commits précédents.
- `release:` pour les versions de release.
- `deps:` pour les mises à jour de dépendances.
- `wip:` pour les travaux en cours (Work In Progress).
