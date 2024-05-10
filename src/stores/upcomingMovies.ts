import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PopularMovie, PopularMoviesInfo, UpcomingMovieResponse } from '../types/Movie'

export const useUpcomingMovieStore = defineStore('upcomingMovie', () => {
  const upcomingMovies = ref<PopularMovie[]>([])
  const upcomingMoviesDate = ref<{ maximum: string; minimum: string }>()
  const upcomingMoviesInfoList = ref<PopularMoviesInfo[]>([])
  const totalPages = ref<number>(0)
  const currentPage = ref<number>(1)

  const fiveElementsOfList = computed(() => upcomingMoviesInfoList.value.slice(0, 5))

  const gettingUrl = (page: number) => {
    return `${import.meta.env.VITE_BASE_URL}movie/upcoming?language=en-US&page=${page}`
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initUpcomingMovies = async (page: number) => {
    try {
      const url = gettingUrl(page)
      const res = await fetch(url, options)
      const json: UpcomingMovieResponse = await res.json()
      upcomingMoviesDate.value = json.dates
      upcomingMovies.value = json.results
      totalPages.value = json.total_pages
      currentPage.value = json.page

      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        id: movie.id
      }))
      upcomingMoviesInfoList.value = transformedData
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return {
    upcomingMovies,
    upcomingMoviesInfoList,
    initUpcomingMovies,
    fiveElementsOfList,
    upcomingMoviesDate,
    totalPages,
    currentPage
  }
})
