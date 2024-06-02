import type { Movies, MoviesInfo, MoviesResponse, UpcomingMovieResponse } from '@/types/Movie'
import type { Ref } from 'vue'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
  }
}

const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
const noImageUrl = import.meta.env.VITE_BASE_NO_IMAGE

function isUpcomingMovieResponse(
  response: MoviesResponse | UpcomingMovieResponse
): response is UpcomingMovieResponse {
  return 'dates' in response
}

export const initMovieList = async (
  movies: Ref<Movies[]>,
  givenUrl: string,
  moviesInfoList?: Ref<MoviesInfo[]>,
  totalPages?: Ref<number>,
  currentPage?: Ref<number>,
  dates?: Ref<{ maximum: string; minimum: string }>
) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}${givenUrl}`
    const res = await fetch(url, options)
    const json: MoviesResponse | UpcomingMovieResponse = await res.json()
    movies.value = []
    json.results.map((movie) => {
      movie = {
        ...movie,
        backdrop_path: movie.backdrop_path
          ? `${baseImgUrl}${movie.backdrop_path}`
          : `${noImageUrl}`,
        poster_path: movie.poster_path ? `${baseImgUrl}${movie.poster_path}` : `${noImageUrl}`
      }
      movies.value.push(movie)
    })

    if (isUpcomingMovieResponse(json) && dates) {
      dates.value = json.dates
    }
    if (totalPages) {
      totalPages.value = json.total_pages
    }
    if (currentPage) {
      currentPage.value = json.page
    }
    const transformedData = json.results.map((movie) => ({
      title: movie.title,
      poster_path: movie.poster_path ? `${baseImgUrl}${movie.poster_path}` : `${noImageUrl}`,
      backdrop_path: movie.backdrop_path ? `${baseImgUrl}${movie.backdrop_path}` : `${noImageUrl}`,
      id: movie.id
    }))
    if (moviesInfoList) {
      moviesInfoList.value = transformedData
    }
  } catch (err) {
    console.error('error:' + err)
  }
}
