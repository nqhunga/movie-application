export interface IMovieSearch {
  id: number,
  vote_average: number,
  title: string,
  poster_path: string,
  original_language: string,
  overview: string,
  release_date: string,
  genre_ids: Array<number>
}

export interface IMovie {
  id: number,
  imdb_id: string,
  original_title: string,
  title: string,
  vote_average: number,
  backdrop_path: string,
  budget: number,
  revenue: number,
  genres: Array<{
    id: number,
    name: string
  }>,
  homepage: string,
  original_language: string,
  overview: string,
  release_date: string,
  runtime: number,
  status: string,
  tagline: string,
  production_countries: Array<{
    name: string
  }>
}

export interface ICast {
  id: number,
  cast: Array<{
    character: string,
    name: string,
    id: number,
    profile_path: string
  }>
}

export interface IPerson {
  id: number,
  name: string,
  birthday: string,
  gender: number,
  place_of_birth: string,
  biography: string,
  profile_path: string,
  imdb_id: string
}

export interface IPersonSearch {
  id: number,
  name: string,
  profile_path: string,
  known_for: Array<{
    id: number,
    title: string,
    poster_path: string,
    media_type: string,
  }>
}

export interface IGenre {
  id: number,
  name: string
}

export interface ITrailer {
  id: string,
  key: string,
  type: string
}