import React, { useState } from "react";
import { Movie } from "../models/movie";
import { MovieContext } from "./useMovieContext";
import { seatData } from "../data/theaterStatus";

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
  const [theaterStatus, setTheaterStatus] = useState(seatData);

  const selectSeat = (seat: string): void => {
    setTheaterStatus((prev) => {
      const rowIndex = prev.findIndex((rowItem) => rowItem.row === seat[0]);
      const prevRow = prev[rowIndex];
      const seatIndex = prevRow.seats.findIndex(
        (seatItem) => seatItem.seat === seat,
      );

      const updatedSeats = [...prevRow.seats];
      updatedSeats[seatIndex] = {
        ...updatedSeats[seatIndex],
        status:
          updatedSeats[seatIndex].status === "selected"
            ? "available"
            : "selected",
      };

      const updatedRow = { ...prevRow, seats: updatedSeats };
      const updatedTheater = [...prev];
      updatedTheater[rowIndex] = updatedRow;
      return updatedTheater;
    });
  };
  return (
    <MovieContext.Provider
      value={{ movies, setMovies, theaterStatus, setTheaterStatus, selectSeat }}
    >
      {children}
    </MovieContext.Provider>
  );
}
