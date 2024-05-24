import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { PopularMovieResponse, PopularMovie, PopularMoviesInfo } from '../types/Movie'

export const useMoviePopularStore = defineStore('moviePopular', () => {
  const popularMovies = ref<PopularMovie[]>([])
  const totalPages = ref<number>(0)
  const currentPage = ref<number>(1)
  const popularMoviesInfoList = ref<PopularMoviesInfo[]>([])

  const fiveElementsOfList = computed(() => popularMovies.value.slice(0, 5))

  const gettingUrl = (page: number) => {
    return `${import.meta.env.VITE_BASE_URL}movie/popular?language=en-US&page=${page}`
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initPopularMovies = async (page: number) => {
    try {
      const url = gettingUrl(page)
      const res = await fetch(url, options)
      const json: PopularMovieResponse = await res.json()
      popularMovies.value = json.results
      totalPages.value = json.total_pages
      currentPage.value = json.page
      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        id: movie.id
      }))
      popularMoviesInfoList.value = transformedData
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return {
    popularMovies,
    popularMoviesInfoList,
    initPopularMovies,
    fiveElementsOfList,
    totalPages,
    currentPage
  }
})
