import { type seat } from "../data/theaterStatus";
import { useMovieContext } from "../context/useMovieContext";
type TheaterRowSeatProps = {
    seatStatus: seat;
};
export default function TheaterRowSeat({ seatStatus }: TheaterRowSeatProps) {
    const { selectSeat } = useMovieContext();
    const currentSeat = seatStatus.seat
    return (
    <div
      className={`seat ${seatStatus.status === "occupied" && "occupied"} ${seatStatus.status==="selected"&& "selected"}`}
            onClick={() => {
                selectSeat(currentSeat);
        console.log(seatStatus.seat);
      }}
    ></div>
  );
}
