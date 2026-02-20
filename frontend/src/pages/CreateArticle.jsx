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
        setError('Failed to load categories');
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
      setError('Your account must be activated before you can create articles');
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
      setError(error.response?.data?.message || 'Failed to create article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="text-6xl">✅</div>
          <h1 className="text-4xl font-bold text-white">Article Created!</h1>
          <p className="text-gray-300">
            Your article has been published successfully.
          </p>
          <p className="text-sm text-gray-400">
            Redirecting to articles page...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Create New <span className="text-purple_text">Article</span>
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Share your knowledge with the community
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!isActive && (
          <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-4 py-3 rounded-lg mb-6">
            ⚠️ Your account is pending activation. You won't be able to publish articles until an administrator activates your account.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 border border-purple-500/20 rounded-xl p-8">
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2">
              Article Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Enter article title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple_text focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-lg font-medium mb-2">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              value={formData.category_id}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple_text focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-lg font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows="12"
              placeholder="Write your article content here..."
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
              {loading ? 'Publishing...' : 'Publish Article'}
            </Button>
            <button
              type="button"
              onClick={() => navigate('/articles')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateArticle;
