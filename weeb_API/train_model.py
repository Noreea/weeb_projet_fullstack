import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import pickle
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression


df = pd.read_csv('./weeb_satisfaction_dataset_partial.csv')

df = df[['message', 'satisfaction']].dropna()

x = df['message'] # Variable explicative
y = df['satisfaction'] # variable cible

X_train, X_test, y_train, y_test = train_test_split(x,y, test_size=0.15, random_state=42)

model = make_pipeline(
    TfidfVectorizer(ngram_range=(1,2), min_df=1, max_df=0.9),
    LogisticRegression(max_iter=200, class_weight='balanced')
)

model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# test = ['catastrophique', 'très mauvaise expérience à ne pas renouveler']
#print(y_pred)

#print(model.score(X_test, y_test))

with open('weeb_api_model.pkl', 'wb') as f:
    pickle.dump(model, f)
    
print('modèle sauvegardé')