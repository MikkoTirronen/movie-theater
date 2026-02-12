import { useState, useEffect } from "react";
import { useMovieContext } from "../context/useMovieContext";

export default function AdminPanelForm({
  editMovieId,
  setEditMovieId,
}: {
  editMovieId: string | undefined;
  setEditMovieId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [title, setTitle] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>();
  const { movies, setMovies } = useMovieContext();
  
  useEffect(() => {
    const movie = movies.find((m) => m.id === editMovieId);
    if (movie) {
      setTitle(movie.title);
      setPrice(movie.price);
    } else {
      setEditMovieId("");
      setTitle("");
      setPrice("");
    }
  }, [editMovieId, setEditMovieId, movies]);

  const addMovie = async () => {
    try {
      const res = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: title,
          price: price,
          bookedSeats: [],
        }),
      });
      if (!res.ok) throw new Error("Failed to post data");
      const data = await res.json();
      console.log(`Movie added: ${data}`);
      setMovies((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };
  const editMovie = async () => {
    try {
      const res = await fetch(`http://localhost:3000/movies/${editMovieId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: title,
          price: price,
        }),
      });
      if (!res.ok) throw new Error("Failed to post data");
      const data = await res.json();
      console.log(`Movie added: ${data}`);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteMovie = async () => {
    if (!editMovieId) {
      console.warn("No movie selected for deletion");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/movies/${editMovieId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete movie");
      setMovies((prev) => prev.filter((movie) => movie.id !== editMovieId));
      console.log(`Movie with id ${editMovieId} deleted`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMovieId === "") {
      addMovie();
    } else {
      editMovie();
    }
  };
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteMovie();
    setEditMovieId("");
    setPrice("");
    setTitle("");
  };
  return (
    <form className="booking-form" onSubmit={handleOnSubmit}>
      {editMovieId !== "" && (
        <button className="delete-btn" onClick={handleDelete}>
          Delete Movie
        </button>
      )}
      <h2>{editMovieId === "" ? "Add New Movie" : "Edit Movie"}</h2>
      <div className="form-group">
        <label htmlFor="movie-title">Movie Title:</label>
        <input
          type="text"
          id="movie-title"
          name="movie-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="movie-price">Movie Price (kr):</label>
        <input
          type="text"
          id="movie-price"
          name="movie-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="100"
        />
      </div>
      <button type="submit" className="submit-btn add-margin-top">
        Submit
      </button>
    </form>
  );
}
