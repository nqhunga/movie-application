import {IGenre} from '../Types/Types';

export async function GenreList(): Promise<Array<IGenre>> {
  const response = await fetch(`/genre/`);
  const results = await response.json();
  const theList = results.genres;
  return theList as Array<IGenre>;
}