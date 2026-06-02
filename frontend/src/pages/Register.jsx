import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.password_confirm) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="text-6xl">✅</div>
          <h1 className="text-4xl font-bold text-white">Inscription réussie !</h1>
          <p className="text-gray-300">
            Votre compte a été créé avec succès. Veuillez attendre qu'un administrateur active votre compte avant de vous connecter.
          </p>
          <p className="text-sm text-gray-400">
            Redirection vers la page de connexion...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Créer un compte
          </h1>
          <p className="text-gray-300">
            Rejoignez notre communauté et commencez à créer du contenu
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="sr-only">Prénom</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                placeholder="Prénom"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border-b border-purple_text bg-transparent p-2 text-xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="last_name" className="sr-only">Nom</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                placeholder="Nom"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border-b border-purple_text bg-transparent p-2 text-xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Adresse e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-purple_text bg-transparent p-2 text-xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-purple_text bg-transparent p-2 text-xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password_confirm" className="sr-only">Confirmer le mot de passe</label>
            <input
              id="password_confirm"
              name="password_confirm"
              type="password"
              required
              placeholder="Confirmer le mot de passe"
              value={formData.password_confirm}
              onChange={handleChange}
              className="w-full border-b border-purple_text bg-transparent p-2 text-xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </Button>

          <div className="text-center text-white">
            Déjà un compte ?{' '}
            <Link
              to="/login"
              className="underline underline-offset-4 font-bold hover:text-purple_text transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
