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
          <h2 className="text-3xl font-bold text-white mb-4">Account Pending Activation</h2>
          <p className="text-gray-300 mb-6">
            Your account is currently inactive. Please wait for an administrator to activate your account before you can access this feature.
          </p>
          <a href="/" className="text-purple_text hover:underline">
            Return to Home
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
          <h2 className="text-3xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to access this page. Admin privileges are required.
          </p>
          <a href="/" className="text-purple_text hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
