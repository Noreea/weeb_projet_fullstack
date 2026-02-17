// Service API pour communiquer avec le backend Django
const API_BASE_URL = 'http://localhost:8000';

// Service pour les articles
export const articlesAPI = {
  // Récupérer tous les articles
  getAllArticles: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/`);
      const data = await response.json();
      
      if (data.success) {
        return data.results;
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération des articles');
      }
    } catch (error) {
      console.error('Erreur API articles:', error);
      throw error;
    }
  },

  // Récupérer un article par ID
  getArticleById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}/`);
      const data = await response.json();
      
      if (data.success) {
        return data.results;
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération de l\'article');
      }
    } catch (error) {
      console.error('Erreur API article:', error);
      throw error;
    }
  }
};

// Service pour les reviews
export const reviewsAPI = {
  // Créer une nouvelle review
  createReview: async (reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/review/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.results;
      } else {
        throw new Error(data.message || 'Erreur lors de la création de la review');
      }
    } catch (error) {
      console.error('Erreur API reviews:', error);
      throw error;
    }
  }
};

// Service pour la prédiction de satisfaction
export const predictionAPI = {
  // Prédire la satisfaction à partir d'un message
  predict: async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/predict/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: message }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return data; // { prediction: ... }
      } else {
        throw new Error(data.error || 'Erreur lors de la prédiction');
      }
    } catch (error) {
      console.error('Erreur API prediction:', error);
      throw error;
    }
  }
};
