import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { MoviesResponse, Movies, MoviesInfo } from '../types/Movie'

export const useMovieTrendingStore = defineStore('movieTrending', () => {
  const trendingMovies = ref<Movies[]>([])
  const trendingMoviesInfoList = ref<MoviesInfo[]>([])

  const fiveElementsOfList = computed(() => trendingMoviesInfoList.value.slice(0, 5))

  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
  const noImageUrl = import.meta.env.VITE_BASE_NO_IMAGE

  const gettingUrl = (time: string) => {
    return `${import.meta.env.VITE_BASE_URL}/trending/movie/${time}?language=en-US`
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initTrendingMovies = async (time: string) => {
    const url = gettingUrl(time)
    try {
      const res = await fetch(url, options)
      const json: MoviesResponse = await res.json()
      json.results.map((movie) => {
        movie = {
          ...movie,
          backdrop_path: movie.backdrop_path
            ? `${baseImgUrl}${movie.backdrop_path}`
            : `${noImageUrl}`,
          poster_path: movie.poster_path ? `${baseImgUrl}${movie.poster_path}` : `${noImageUrl}`
        }
        trendingMovies.value.push(movie)
      })
      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        poster_path: movie.poster_path ? `${baseImgUrl}${movie.poster_path}` : `${noImageUrl}`,
        backdrop_path: movie.backdrop_path
          ? `${baseImgUrl}${movie.backdrop_path}`
          : `${noImageUrl}`,
        id: movie.id
      }))
      trendingMoviesInfoList.value = transformedData
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return { trendingMovies, trendingMoviesInfoList, initTrendingMovies, fiveElementsOfList }
})
