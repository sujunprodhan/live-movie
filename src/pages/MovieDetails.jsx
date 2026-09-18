import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen flex justify-center items-center">
        <p className="text-2xl text-emerald-400 animate-pulse">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-slate-900 min-h-screen flex flex-col justify-center items-center">
        <p className="text-2xl text-red-500 mb-4">{error || 'Failed to load movie'}</p>
        <Link to="/movies" className="text-emerald-400 hover:underline">
          &larr; Back to Movies
        </Link>
      </div>
    );
  }

  const summaryText = movie.summary ? movie.summary.replace(/<[^>]*>?/gm, '') : 'No summary available.';

  return (
    <div className="bg-slate-900 min-h-screen py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/movies"
          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Movies
        </Link>

        <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-700">
          {/* Movie Poster */}
          <div className="md:w-1/3 shrink-0">
            <img
              src={
                movie.image?.original ||
                movie.image?.medium ||
                'https://via.placeholder.com/400x600?text=No+Image'
              }
              alt={movie.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Movie Details */}
          <div className="p-8 md:p-12 md:w-2/3 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                {movie.name}
              </h1>
              {/* Rating Badge */}
              <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
                <Star className="text-yellow-500 rounded-full" size={15}></Star>
                <span className="text-xl font-bold">{movie.rating?.average || 'N/A'}</span>
                <span className="text-gray-400 text-sm">/ 10</span>
              </div>
            </div>

            {/* Badges/Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-sm font-semibold text-emerald-400 bg-emerald-400/10 rounded-full border border-emerald-400/20"
                >
                  {genre}
                </span>
              ))}
              <span className="px-3 py-1 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
                {movie.premiered ? movie.premiered.substring(0, 4) : 'Unknown Year'}
              </span>
              <span className="px-3 py-1 text-sm font-semibold text-purple-400 bg-purple-400/10 rounded-full border border-purple-400/20">
                {movie.status}
              </span>
              <span className="px-3 py-1 text-sm font-semibold text-gray-300 bg-slate-700 rounded-full border border-slate-600">
                {movie.language}
              </span>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-2">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{summaryText}</p>
            </div>

            {/* Additional Info Grid */}
            <div className="mt-auto grid grid-cols-2 sm:grid-cols-3 gap-6 bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Network</p>
                <p className="font-semibold">
                  {movie.network?.name || movie.webChannel?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Schedule</p>
                <p className="font-semibold">
                  {movie.schedule?.days?.join(', ') || 'N/A'} at {movie.schedule?.time || ''}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Runtime</p>
                <p className="font-semibold">
                  {movie.averageRuntime ? `${movie.averageRuntime} mins` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
