import { useState } from "react";
import { useMovieContext } from "../context/useMovieContext";
import BookingFormErrorMessage from "./BookingFormErrorMessage";
import type { Movie } from "../models/movie";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    selectedSeats: "",
  });
  const [success, setSuccess] = useState(false);
  const {
    currentMovie,
    selectedSeats,
    setSelectedSeats,
    setMovies,
    setCurrentMovie,
  } = useMovieContext();

  const validateInput = () => {
    let isValid = true;
    const newErrors = { name: "", phoneNumber: "", selectedSeats: "" };

    if (selectedSeats.length === 0) {
      newErrors.selectedSeats = "Please select at least one seat";
      isValid = false;
    }
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const phoneTrimmed = phoneNumber.trim();
    if (!phoneTrimmed) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else {
      const phoneRegex = /^[0-9+\-() ]+$/;
      if (!phoneRegex.test(phoneTrimmed)) {
        newErrors.phoneNumber = "Phone number is invalid";
        isValid = false;
      }
    }

    setError((prev) => ({
      ...prev,
      ...newErrors,
    }));

    return isValid;
  };

  const postBooking = async () => {
    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        phoneNumber: phoneNumber,
        seats: selectedSeats,
        movieId: currentMovie?.id,
        movieTitle: currentMovie?.movie,
        totalPrice: currentMovie?.price,
      }),
    });
    // if (!res.ok) throw new Error("Failed to post data");
    const data = await res.json();
    console.log(`Booking created: ${data}`);
  };

  const bookSeats = async () => {
    const updatedBookedSeats = [...currentMovie.bookedSeats, ...selectedSeats];
    try {
      const res = await fetch(
        `http://localhost:3000/movies/${currentMovie?.id}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            bookedSeats: updatedBookedSeats,
          }),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to update movie data");
      }
      setMovies((prev: Movie[]) => {
        const update = prev.map((movie) =>
          movie.id === currentMovie.id
            ? { ...movie, bookedSeats: updatedBookedSeats }
            : movie,
        );
        return update;
      });
      setCurrentMovie((prev) => ({
        ...prev,
        bookedSeats: updatedBookedSeats,
      }));
    } catch (error) {
      console.log("Error connecting to json-server locally:", error);
      console.log("Updating Frontend Only");

      setMovies((prev: Movie[]) => {
        const update = prev.map((movie) =>
          movie.id === currentMovie.id
            ? { ...movie, bookedSeats: updatedBookedSeats }
            : movie,
        );
        return update;
      });
      setCurrentMovie((prev) => ({
        ...prev,
        bookedSeats: updatedBookedSeats,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    postBooking();
    bookSeats();
    setName("");
    setPhoneNumber("");
    setSelectedSeats([]);
    setSuccess(true);
  };
  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Book Your Tickets</h2>

      {!success && (
        <>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <BookingFormErrorMessage
              error={error.name}
            ></BookingFormErrorMessage>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <BookingFormErrorMessage
              error={error.phoneNumber}
            ></BookingFormErrorMessage>
          </div>
          <div className="form-group">
            <button className="submit-btn" type="submit">
              Book Tickets
            </button>
            <BookingFormErrorMessage
              error={error.selectedSeats}
            ></BookingFormErrorMessage>
          </div>
        </>
      )}
      {success && (
        <>
          <p className="success">Success!</p>
          <button
            className="submit-btn"
            onClick={() => {
              setSuccess(false);
            }}
          >
            Back
          </button>
        </>
      )}
    </form>
  );
}
