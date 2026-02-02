import React from "react";
import { useMovieContext } from "../context/useMovieContext";

export default function MovieSelect() {
  const { movies } = useMovieContext();
  return (
    <>
      <label htmlFor="movie">Pick a movie:</label>
      <select name="movie" id="movie">
        {movies.map((movie) => {
          return (
            <option
              value={movie.price}
            >{`${movie.title} (${movie.price} kr)`}</option>
          );
        })}
      </select>
    </>
  );
}
