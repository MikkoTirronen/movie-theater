import { createContext, useContext } from "react";

import { Movie } from "../models/movie";
import type { seat, TheaterRowType } from "../data/theaterStatus";

export const MovieContext = createContext<{
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  currentMovie: Movie;
  setCurrentMovie: React.Dispatch<React.SetStateAction<Movie>>;
  theaterStatus: TheaterRowType[];
  setTheaterStatus: React.Dispatch<React.SetStateAction<TheaterRowType[]>>;
  selectSeat: (seat: seat) => void;
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  movies: [],
  setMovies: () => {},
  currentMovie: new Movie("0", "None", "0", []),
  setCurrentMovie: () => {},
  theaterStatus: [],
  setTheaterStatus: () => {},
  selectSeat: () => {},
  selectedSeats: [],
  setSelectedSeats: () => {},
});

export const useMovieContext = () => {
  return useContext(MovieContext);
};
