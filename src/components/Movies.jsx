import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies , setMovies] = useState(null)
  const [loading , setLoading] = useState(true)
  const [page , setPage] = useState(1)

  const pageNext = ()=>{ setPage(page+1) }

  const pagePrev = ()=>{ if(page>1){ setPage(page-1) } }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}`
      )
      .then(function (response) {
        console.log(response.data.results);
        setMovies(response.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        console.log("Cannot call TMDB API ", err);
      });
  }, [page]);

  return (
    <div className="bg-[#000000] min-h-screen">
      <div className="max-w-[1300px] mx-auto px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-white text-xl">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center">
            {movies.map((movieObj) => (
              <MovieCard key={movieObj.id} movieObj={movieObj} />
            ))}
          </div>
        )}
        <div className="mt-8">
          <Pagination pageNext={pageNext} pagePrev={pagePrev} pageNo={page}/>
        </div>
      </div>
    </div>
  );
}

export default Movies;