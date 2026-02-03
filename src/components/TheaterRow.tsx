import type { seat } from "../data/theaterStatus";
import TheaterRowSeat from "./TheaterRowSeat";

type TheaterRowProps={
    seats: seat[]
}

export default function TheaterRow({seats}: TheaterRowProps) {

    return <div className="row">
        {seats.map((seat) => {
            return <TheaterRowSeat key={seat.seat} seatStatus={seat} />
      })}
  </div>;
}
