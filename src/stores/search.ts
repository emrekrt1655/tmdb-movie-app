import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movies } from '../types/Movie'
import { initMovieList } from '@/utils/initMovieLists'
import type { Serie } from '@/types/Serie'
import { initSeriesList } from '@/utils/initSerieList'

export const useSearchStore = defineStore('search', () => {
  const searchMovies = ref<Movies[]>([])
  const searchSeries = ref<Serie[]>([])
  const searchInput = ref('')
  const fiveElementsOfList = computed(() => searchMovies.value.slice(0, 5))
  const searchAnimeMovies = computed(() =>
    searchMovies.value.filter((movie) => movie.genre_ids.includes(16))
  )

  const initSearchMovies = async (searchInput: string, page: number) => {
    initMovieList(
      searchMovies,
      `search/movie?query=${searchInput}&include_adult=false&language=en-US&page=${page}`
    )
  }

  const initSearchSeries = async (searchInput: string, page: number) => {
    initSeriesList(
      searchSeries,
      `search/tv?query=${searchInput}&include_adult=false&language=en-US&page=${page}`
    )
  }

  return {
    searchInput,
    searchMovies,
    searchSeries,
    fiveElementsOfList,
    initSearchMovies,
    initSearchSeries,
    searchAnimeMovies
  }
})
