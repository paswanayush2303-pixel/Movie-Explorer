import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "fbf64e47bbe024cbba9c790a3c901416";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        console.log(data.results);
      });
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
