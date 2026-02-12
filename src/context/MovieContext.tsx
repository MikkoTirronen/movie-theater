import React, { useState, useMemo } from "react";
import { Movie } from "../models/movie";
import { MovieContext } from "./useMovieContext";
import { seatData, type seat } from "../data/theaterStatus";

export function MovieContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState([
    new Movie("1", "Fast and furious 6", "100", [
      "B4",
      "B5",
      "C7",
      "C8",
      "E4",
      "E5",
      "F5",
      "F6",
      "F7",
    ]),
    new Movie("2", "The mummy returns", "50", []),
    new Movie("3", "Jumanji: Welcome to the Jungle", "70", []),
    new Movie("4", "Rampage", "40", []),
  ]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie>(movies[0]);

  const theaterStatus = useMemo(() => {
  if (!currentMovie) return seatData;

  return seatData.map((row) => ({
    ...row,
    seats: row.seats.map((seat) => ({
      ...seat,
      status: currentMovie.bookedSeats?.includes(seat.seat)
        ? "occupied" as const
        : "available" as const,
    })),
  }));
}, [currentMovie]);

  const selectSeat = (selectedSeat: seat): void => {
    if (selectedSeats.includes(selectedSeat.seat)) {
      const update = selectedSeats.filter((item) => item !== selectedSeat.seat);
      setSelectedSeats(update);
    } else if (selectedSeat.status === "available") {
      setSelectedSeats((prev) => [...prev, selectedSeat.seat]);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        currentMovie,
        setCurrentMovie,
        theaterStatus,
        selectedSeats,
        selectSeat,
        setSelectedSeats,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
