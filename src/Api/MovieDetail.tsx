import { IMovie } from '../Types/Types';
import { ITrailer } from '../Types/Types';
import { ICast } from '../Types/Types';

export async function MovieDetail(movieID: number): Promise<IMovie> {
  const response = await fetch(`/movie-detail/${movieID}`);
  const results = await response.json();
  return results;
}

export async function Trailer(movieID: number): Promise<Array<ITrailer>> {
  const response = await fetch(`/trailer/${movieID}`);
  const results = await response.json();
  return results.results.filter((v: ITrailer) => v.type === 'Trailer');
}

export async function Cast(movieID: number): Promise<ICast> {
  const response = await fetch(`/movie-credit/${movieID}`);
  const results = await response.json();
  return results;
}


