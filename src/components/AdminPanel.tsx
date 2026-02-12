import React, { useState } from "react";
import type { Movie } from "../models/movie";
import { useMovieContext } from "../context/useMovieContext";
import AdminPanelForm from "./AdminPanelForm";

export default function AdminPanel() {
  const { movies } = useMovieContext();
  const [editMovieId, setEditMovieId] = useState<string>();
  const handleAdminSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    setEditMovieId(target);
  };
  return (
    <>
      <h2>Add/Edit Movies</h2>
      <div className="movie-container">
        <select
          name="movie"
          id="movie"
          value={editMovieId}
          onChange={handleAdminSelect}
        >
          <option value={""}>Add New Movie</option>
          {movies.map((movie: Movie) => {
            return (
              <option
                key={movie.id}
                value={movie.id}
              >{`${movie.title} (${movie.price}kr)`}</option>
            );
          })}
        </select>
        <AdminPanelForm editMovieId={editMovieId} setEditMovieId={setEditMovieId}></AdminPanelForm>
      </div>
    </>
  );
}
