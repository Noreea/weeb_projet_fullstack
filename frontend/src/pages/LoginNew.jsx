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
            Welcome Back
          </h1>
          <p className="text-gray-300">
            Log in to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-purple_text bg-transparent p-2 text-2xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text transition-colors text-center"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
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
            {loading ? 'Logging in...' : 'Log In'}
          </Button>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-white hover:underline transition-colors text-sm"
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center text-white">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="underline underline-offset-4 font-bold hover:text-purple_text transition-colors"
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginNew;
