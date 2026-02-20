import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import LoginNew from '../pages/LoginNew';
import Register from '../pages/Register';
import Articles from '../pages/Articles';
import ArticleDetail from '../pages/ArticleDetail';
import CreateArticle from '../pages/CreateArticle';
import Reviews from '../pages/Reviews';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginNew />} />
      <Route path="/register" element={<Register />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/reviews" element={<Reviews />} />
      
      {/* Protected routes - require authentication + active account */}
      <Route 
        path="/articles/create" 
        element={
          <ProtectedRoute requireActive={true}>
            <CreateArticle />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default AppRoutes;
