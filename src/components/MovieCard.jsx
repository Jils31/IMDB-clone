import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function MovieCard({ movieObj }) {
  const { watchList, handleAddToWatchList, handleRemoveFromWatchList } =
    useContext(MovieContext);

  const isInWatchlist = watchList.some((movie) => movie.id === movieObj.id);

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchList(movieObj);
    } else {
      handleAddToWatchList(movieObj);
    }
  };

  // Format date to display only the year
  const releaseYear = new Date(movieObj.release_date).getFullYear();

  return (
    <div className="w-[300px] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 mx-6 my-8">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`}
          alt={movieObj.title}
          className="w-full h-[375px] object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <div className="flex items-center space-x-3">
            <span className="bg-[#f5c518] text-black px-3 py-1.5 rounded text-sm font-bold">
              IMDb {movieObj.vote_average.toFixed(1)}
            </span>
            <span className="text-white text-sm">{releaseYear}</span>
            <button
              onClick={handleWatchlistClick}
              className="absolute top-5 right-6 p-3 rounded-lg bg-black text-white hover:bg-black/75 transition-colors"
            >
              <i
                className={`${
                  isInWatchlist ? "fas" : "far"
                } fa-heart text-red-500 text-lg`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-white font-medium text-xl mb-3 line-clamp-1">
          {movieObj.title}
        </h3>

        {/* Movie details */}
        <div className="space-y-4">
          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
            {movieObj.overview}
          </p>

          <div className="flex items-center justify-between text-sm py-3">
            <div className="flex items-center space-x-3">
              <i className="fas fa-thumbs-up text-[#f5c518] text-lg"></i>
              <span className="text-gray-400">
                {movieObj.vote_count.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-chart-line text-[#f5c518] text-lg"></i>
              <span className="text-gray-400">
                {movieObj.popularity.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
