import { useMovieContext } from "../context/useMovieContext";

export default function TotalPrice() {
    const { selectedSeats, price } = useMovieContext();
    const total = selectedSeats.length * parseInt(price);

  return (
    <p className="text">
          You have selected <span id="count">{selectedSeats?.length}</span> seats for a price of $
          <span id="total">{total}</span>
    </p>
  );
}
