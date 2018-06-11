import { IPerson } from '../Types/Types';

export async function PersonDetail(personID: number): Promise<IPerson> {
  const response = await fetch(`/person-detail/${personID}`);
  const results = await response.json();
  return results;
}