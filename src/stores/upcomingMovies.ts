import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PopularMovie, PopularMoviesInfo, UpcomingMovieResponse } from '../types/Movie'

export const useUpcomingMovieStore = defineStore('upcomingMovie', () => {
  const upcomingMovies = ref<PopularMovie[]>([])
  const upcomingMoviesInfoList = ref<PopularMoviesInfo[]>([])

  const fiveElementsOfList = computed(() => upcomingMoviesInfoList.value.slice(0, 5))

  const url = `${import.meta.env.VITE_BASE_URL}/movie/upcoming?language=en-US&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initUpcomingMovies = async () => {
    try {
      const res = await fetch(url, options)
      const json: UpcomingMovieResponse = await res.json()
      upcomingMovies.value = json.results
      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        id: movie.id
      }))
      upcomingMoviesInfoList.value = transformedData
      console.log(upcomingMovies.value)
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return { upcomingMovies, upcomingMoviesInfoList, initUpcomingMovies, fiveElementsOfList }
})
