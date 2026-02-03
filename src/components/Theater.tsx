import { useMovieContext } from "../context/useMovieContext";
import TheaterRow from "./TheaterRow";

export default function Theater() {
  const { theaterStatus } = useMovieContext();
  return (
    <>
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <div className="container">
        <div className="screen"></div>
        {theaterStatus.map((row) => {
          return <TheaterRow key={"Row" + row.id} seats={row.seats} />;
        })}
      </div>
    </>
  );
}
