#!/usr/bin/env bash
# Script de build Render — exécuté depuis backend/weeb_api/
set -o errexit

echo "=== Installation des dépendances ==="
pip install -r requirements.txt

echo "=== Entraînement du modèle ML ==="
# Le dataset et train_model.py sont dans backend/ (un niveau au-dessus)
cd ..
python train_model.py
cd weeb_api

echo "=== Collecte des fichiers statiques ==="
python manage.py collectstatic --no-input

# Les migrations tournent au démarrage (start command) car l'URL interne
# de la DB Render n'est pas disponible pendant la phase de build.

echo "=== Build terminé ==="
