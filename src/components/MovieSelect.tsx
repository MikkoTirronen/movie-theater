import { useMovieContext } from "../context/useMovieContext";

export default function MovieSelect() {
  const { movies, setPrice,  } = useMovieContext();

  return (
    <>
      <label htmlFor="movie">Pick a movie:</label>
      <select
        name="movie"
        id="movie"
        onChange={(e) => {
          setPrice(e.target.value)
        }}
      >
        {movies.map((movie) => {
          return (
            <option
              key={"movie" + movie.id}
              value={movie.price}
            >{`${movie.title} (${movie.price} kr)`}</option>
          );
        })}
      </select>
    </>
  );
}
