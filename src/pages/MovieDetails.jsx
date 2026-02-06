import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "bf64e47bbe024cbba9c790a3c901416";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="mb-4 rounded"
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p className="mt-2">⭐ Rating: {movie.vote_average}</p>
    </div>
  );
}

export default MovieDetails;
