import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Movies, MoviesInfo } from '../types/Movie'
import { initMovieList } from '@/utils/initMovieLists'

export const useUpcomingMovieStore = defineStore('upcomingMovie', () => {
  const upcomingMovies = ref<Movies[]>([])
  const upcomingMoviesDate = ref<{ maximum: string; minimum: string }>({ maximum: '', minimum: '' })
  const upcomingMoviesInfoList = ref<MoviesInfo[]>([])
  const totalPages = ref<number>(0)
  const currentPage = ref<number>(1)

  const fiveElementsOfList = computed(() => upcomingMoviesInfoList.value.slice(0, 5))

  const initUpcomingMovies = (page: number) => {
    initMovieList(
      upcomingMovies,
      `movie/upcoming?language=en-US&page=${page}`,
      upcomingMoviesInfoList,
      totalPages,
      currentPage,
      upcomingMoviesDate
    )
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
