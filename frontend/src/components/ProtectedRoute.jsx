import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireActive = true, requireAdmin = false }) => {
  const { isAuthenticated, isActive, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple_text"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireActive && !isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-3xl font-bold text-white mb-4">Compte en attente d'activation</h2>
          <p className="text-gray-300 mb-6">
            Votre compte est actuellement inactif. Veuillez attendre qu'un administrateur active votre compte avant d'accéder à cette fonctionnalité.
          </p>
          <a href="/" className="text-purple_text hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-3xl font-bold text-white mb-4">Accès refusé</h2>
          <p className="text-gray-300 mb-6">
            Vous n'avez pas la permission d'accéder à cette page. Des droits administrateur sont requis.
          </p>
          <a href="/" className="text-purple_text hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
