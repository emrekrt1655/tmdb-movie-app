import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Movies, MoviesInfo } from '../types/Movie'
import { initMovieList } from '@/utils/initMovieLists'

export const useMovieTrendingStore = defineStore('movieTrending', () => {
  const trendingMovies = ref<Movies[]>([])
  const trendingMoviesInfoList = ref<MoviesInfo[]>([])

  const fiveElementsOfList = computed(() => trendingMoviesInfoList.value.slice(0, 5))

  const initTrendingMovies = async (time: string) => {
    initMovieList(trendingMovies, trendingMoviesInfoList, `trending/movie/${time}?language=en-US`)
  }

  return { trendingMovies, trendingMoviesInfoList, initTrendingMovies, fiveElementsOfList }
})
