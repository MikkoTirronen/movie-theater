import "./App.css";
import MovieSelect from "./components/MovieSelect";
import Theater from "./components/Theater";

function App() {
  return (
    <>
      <div className="movie-container">
        <MovieSelect />
      </div>
      <Theater />
      <p className="text">
        You have selected <span id="count">0</span> seats for a price of $
        <span id="total">0</span>
      </p>
    </>
  );
}

export default App;
