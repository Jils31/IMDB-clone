import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieRecommendation() {
  const [selectedGenre, setSelectedGenre] = useState("28"); // Default to Action
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const genres = [
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "80", name: "Crime" },
    { id: "18", name: "Drama" },
    { id: "14", name: "Fantasy" },
    { id: "27", name: "Horror" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Science Fiction" }
  ];

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&with_genres=${selectedGenre}&sort_by=vote_average.desc&vote_count.gte=1000`
        );
        setRecommendations(response.data.results);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [selectedGenre]);

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-[1300px] mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Movie Recommendations
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Discover the best movies based on your favorite genres
          </p>
          
          {/* Genre Selection */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-6 py-3 bg-[#1a1a1a] text-white rounded-lg border border-gray-700 focus:outline-none focus:border-[#f5c518]"
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <div className="text-[#f5c518] text-2xl">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movieObj={movie} />
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && recommendations.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <i className="fas fa-film text-[#f5c518] text-4xl mb-4"></i>
            <p className="text-xl">No movies found for this genre</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieRecommendation;
