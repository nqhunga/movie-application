import { IPersonSearch } from '../Types/Types';

export async function SearchPerson(personName: string): Promise<IPersonSearch> {
  const response = await fetch(`/search-person/${personName}`);
  const results = await response.json();
  const person = results.results;
  return person;
}