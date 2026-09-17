import { Link } from 'react-router';

const MovieCard = ({ movie = {} }) => {
  if (!movie || Object.keys(movie).length === 0) {
    return null; 
  }

  return (
    <Link to={`/movies/${movie.id}`} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col h-full block">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
          alt={movie.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-700 shadow-md">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-xs font-bold text-white">{movie.rating?.average || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-lg leading-tight truncate mb-2" title={movie.name}>
          {movie.name}
        </h3>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mt-auto">
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
      </div>
    </Link>
  );
};

export default MovieCard;