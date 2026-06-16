import pandas as pd
import numpy as np
import pickle
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import StratifiedKFold, cross_validate, cross_val_predict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import make_scorer, recall_score, confusion_matrix, classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv('./weeb_satisfaction_dataset_partial.csv')
df = df[['message', 'satisfaction']].dropna()
df = df.drop_duplicates(subset='message').reset_index(drop=True)

x = df['message']
y = df['satisfaction']

tfidf = TfidfVectorizer(ngram_range=(1,2), min_df=1, max_df=0.9)

candidats = {
    'Régression Logistique': LogisticRegression(max_iter=200, class_weight='balanced'),
    'SVM Linéaire':          LinearSVC(max_iter=2000, class_weight='balanced'),
    'Naive Bayes':           MultinomialNB(),
    'Forêt Aléatoire':       RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42),
}

recall_insatisfaits = make_scorer(recall_score, pos_label=0)
scoring = {
    'accuracy':            'accuracy',
    'f1':                  'f1',
    'precision':           'precision',
    'rappel_insatisfaits': recall_insatisfaits,
}
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

print("=== Comparaison des modèles (5-fold stratifié) ===\n")
print(f"{'Modèle':<25} {'Accuracy':>10} {'F1':>10} {'Precision':>10} {'Rappel(0)':>10} {'F1 ± std':>15}")
print("-" * 85)

best_name, best_model, best_f1 = None, None, 0

for nom, clf in candidats.items():
    pipeline = make_pipeline(tfidf, clf)
    res = cross_validate(pipeline, x, y, cv=cv, scoring=scoring)

    acc  = res['test_accuracy'].mean()
    f1   = res['test_f1'].mean()
    f1s  = res['test_f1'].std()
    prec = res['test_precision'].mean()
    rec  = res['test_rappel_insatisfaits'].mean()

    print(f"{nom:<25} {acc*100:>9.1f}% {f1*100:>9.1f}% {prec*100:>9.1f}% {rec*100:>9.1f}% {f1*100:>8.1f}% ± {f1s*100:.1f}%")

    if f1 > best_f1:
        best_f1, best_name, best_model = f1, nom, pipeline

print(f"\n→ Modèle retenu : {best_name} (F1 moyen : {best_f1*100:.1f}%)")

# Matrice de confusion — Régression Logistique (via cross_val_predict)
print("\n=== Matrice de confusion — Régression Logistique (5-fold CV, 80 exemples) ===")
lr_pipeline = make_pipeline(tfidf, LogisticRegression(max_iter=200, class_weight='balanced'))
y_pred = cross_val_predict(lr_pipeline, x, y, cv=cv)
cm = confusion_matrix(y, y_pred)
tn, fp, fn, tp = cm.ravel()
print(f"\n                     Prédit Insatisfait(0)   Prédit Satisfait(1)")
print(f"  Réel Insatisfait(0)  {tn:>5} (Vrais Nég.)    {fp:>5} (Faux Pos.)")
print(f"  Réel Satisfait(1)    {fn:>5} (Faux Nég.)    {tp:>5} (Vrais Pos.)")
print(f"\n  → Rappel insatisfaits : {tn}/{tn+fp} = {tn/(tn+fp)*100:.1f}%")
print(f"  → Rappel satisfaits   : {tp}/{fn+tp} = {tp/(fn+tp)*100:.1f}%")

print("\n=== Rapport de classification — Régression Logistique (5-fold CV, 80 exemples) ===\n")
print(classification_report(y, y_pred, target_names=['Insatisfait (0)', 'Satisfait (1)']))

# Analyse des seuils de décision — Régression Logistique
print("\n=== Analyse des seuils — Régression Logistique ===\n")
lr_proba = cross_val_predict(lr_pipeline, x, y, cv=cv, method='predict_proba')[:, 1]
print(f"{'Seuil':>6}  {'Accuracy':>9}  {'Rappel(sat)':>11}  {'FP':>4}  {'FN':>4}")
print("-" * 45)
for s in [0.3, 0.4, 0.5, 0.6, 0.7]:
    pred = (lr_proba >= s).astype(int)
    tn, fp, fn, tp = confusion_matrix(y, pred).ravel()
    acc = (tp + tn) / len(y)
    rec = tp / (tp + fn) if (tp + fn) else 0
    print(f"{s:>6.1f}  {acc*100:>8.0f}%  {rec*100:>10.0f}%  {fp:>4}  {fn:>4}")

# Entraînement final du modèle retenu sur toutes les données
best_model.fit(x, y)

with open('weeb_api_model.pkl', 'wb') as f:
    pickle.dump(best_model, f)

print('Modèle sauvegardé.')
