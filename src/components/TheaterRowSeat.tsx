import { type seat } from "../data/theaterStatus";
import { useMovieContext } from "../context/useMovieContext";
type TheaterRowSeatProps = {
  seatStatus: seat;
};
export default function TheaterRowSeat({ seatStatus }: TheaterRowSeatProps) {
  const { selectSeat,selectedSeats } = useMovieContext();
  return (
    <div
      className={`seat ${seatStatus.status === "occupied" && "occupied"} ${selectedSeats.includes(seatStatus.seat) && "selected"}`}
      onClick={() => {
        selectSeat(seatStatus);
      }}
    ></div>
  );
}
