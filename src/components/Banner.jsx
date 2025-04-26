import React, { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setMovie(response.data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    };

    fetchBannerMovie();
  }, []);

  if (!movie) return null;

  return (
    <div className="relative h-[80vh] w-full">
      {/* Backdrop Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1300px] mx-auto px-8 flex items-center">
        <div className="max-w-[600px] text-white space-y-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <i className="fas fa-star text-[#f5c518] mr-2"></i>
              {movie.vote_average.toFixed(1)}
            </span>
            <span>|</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>

          <p className="text-gray-200 text-lg leading-relaxed line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
