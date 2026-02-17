import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as FramerMotion from 'framer-motion';
import { articlesAPI } from '../services/api';

const Articles = () => {
  const { data: articles = [], isLoading: loading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: articlesAPI.getAllArticles,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <main className="text-white px-6 py-16">
        <FramerMotion.motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple_text mx-auto mb-4"></div>
          <p className="text-gray-300">Chargement des articles...</p>
        </FramerMotion.motion.div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-white px-6 py-16">
        <FramerMotion.motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="text-purple_text text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold mb-4">Erreur de chargement</h2>
          <p className="text-gray-300 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </FramerMotion.motion.div>
      </main>
    );
  }

  return (
    <main className="text-white px-6 py-16">
      {/* Header */}
      <FramerMotion.motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Nos <span className="text-purple_text">Articles</span>
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Découvrez nos derniers articles sur les tendances web, les technologies émergentes et les meilleures pratiques du développement moderne.
        </p>
      </FramerMotion.motion.div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <FramerMotion.motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-purple_text text-6xl mb-4">📝</div>
          <h3 className="text-3xl font-bold text-white mb-4">Aucun article trouvé</h3>
          <p className="text-gray-300">Il n'y a pas encore d'articles publiés.</p>
        </FramerMotion.motion.div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <FramerMotion.motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple_text/50 transition-all duration-300 group"
              >
                {/* Article Card */}
                <div className="p-6 h-full flex flex-col">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-purple_text/20 text-purple_text text-sm font-medium px-3 py-1 rounded-full border border-purple_text/30">
                      {article.category.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-4 group-hover:text-purple_text transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-gray-300 mb-6 flex-grow line-clamp-3">
                    {truncateContent(article.content)}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple_text/20 rounded-full flex items-center justify-center mr-2 border border-purple_text/30">
                        <span className="text-purple_text font-semibold text-xs">
                          {article.author.first_name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <span className="text-gray-300">
                        {article.author.first_name} {article.author.last_name}
                      </span>
                    </div>
                    <span className="text-gray-400">{formatDate(article.created_at)}</span>
                  </div>

                  {/* Read More Button */}
                  <Link
                    to={`/articles/${article.id}`}
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium group-hover:bg-purple_text text-center"
                  >
                    Lire la suite
                  </Link>
                </div>
              </FramerMotion.motion.article>
            ))}
          </div>

          {/* Footer Stats */}
          <FramerMotion.motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 text-lg">
              {articles.length} article{articles.length > 1 ? 's' : ''} publié{articles.length > 1 ? 's' : ''}
            </p>
          </FramerMotion.motion.div>
        </div>
      )}
    </main>
  );
};

export default Articles;
