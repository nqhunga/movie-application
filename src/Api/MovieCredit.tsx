import { ICast } from '../Types/Types';

export async function MovieDetail(movieID: number): Promise<ICast> {
  const response = await fetch(`/movie-credit/${movieID}`);
  const results = await response.json();
  return results;
}