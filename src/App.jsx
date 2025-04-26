import "./App.css";
import MovieRecommendation from "./components/MovieRecommendation";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import { MovieContext } from "./context/MovieContext";

function App() {
  const [watchList, setWatchList] = useState([]);

  function handleAddToWatchList(movieObj) {
    setWatchList(prevList => {
      // Check if movie already exists in watchlist
      if (prevList.some(movie => movie.id === movieObj.id)) {
        return prevList;
      }
      const updatedList = [...prevList, movieObj];
      localStorage.setItem('watchListMovies', JSON.stringify(updatedList));
      return updatedList;
    });
  }

  function handleRemoveFromWatchList(movieObj) {
    setWatchList(prevList => {
      const updatedList = prevList.filter(movie => movie.id !== movieObj.id);
      localStorage.setItem('watchListMovies', JSON.stringify(updatedList));
      return updatedList;
    });
  }

  useEffect(() => {
    const watchListData = localStorage.getItem('watchListMovies');
    if (watchListData) {
      setWatchList(JSON.parse(watchListData));
    }
  }, []);

  const contextValue = {
    watchList,
    handleAddToWatchList,
    handleRemoveFromWatchList
  };

  return (
    <MovieContext.Provider value={contextValue}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/recommend" element={<MovieRecommendation />} />
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  );
}

export default App;
