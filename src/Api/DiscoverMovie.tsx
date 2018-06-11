import { IMovieSearch } from '../Types/Types';

interface IResults {
  results: IMovieSearch[]
}

export async function DiscoverMovie(sortBy: string): Promise<IMovieSearch[]> {
  const response = await fetch(`/discover-movie/${sortBy}`);
  const results = await response.json();
  const movie = results.results;
  return movie as IMovieSearch[];
}