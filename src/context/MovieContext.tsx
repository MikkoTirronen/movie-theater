import React, { useState } from "react";
import { Movie } from "../models/movie";
import { MovieContext } from "./useMovieContext";

export function MovieContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState([
    new Movie("1", "Fast and furious 6", "100", []),
    new Movie("2", "The mummy returns", "50", []),
    new Movie("3", "Jumanji: Welcome to the Jungle", "70", []),
    new Movie("4", "Rampage", "40", []),
  ]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
}
