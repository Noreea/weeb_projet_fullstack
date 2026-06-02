import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

function LoginNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const from = location.state?.from?.pathname || '/';

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

    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Bon retour
          </h1>
          <p className="text-gray-300">
            Connectez-vous à votre compte pour continuer
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full border-b border-purple_text bg-transparent p-2 text-2xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors text-center"
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
              className="w-full border-b border-purple_text bg-transparent p-2 text-2xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors text-center"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-8"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-white hover:underline transition-colors text-sm"
            >
              Mot de passe oublié ?
            </a>
          </div>

          <div className="text-center text-white">
            Pas encore de compte ?{' '}
            <Link
              to="/register"
              className="underline underline-offset-4 font-bold hover:text-purple_text transition-colors"
            >
              En créer un
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginNew;
