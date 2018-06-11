import { IMovieSearch, IMovie } from '../Types/Types';

interface IResults {
  results: IMovieSearch[]
}

export async function SearchMovie(movieName: string): Promise<IMovieSearch> {
  const response = await fetch(`/search-movie/${movieName}`);
  const results = await response.json();
  const movie = results.results;
  return movie as IMovieSearch;
}