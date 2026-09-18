import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Search } from 'lucide-react';

const Movies = () => {
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
    <div className="bg-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border border-slate-700 rounded-2xl leading-5 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-lg transition duration-200 ease-in-out shadow-lg"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <h2 className="text-3xl font-extrabold text-white mb-8 text-center sm:text-left">
          {searchQuery ? 'Search Results' : 'Popular Shows'}
        </h2>
        
        {movies.length === 0 && !loading && !error ? (
          <p className="text-center text-gray-400 text-xl mt-10">No movies found matching "{searchQuery}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.slice(0, 20).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
