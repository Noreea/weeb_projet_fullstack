import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { articlesAPI } from '../services/api';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading: loading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesAPI.getArticleById(id),
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <main className="text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-xl">Chargement de l'article...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-red-400 mb-6">{error.message}</p>
          <button
            onClick={() => navigate('/articles')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Retour aux articles
          </button>
        </div>
      </main>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <main className="text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/articles"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour aux articles
        </Link>

        {/* Article header */}
        <article className="bg-gray-800/30 border border-purple-500/30 rounded-xl p-8 md:p-12">
          {/* Category badge */}
          <div className="mb-6">
            <span className="inline-block bg-purple-600/20 text-purple-400 text-sm font-medium px-4 py-2 rounded-full border border-purple-500/50">
              {article.category.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-700">
            {/* Author */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center mr-3 border border-purple-500/50">
                <span className="text-purple-400 font-semibold">
                  {article.author.first_name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Auteur</p>
                <p className="text-white font-medium">
                  {article.author.first_name} {article.author.last_name}
                </p>
              </div>
            </div>

            {/* Date */}
            <div>
              <p className="text-sm text-gray-500">Publié le</p>
              <p className="text-white">{formatDate(article.created_at)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Catégorie : <span className="text-purple-400">{article.category.name}</span>
              </div>
              <Link
                to="/articles"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Voir plus d'articles
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

export default ArticleDetail;
