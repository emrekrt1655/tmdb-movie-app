import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { MoviesResponse, Movies, MoviesInfo } from '../types/Movie'
import { initMovieList } from '@/utils/initMovieLists'

export const useMoviePopularStore = defineStore('moviePopular', () => {
  const popularMovies = ref<Movies[]>([])
  const totalPages = ref<number>(0)
  const currentPage = ref<number>(1)
  const popularMoviesInfoList = ref<MoviesInfo[]>([])

  const fiveElementsOfList = computed(() => popularMovies.value.slice(0, 5))

  const initPopularMovies = (page: number) => {
    initMovieList(
      popularMovies,
      `movie/popular?language=en-US&page=${page}`,
      popularMoviesInfoList,
      totalPages,
      currentPage
    )
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
