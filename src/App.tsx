import { useEffect, useState } from "react";
import "./App.css";
import MovieSelect from "./components/MovieSelect";
import Theater from "./components/Theater";
import TotalPrice from "./components/TotalPrice";
import { useMovieContext } from "./context/useMovieContext";
import BookingForm from "./components/BookingForm";
import AdminPanel from "./components/AdminPanel";

function App() {
  const { setMovies } = useMovieContext();
  const [adminToggle, setAdminToggle] = useState<boolean>(false);
  const handleClick = () => {
    setAdminToggle(!adminToggle);
  };
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
      <nav className="navbar">
        <button onClick={handleClick}>{adminToggle ? "Hide Admin" : "Show Admin"}</button>
      </nav>
      <h1>Movie Theater Booking</h1>
      {!adminToggle && (
        <>
          <MovieSelect />
          <Theater />
          <TotalPrice />
          <BookingForm />
        </>
      )}
      {adminToggle && (
        <AdminPanel />
      )}
    </>
  );
}

export default App;
