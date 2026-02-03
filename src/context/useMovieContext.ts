import { createContext, useContext } from "react";

import { Movie } from "../models/movie";
import type { seat, TheaterRowType } from "../data/theaterStatus";

export const MovieContext = createContext<{
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  theaterStatus: TheaterRowType[];
  setTheaterStatus: React.Dispatch<React.SetStateAction<TheaterRowType[]>>;
  selectSeat: (seat: seat) => void;
  selectedSeats: string[];
}>({
  movies: [],
  setMovies: () => {},
  price: "0",
  setPrice: () => {},
  theaterStatus: [],
  setTheaterStatus: () => {},
  selectSeat: () => {},
  selectedSeats: [],
});

export const useMovieContext = () => {
  return useContext(MovieContext);
};
