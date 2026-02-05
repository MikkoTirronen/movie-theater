import React, { useState, useEffect } from "react";
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
  const [theaterStatus, setTheaterStatus] = useState(seatData);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie>(movies[0]);

  const loadOccupiedSeats = (movie: Movie): void => {
    setTheaterStatus(seatData);
    movie.bookedSeats.forEach((bookedSeat) => {
      setTheaterStatus((prev) => {
        const rowIndex = prev.findIndex(
          (rowObject) => rowObject.row === bookedSeat[0],
        );
        const prevRow = prev[rowIndex];
        const seatIndex = prevRow.seats.findIndex(
          (seatObject) => seatObject.seat === bookedSeat,
        );
        const updatedSeats: seat[] = [...prevRow.seats];

        updatedSeats[seatIndex] = {
          ...updatedSeats[seatIndex],
          status: "occupied",
        };
        const updatedRow = { ...prevRow, seats: updatedSeats };
        const updatedTheater = [...prev];
        updatedTheater[rowIndex] = updatedRow;
        return updatedTheater;
      });
    });
  };

  useEffect(() => {
    setCurrentMovie(movies[0]);
  }, [movies]);

  useEffect(() => {
    setSelectedSeats([]);
    loadOccupiedSeats(currentMovie);
  }, [currentMovie]);

  // const updateSeat = (seat: string): void => {
  //   setTheaterStatus((prev) => {
  //     const rowIndex = prev.findIndex((rowItem) => rowItem.row === seat[0]);
  //     const prevRow = prev[rowIndex];
  //     const seatIndex = prevRow.seats.findIndex(
  //       (seatItem) => seatItem.seat === seat,
  //     );

  //     const updatedSeats: seat[] = [...prevRow.seats];
  //     updatedSeats[seatIndex] = {
  //       ...updatedSeats[seatIndex],
  //       status:
  //         updatedSeats[seatIndex].status === "selected"
  //           ? "available"
  //           : "selected",
  //     };

  //     const updatedRow = { ...prevRow, seats: updatedSeats };
  //     const updatedTheater = [...prev];
  //     updatedTheater[rowIndex] = updatedRow;
  //     return updatedTheater;
  //   });
  // };
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
        setTheaterStatus,
        selectedSeats,
        selectSeat,
        setSelectedSeats
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
