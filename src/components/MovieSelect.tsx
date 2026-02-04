import { useMovieContext } from "../context/useMovieContext";

export default function MovieSelect() {
  const { movies, setCurrentMovie } = useMovieContext();

  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie:</label>
      <select
        name="movie"
        id="movie"
        onChange={(e) => {
          setCurrentMovie(movies[parseInt(e.target.value)]);
        }}
      >
        {movies.map((movie, index) => {
          return (
            <option
              key={"movie" + movie.id}
              value={index}
            >{`${movie.title} (${movie.price} kr)`}</option>
          );
        })}
      </select>
    </div>
  );
}
