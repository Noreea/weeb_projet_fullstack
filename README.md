# Weeb Projet Fullstack

Application fullstack moderne avec Django REST Framework, React, et système d'authentification JWT complet.

## ✨ Nouveautés - Authentification & Autorisation

🔐 **Système d'authentification JWT complet implémenté !**

- ✅ Inscription avec activation par admin
- ✅ Login/Logout sécurisé avec JWT
- ✅ Gestion des rôles (Admin, Modérateur, Membre)
- ✅ Permissions granulaires sur les articles
- ✅ Refresh automatique des tokens
- ✅ Tests unitaires (15 tests)
- ✅ Documentation complète

👉 **[Guide d'Implémentation Complet](./IMPLEMENTATION_GUIDE.md)**  
👉 **[Guide de Déploiement](./DEPLOYMENT.md)**  
👉 **[Quick Start](./QUICK_START.md)**

---

## 📁 Structure du projet

```
weeb_projet_fullstack/
├── backend/                 # Backend Django
│   ├── venv/               # Environnement virtuel Python
│   ├── weeb_api/          # Projet Django principal
│   │   ├── manage.py      # Script de gestion Django
│   │   ├── db.sqlite3     # Base de données SQLite
│   │   ├── blog/          # App blog (articles) + permissions
│   │   ├── users/         # App utilisateurs + auth JWT
│   │   ├── review/        # App avis/contact + ML
│   │   └── weeb_api/      # Configuration Django
│   ├── requirements.txt   # Dépendances Python
│   ├── setup.sh          # Script d'installation
│   ├── build.sh          # Script de déploiement
│   └── pytest.ini        # Configuration tests
├── frontend/              # Frontend React
│   ├── src/
│   │   ├── components/   # Composants (Header, Footer, ProtectedRoute)
│   │   ├── context/      # AuthContext (gestion auth)
│   │   ├── pages/        # Pages (Home, Login, Register, Articles, etc.)
│   │   ├── routes/       # Configuration routes
│   │   └── services/     # API (axios + interceptors)
│   ├── public/           # Assets statiques
│   ├── package.json      # Dépendances Node.js
│   └── vite.config.js    # Configuration Vite
├── IMPLEMENTATION_GUIDE.md  # Guide complet (100+ pages)
├── DEPLOYMENT.md            # Guide déploiement
├── QUICK_START.md           # Démarrage rapide
└── AUTH_SUMMARY.md          # Résumé authentification
```

---

## 🚀 Démarrage Rapide (5 minutes)

### Backend (Django)

```bash
cd backend

# Installer dépendances
pip install -r requirements.txt

# Setup database + groupes + superuser
cd weeb_api
python manage.py makemigrations
python manage.py migrate
python manage.py setup_groups
python manage.py createsuperuser

# Créer catégories
python manage.py shell << EOF
from blog.models import Category
for name in ['Technology', 'Design', 'Development', 'Business']:
    Category.objects.get_or_create(name=name)
EOF

# Lancer serveur
python manage.py runserver
```

**URL Backend** : http://127.0.0.1:8000/  
**Admin Django** : http://127.0.0.1:8000/admin/

### Frontend (React)

```bash
cd frontend

# Installer dépendances (inclut axios)
npm install

# Lancer dev server
npm run dev
```

**URL Frontend** : http://localhost:5173/

---

## 🔐 Système d'Authentification

### Flux d'Authentification

```
1. User Register → Compte créé (is_active=False)
2. Admin active le compte via Django Admin
3. User Login → Reçoit access token (15 min) + refresh token (7 jours)
4. Requêtes protégées → Bearer token dans Authorization header
5. Si token expiré → Refresh automatique (Axios interceptor)
6. Logout → Blacklist du refresh token
```

### Types d'Utilisateurs

| Rôle | Permissions |
|------|-------------|
| **Visiteur** | Lecture seule (Home, Articles, Contact) |
| **Membre inactif** | Compte créé mais pas activé par admin |
| **Membre actif** | Peut créer des articles |
| **Modérateur** | Peut modifier/supprimer tous les articles |
| **Admin** | Accès complet + Django Admin |

### Endpoints Authentification

| Endpoint | Méthode | Auth | Description |
|----------|---------|------|-------------|
| `/api/auth/register/` | POST | Public | Créer compte (inactif) |
| `/api/auth/login/` | POST | Public | Login (refuse si inactif) |
| `/api/auth/token/refresh/` | POST | Public | Refresh access token |
| `/api/auth/logout/` | POST | Auth | Blacklist refresh token |
| `/api/auth/me/` | GET | Auth | Infos user + rôles |

---

## 📊 Fonctionnalités

### Backend
- ✅ **API REST** avec Django REST Framework
- ✅ **Authentification JWT** (djangorestframework-simplejwt)
- ✅ **Permissions personnalisées** (IsOwnerOrModeratorOrAdmin)
- ✅ **Système d'activation** par admin
- ✅ **Gestion des rôles** (RBAC avec groupes Django)
- ✅ **Token blacklist** (rotation + sécurité)
- ✅ **Gestion des utilisateurs** personnalisée (email login)
- ✅ **Système de blog** avec articles et catégories
- ✅ **Formulaire de contact** avec avis
- ✅ **Machine Learning** intégré (prédiction satisfaction)
- ✅ **Tests unitaires** (pytest)
- ✅ **Admin Django** personnalisé

### Frontend
- ✅ **Interface moderne** React + Vite + TailwindCSS
- ✅ **AuthContext** global (gestion auth)
- ✅ **Axios interceptors** (auto-refresh tokens)
- ✅ **Protected Routes** (HOC pour routes sécurisées)
- ✅ **Pages authentification** (Login, Register)
- ✅ **Création d'articles** (membres actifs)
- ✅ **Header dynamique** (affiche auth state)
- ✅ **Gestion erreurs** (401, 403, messages clairs)
- ✅ **Animations** (Framer Motion)
- ✅ **Responsive** (mobile-first)

---

## 🛠️ Technologies Utilisées

### Backend
- Django 5.2.7
- Django REST Framework 3.15.2
- djangorestframework-simplejwt 5.3.1
- PostgreSQL / SQLite
- NumPy & Scikit-learn (ML)
- pytest + pytest-django
- CORS Headers

### Frontend
- React 19.1.0
- Vite 6.3.5
- TailwindCSS 3.4.17
- React Router DOM 7.6.0
- Framer Motion 12.12.2
- Axios (HTTP client)
- React Query (cache)

---

## 📝 API Endpoints

### Authentification
- `POST /api/auth/register/` - Inscription
- `POST /api/auth/login/` - Login
- `POST /api/auth/token/refresh/` - Refresh token
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Infos user

### Articles
- `GET /api/articles/` - Liste articles (public)
- `GET /api/articles/{id}/` - Détail article (public)
- `POST /api/articles/` - Créer article (membre actif)
- `PUT /api/articles/{id}/` - Modifier article (owner/mod/admin)
- `DELETE /api/articles/{id}/` - Supprimer article (owner/mod/admin)

### Catégories
- `GET /api/categories/` - Liste catégories

### Reviews
- `POST /api/review/` - Créer avis (avec prédiction ML)
- `GET /api/review/` - Liste avis

### Users (Admin only)
- `GET /api/users/` - Liste users
- `GET /api/users/{id}/` - Détail user

---

## 🧪 Tests

```bash
cd backend/weeb_api
pytest

# Résultat attendu:
# ============================= 15 passed in 2.34s ==============================
```

**Tests implémentés** :
- ✅ Register crée user inactif
- ✅ Login user inactif refusé
- ✅ Login user actif OK → tokens
- ✅ Accès endpoint protégé sans token → 401
- ✅ Création article sans auth → 401
- ✅ Création article user inactif → 403
- ✅ Création article user actif → 201
- ✅ Update article par autre user → 403
- ✅ Update article par auteur → 200
- ✅ Update article par modérateur → 200
- ✅ Delete article par auteur → 200

---

## 🚀 Déploiement

### Stack Recommandée (Gratuite)

- **Backend** : Render / Railway (PostgreSQL inclus)
- **Frontend** : Vercel / Netlify
- **Database** : PostgreSQL (Render/Railway)

### Commandes de Déploiement

**Backend (Render)** :
```bash
./backend/build.sh
cd weeb_api
gunicorn weeb_api.wsgi:application
```

**Frontend (Vercel)** :
```bash
cd frontend
npm run build
```

👉 **[Guide Complet de Déploiement](./DEPLOYMENT.md)**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) | Guide complet (architecture, code, exemples) |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Guide déploiement Render + Vercel |
| [QUICK_START.md](./QUICK_START.md) | Commandes rapides + troubleshooting |
| [AUTH_SUMMARY.md](./AUTH_SUMMARY.md) | Résumé authentification |

---

## 🔒 Sécurité

### Implémenté
- ✅ Password hashing (PBKDF2)
- ✅ JWT avec expiration courte (15 min access)
- ✅ Token rotation + blacklist
- ✅ CORS restrictif
- ✅ HTTPS en production
- ✅ Validation côté serveur
- ✅ Permissions granulaires
- ✅ Access token en mémoire (pas localStorage)

### À Ajouter en Production
- Rate limiting (django-ratelimit)
- Monitoring (Sentry)
- Backup automatique DB
- CDN pour static files

---

## 🎯 Développement

Le projet est configuré pour le développement avec :
- Hot reload pour React (Vite)
- Auto-reload pour Django
- CORS activé pour les requêtes cross-origin
- Base de données SQLite pour le développement
- Logs détaillés
- Tests automatisés

---

## 🆘 Support

### Problèmes Courants

**"No module named 'rest_framework_simplejwt'"**
```bash
pip install djangorestframework-simplejwt
```

**"CORS error"**
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

**"Token blacklist table missing"**
```bash
python manage.py migrate token_blacklist
```

👉 **[Plus de solutions dans QUICK_START.md](./QUICK_START.md)**

---

## 📈 Statistiques du Projet

- **Fichiers créés/modifiés** : 25+
- **Lignes de code** : ~3000
- **Tests** : 15
- **Endpoints** : 10
- **Documentation** : 4 guides complets

---

## 🎓 Concepts Clés

### 401 vs 403

| Code | Signification | Action |
|------|---------------|--------|
| **401 Unauthorized** | "Qui êtes-vous ?" (token manquant/invalide) | Tenter refresh ou login |
| **403 Forbidden** | "Pas de permission" (user authentifié) | Afficher message, ne PAS retry |

### JWT Stateless

- Serveur ne stocke PAS les sessions
- Token contient toutes les infos nécessaires
- Validation via signature (HMAC)
- Blacklist pour invalidation (exception)

### RBAC

- Permissions basées sur rôles (groupes)
- Plus scalable que permissions par user
- Facilite gestion (ajouter user à groupe)

---

## 📄 Licence

Projet développé par **Noréa Dani El Kebir**  
Dans le cadre de la formation DataScientest

---

## 🙏 Remerciements

- Django REST Framework team
- Simple JWT contributors
- React + Vite communities
- DataScientest

---

**Happy Coding! 🚀**
