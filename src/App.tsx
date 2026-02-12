import { useEffect } from "react";
import "./App.css";
import MovieSelect from "./components/MovieSelect";
import Theater from "./components/Theater";
import TotalPrice from "./components/TotalPrice";
import { useMovieContext } from "./context/useMovieContext";
import BookingForm from "./components/BookingForm";

function App() {
  const { setMovies } = useMovieContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [setMovies]);

  return (
    <>
      <MovieSelect />
      <Theater />
      <TotalPrice />
      <BookingForm/>
    </>
  );
}

export default App;
