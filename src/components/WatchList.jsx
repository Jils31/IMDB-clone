import React, { useContext, useState, useMemo } from "react";
import { MovieContext } from "../context/MovieContext";

function Watchlist() {
  const { watchList, handleRemoveFromWatchList } = useContext(MovieContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // List of genres (you can expand this list)
  const genres = [
    { id: "all", name: "All Genres" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" }
  ];

  // Filter movies based on search query and selected genre
  const filteredMovies = useMemo(() => {
    return watchList.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "all" || movie.genre_ids.includes(Number(selectedGenre));
      return matchesSearch && matchesGenre;
    });
  }, [watchList, searchQuery, selectedGenre]);

  const handleRemove = (movie) => {
    const movieElement = document.getElementById(`movie-${movie.id}`);
    movieElement.classList.add('opacity-0', 'scale-95');
    
    setTimeout(() => {
      handleRemoveFromWatchList(movie);  // This will update both state and localStorage
    }, 300);
  };

  return (
    <div className="bg-[#000000] min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
          <p className="text-gray-400 mt-2">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'title' : 'titles'}
          </p>
        </div>

        {/* Filtering Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search your watchlist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-white rounded border border-gray-700 focus:outline-none focus:border-[#f5c518]"
            />
          </div>
          <div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-[#1a1a1a] text-white rounded border border-gray-700 focus:outline-none focus:border-[#f5c518]"
            >
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <i className="fas fa-film text-[#f5c518] text-5xl mb-4"></i>
            <p className="text-white text-xl mb-2">
              {watchList.length === 0 
                ? "Your watchlist is empty" 
                : "No movies match your filters"}
            </p>
            <p className="text-gray-400">
              {watchList.length === 0 
                ? "Add movies and shows to your Watchlist to keep track of what you want to watch"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredMovies.map((movie) => (
              <div 
                key={movie.id}
                id={`movie-${movie.id}`}
                className="flex bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-all duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[140px] h-[200px] object-cover"
                />
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-medium text-white mb-2">
                        {movie.title}
                      </h2>
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <i className="fas fa-star text-[#f5c518] mr-1"></i>
                        <span>{movie.vote_average.toFixed(1)}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {movie.overview}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(movie)}
                      className="p-2 text-gray-400 hover:text-[#f5c518] transition-colors"
                      title="Remove from watchlist"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
