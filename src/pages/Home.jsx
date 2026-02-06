import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - Check your API key`);
        }
        
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          throw new Error("Invalid API response format");
        }
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
   
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-white text-3xl mb-4">🎬 Movie Explorer</h1>

      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-2 mb-6 rounded text-black"
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <p className="text-white text-center">Loading movies...</p>}
      
      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-6">
          <p>Error: {error}</p>
          <p className="text-sm mt-2">
            Make sure your <code>VITE_TMDB_API_KEY</code> is valid in your .env file
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
