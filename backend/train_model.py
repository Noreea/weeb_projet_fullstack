import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
import numpy as np

df = pd.read_csv('./weeb_satisfaction_dataset_partial.csv')
df = df[['message', 'satisfaction']].dropna()

x = df['message']
y = df['satisfaction']

model = make_pipeline(
    TfidfVectorizer(ngram_range=(1,2), min_df=1, max_df=0.9),
    LogisticRegression(max_iter=200, class_weight='balanced')
)

# Validation croisée 5-fold stratifiée
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
results = cross_validate(model, x, y, cv=cv, scoring=['accuracy', 'f1'])

acc_mean = results['test_accuracy'].mean()
acc_std  = results['test_accuracy'].std()
f1_mean  = results['test_f1'].mean()
f1_std   = results['test_f1'].std()

print("=== Validation croisée 5-fold stratifiée ===")
for i, (acc, f1) in enumerate(zip(results['test_accuracy'], results['test_f1']), 1):
    print(f"  Fold {i} — Accuracy: {acc:.2f}  F1: {f1:.2f}")
print(f"\nAccuracy : {acc_mean:.2f} (+/- {acc_std:.2f})")
print(f"F1 score : {f1_mean:.2f} (+/- {f1_std:.2f})")

# Entraînement final sur l'ensemble des données
model.fit(x, y)

with open('weeb_api_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print('\nModèle sauvegardé.')
