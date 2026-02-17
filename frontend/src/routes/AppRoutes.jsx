import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Articles from '../pages/Articles';
import ArticleDetail from '../pages/ArticleDetail';
import Reviews from '../pages/Reviews';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  );
}

export default AppRoutes;
