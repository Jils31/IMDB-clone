import React, { useState, createContext, useEffect } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  // Initialize watchList from localStorage
  const [watchList, setWatchList] = useState(() => {
    const savedWatchList = localStorage.getItem("watchList");
    return savedWatchList ? JSON.parse(savedWatchList) : [];
  });

  // Update localStorage whenever watchList changes
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const handleAddToWatchList = (movieObj) => {
    setWatchList(prev => {
      // Check if movie already exists
      if (prev.some(movie => movie.id === movieObj.id)) {
        return prev;
      }
      return [...prev, movieObj];
    });
  };

  const handleRemoveFromWatchList = (movieObj) => {
    setWatchList(prev => prev.filter(movie => movie.id !== movieObj.id));
  };

  return (
    <MovieContext.Provider value={{ watchList, handleAddToWatchList, handleRemoveFromWatchList }}>
      {children}
    </MovieContext.Provider>
  );
}