import { useQuery } from '@tanstack/react-query';
import { reviewsAPI } from '../services/api';

function Reviews() {
  const { data: reviews = [], isLoading: loading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsAPI.getAllReviews,
  });

  const getSatisfactionLabel = (score) => {
    if (score === null || score === undefined) return 'Non évalué';
    if (score === 0) return 'Insatisfait';
    if (score === 1) return 'Satisfait';
    return `Score: ${score}`;
  };

  const getSatisfactionColor = (score) => {
    if (score === null || score === undefined) return 'text-gray-400';
    if (score === 0) return 'text-red-400';
    if (score === 1) return 'text-green-400';
    return 'text-purple-400';
  };

  if (loading) {
    return (
      <main className="text-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl">Chargement des reviews...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl text-red-400">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Reviews & Prédictions
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Visualisation des avis clients et de leur niveau de satisfaction prédit
        </p>

        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-900/30 border border-purple-500 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Total Reviews</p>
            <p className="text-3xl font-bold">{reviews.length}</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-500 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Satisfaits</p>
            <p className="text-3xl font-bold text-green-400">
              {reviews.filter(r => r.predicted_satisfaction === 1).length}
            </p>
          </div>
          <div className="bg-purple-900/30 border border-purple-500 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Insatisfaits</p>
            <p className="text-3xl font-bold text-red-400">
              {reviews.filter(r => r.predicted_satisfaction === 0).length}
            </p>
          </div>
        </div>

        {/* Reviews list */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              Aucune review pour le moment
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-purple-900/20 border border-purple-500/50 rounded-xl p-6 hover:bg-purple-900/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Review info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {review.first_name} {review.last_name}
                      </h3>
                      <span className={`text-sm font-semibold ${getSatisfactionColor(review.predicted_satisfaction)}`}>
                        {getSatisfactionLabel(review.predicted_satisfaction)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {review.email} {review.phone && `• ${review.phone}`}
                    </p>
                    <p className="text-gray-200">{review.message}</p>
                  </div>

                  {/* Date */}
                  <div className="text-right text-sm text-gray-400">
                    {new Date(review.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Reviews;
