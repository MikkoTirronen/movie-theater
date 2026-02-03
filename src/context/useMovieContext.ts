import { createContext, useContext } from "react";

import type { Movie } from "../models/movie";
import type { TheaterRowType } from "../data/theaterStatus";

export const MovieContext = createContext<{
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  theaterStatus: TheaterRowType[];
  setTheaterStatus: React.Dispatch<React.SetStateAction<TheaterRowType[]>>;
  selectSeat: (seat:string) => void;
}>({
  movies: [],
  setMovies: () => {},
  theaterStatus: [],
  setTheaterStatus: () => {},
  selectSeat: () => {},
});

export const useMovieContext = () => {
  return useContext(MovieContext);
};
