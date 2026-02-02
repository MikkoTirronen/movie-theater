import { createContext, useContext } from "react";

import type { Movie } from "../models/movie";

export const MovieContext = createContext<{
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}>({
  movies: [],
  setMovies: () => {},
});

export const useMovieContext = () => {
  return useContext(MovieContext);
};
