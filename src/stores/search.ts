import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movies, MoviesResponse } from '../types/Movie'

export const useSearchMovieStore = defineStore('searchMovie', () => {
  const searchMovies = ref<Movies[]>([])
  const searchInput = ref('')
  const fiveElementsOfList = computed(() => searchMovies.value.slice(0, 5))
  const gettingUrl = (searchInput: string, page: number) => {
    return `${import.meta.env.VITE_BASE_URL}/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=${page}`
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }
  const initSearchMovies = async (searchInput: string, page: number) => {
    try {
      const url = gettingUrl(searchInput, page)
      const res = await fetch(url, options)
      const json: MoviesResponse = await res.json()
      searchMovies.value = json.results
    } catch (err) {
      console.error('error:' + err)
    }
  }
  return { searchInput, searchMovies, fiveElementsOfList, initSearchMovies }
})
