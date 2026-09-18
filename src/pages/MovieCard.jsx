import { useState } from 'react';
import { Star, X } from 'lucide-react';

const MovieCard = ({ movie = {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!movie || Object.keys(movie).length === 0) {
    return null;
  }

  return (
    <>
      <div
        className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
      >
      <div className="aspect-2/3 overflow-hidden relative">
        <img
          src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
          alt={movie.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-700 shadow-md">
          <div className="flex items-center space-x-1">
            <Star className='text-yellow-500 rounded-full' size={15}></Star>
            <span className="text-xs font-bold text-white">{movie.rating?.average || 'N/A'} </span>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-lg leading-tight truncate mb-1" title={movie.name}>
          {movie.name}
        </h3>

        {/* Release Year */}
        <p className="text-gray-400 text-sm mb-3">
          {movie.premiered ? movie.premiered.split('-')[0] : 'Unknown'}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 text-[10px] font-semibold tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full uppercase"
            >
              {genre}
            </span>
          ))}
          {movie.genres?.length > 2 && (
            <span className="px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-400 bg-slate-700 rounded-full uppercase">
              +{movie.genres.length - 2}
            </span>
          )}
        </div>

        {/* See Details Button */}
        <div className="mt-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            See Details
          </button>
        </div>
      </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Backdrop Image */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-800">
              <img 
                src={movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/800x400?text=No+Image'} 
                alt={movie.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 -mt-20 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">{movie.name}</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">
                  <Star className="text-yellow-500" size={16} />
                  <span className="font-bold text-white">Rating: {movie.rating?.average || 'N/A'}</span>
                </div>
                <div className="bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">
                  📅 Release: {movie.premiered ? movie.premiered.split('-')[0] : 'Unknown'}
                </div>
                {movie.language && (
                  <div className="bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">
                    🗣️ {movie.language}
                  </div>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span key={genre} className="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full uppercase border border-emerald-400/20">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3 border-b border-slate-700 pb-2">Overview</h3>
                {movie.summary ? (
                  <div 
                    className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: movie.summary }}
                  />
                ) : (
                  <p className="text-gray-400">No overview available for this title.</p>
                )}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={18} />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
