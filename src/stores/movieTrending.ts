import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PopularMovieResponse, PopularMovie, PopularMoviesInfo } from '../types/Movie'

export const useMovieTrendingStore = defineStore('movieTrending', () => {
  const trendingMovies = ref<PopularMovie[]>([])
  const trendingMoviesInfoList = ref<PopularMoviesInfo[]>([])

  const fiveElementsOfList = computed(() => trendingMoviesInfoList.value.slice(0, 5))

  const url = `${import.meta.env.VITE_BASE_URL}/trending/movie/day?language=en-US`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initTrendingMovies = async () => {
    try {
      const res = await fetch(url, options)
      const json: PopularMovieResponse = await res.json()
      trendingMovies.value = json.results
      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        id: movie.id
      }))
      trendingMoviesInfoList.value = transformedData
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return { trendingMovies, trendingMoviesInfoList, initTrendingMovies, fiveElementsOfList }
})