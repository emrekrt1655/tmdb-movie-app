export interface PopularMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface PopularMovieResponse {
  page: number
  results: PopularMovie[]
}

export interface PopularMoviesInfo {
  title: string
  backdrop_path: string
  id: number
}

export interface UpcomingMovieResponse extends PopularMovieResponse {
  dates: {
    maximum: string
    minimum: string
  }
}
