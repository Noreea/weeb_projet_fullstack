import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { articlesAPI, categoriesAPI } from '../services/api';
import Button from '../components/Button';

function CreateArticle() {
  const navigate = useNavigate();
  const { isActive } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesAPI.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Impossible de charger les catégories.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isActive) {
      setError('Votre compte doit être activé avant de pouvoir créer des articles.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await articlesAPI.createArticle({
        title: formData.title,
        content: formData.content,
        category_id: parseInt(formData.category_id)
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/articles');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      setError(error.response?.data?.message || 'Impossible de créer l\'article. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="text-6xl">✅</div>
          <h1 className="text-4xl font-bold text-white">Article publié !</h1>
          <p className="text-gray-300">
            Votre article a été publié avec succès.
          </p>
          <p className="text-sm text-gray-400">
            Redirection vers la liste des articles...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Nouvel <span className="text-purple_text">article</span>
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Partagez vos connaissances avec la communauté
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!isActive && (
          <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-4 py-3 rounded-lg mb-6">
            ⚠️ Votre compte est en attente d'activation. Vous ne pourrez pas publier d'articles tant qu'un administrateur n'aura pas activé votre compte.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 border border-purple-500/20 rounded-xl p-8">
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2">
              Titre de l'article
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Saisissez le titre de l'article"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple_text focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-lg font-medium mb-2">
              Catégorie
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              value={formData.category_id}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple_text focus:border-transparent"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-lg font-medium mb-2">
              Contenu
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows="12"
              placeholder="Rédigez le contenu de votre article ici..."
              value={formData.content}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple_text focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading || !isActive}
              className="flex-1"
            >
              {loading ? 'Publication...' : 'Publier l\'article'}
            </Button>
            <button
              type="button"
              onClick={() => navigate('/articles')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateArticle;
