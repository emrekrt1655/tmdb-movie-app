import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movies } from '../types/Movie'
import { initMovieList } from '@/utils/initMovieLists'

export const useSearchMovieStore = defineStore('searchMovie', () => {
  const searchMovies = ref<Movies[]>([])
  const searchInput = ref('')
  const fiveElementsOfList = computed(() => searchMovies.value.slice(0, 5))
  console.log(fiveElementsOfList)

  const initSearchMovies = async (searchInput: string, page: number) => {
    initMovieList(
      searchMovies,
      `search/movie?query=${searchInput}&include_adult=false&language=en-US&page=${page}`
    )
  }
  return { searchInput, searchMovies, fiveElementsOfList, initSearchMovies }
})
