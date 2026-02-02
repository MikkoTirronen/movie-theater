export class Movie {
  id: string;
  title: string;
  price: string;
  bookedSeats: string[];
  movie: string | undefined;
  imdbUrl: string | undefined;
  genres: string[] | undefined;
  year: number | undefined;
  directors: string[] | undefined;
  cast: string[] | undefined;

  constructor(
    id: string,
    title: string,
    price: string,
    bookedSeats: string[],
    movie?: string,
    imdbUrl?: string,
    genres?: string[],
    year?: number,
    directors?: string[],
    cast?: string[],
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.bookedSeats = bookedSeats;
    this.movie = movie;
    this.imdbUrl = imdbUrl;
    this.genres = genres;
    this.year = year;
    this.directors = directors;
    this.cast = cast;
  }
}
