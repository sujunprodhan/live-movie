import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Movies = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = searchQuery 
          ? `https://api.tvmaze.com/search/shows?q=${searchQuery}`
          : 'https://api.tvmaze.com/shows';
          
        const movieData = await fetch(url);
        if (!movieData.ok) {
          throw new Error('Data Not found');
        }
        const data = await movieData.json();
        
        if (searchQuery) {

          setMovies(data.map(item => item.show));
        } else {
          setMovies(data);
        }
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

   if (loading && movies.length === 0) {
     return (
       <div className="bg-slate-900 min-h-screen flex justify-center items-center">
         <p className="text-2xl text-emerald-400 animate-pulse">Loading movies...</p>
       </div>
     );
   }
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div>
      {!isHomePage && (
        <div className="relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
            <img
              src="moviebackground.png"
              alt=""
              className="w-full h-full object-cover object-center opacity-40"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex justify-center items-center text-center min-h-[80vh]">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-3xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 mx-auto">
            Favorite Movie
            </h1>
          </div>
        </div>
      )}
      <div className="bg-slate-900 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center sm:text-left">
            Popular Shows
          </h2>

          {movies.length === 0 && !loading && !error ? (
            <p className="text-center text-gray-400 text-xl mt-10">
              No movies found matching "{searchQuery}"
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.slice(0, 20).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
