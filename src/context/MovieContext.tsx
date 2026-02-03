import React, { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { MovieContext } from "./useMovieContext";
import { seatData, type seat } from "../data/theaterStatus";

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
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [price, setPrice] = useState<string>(movies[0].price);

  useEffect(() => {
    setPrice(movies[0].price);
  },[movies])

  const updateSeat = (seat: string): void => {
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
  const selectSeat = (selectedSeat: seat): void => {
    if (
      selectedSeats.includes(selectedSeat.seat) &&
      selectedSeat.status === "selected"
    ) {
      updateSeat(selectedSeat.seat);
      const update = selectedSeats.filter((item) => item !== selectedSeat.seat);
      setSelectedSeats(update);
    } else if (selectedSeat.status === "available") {
      updateSeat(selectedSeat.seat);
      setSelectedSeats((prev) => [...prev, selectedSeat.seat]);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        price,
        setPrice,
        theaterStatus,
        setTheaterStatus,
        selectedSeats,
        selectSeat,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
