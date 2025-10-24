# Weeb Projet Fullstack

Application fullstack moderne avec Django REST Framework et React.

## 📁 Structure du projet

```
weeb_projet_fullstack/
├── backend/                 # Backend Django
│   ├── venv/               # Environnement virtuel Python
│   ├── weeb_api/          # Projet Django principal
│   │   ├── manage.py      # Script de gestion Django
│   │   ├── db.sqlite3     # Base de données SQLite
│   │   ├── blog/          # App blog (articles)
│   │   ├── users/         # App utilisateurs
│   │   ├── review/        # App avis/contact
│   │   └── weeb_api/      # Configuration Django
│   ├── requirements.txt   # Dépendances Python
│   ├── train_model.py     # Script ML
│   ├── weeb_api_model.pkl # Modèle ML entraîné
│   └── weeb_satisfaction_dataset_partial.csv # Dataset
├── frontend/              # Frontend React
│   ├── src/              # Code source React
│   ├── public/           # Assets statiques
│   ├── package.json      # Dépendances Node.js
│   └── vite.config.js    # Configuration Vite
└── .gitignore            # Fichiers à ignorer par Git
```

## 🚀 Démarrage rapide

### Backend (Django)
```bash
cd backend/weeb_api
source ../venv/bin/activate
python manage.py runserver
```
**URL** : http://127.0.0.1:8000/

### Frontend (React)
```bash
cd frontend
npm run dev
```
**URL** : http://localhost:5173/

## 🔧 Installation

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## 📊 Fonctionnalités

- **API REST** avec Django REST Framework
- **Interface utilisateur** moderne avec React + Vite
- **Gestion des utilisateurs** personnalisée
- **Système de blog** avec articles et catégories
- **Formulaire de contact** avec avis
- **Machine Learning** intégré
- **CORS** configuré pour le développement

## 🛠️ Technologies utilisées

**Backend :**
- Django 5.2.7
- Django REST Framework 3.15.2
- SQLite
- NumPy & Scikit-learn
- CORS Headers

**Frontend :**
- React 19.1.0
- Vite 6.3.5
- TailwindCSS 3.4.17
- React Router DOM 7.6.0
- Framer Motion 12.12.2

## 📝 API Endpoints

- `GET /` - Liste des endpoints disponibles
- `GET /users/` - Liste des utilisateurs
- `POST /users/` - Créer un utilisateur
- `GET /blog/` - Liste des articles
- `POST /blog/` - Créer un article
- `GET /blog/{id}/` - Détail d'un article
- `DELETE /blog/{id}/` - Supprimer un article

## 🎯 Développement

Le projet est configuré pour le développement avec :
- Hot reload pour React (Vite)
- Auto-reload pour Django
- CORS activé pour les requêtes cross-origin
- Base de données SQLite pour le développement

## 📄 Licence

Projet développé par Noréa Dani El Kebir
