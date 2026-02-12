import { useMovieContext } from "../context/useMovieContext";

export default function MovieSelect() {
  const { movies, setCurrentMovie, setSelectedSeats } = useMovieContext();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeats([]);
    const selectedMovie = movies.findIndex((movie) => movie.id === e.target.value);
    setCurrentMovie(movies[selectedMovie]);
  }

  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie:</label>
      <select
        name="movie"
        id="movie"
        onChange={handleOnChange}
      >
        {movies.map((movie) => {
          return (
            <option
              key={"movie" + movie.id}
              value={movie.id}
            >{`${movie.title} (${movie.price} kr)`}</option>
          );
        })}
      </select>
    </div>
  );
}
