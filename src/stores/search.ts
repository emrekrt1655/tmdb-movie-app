import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { PopularMovie, PopularMovieResponse } from '../types/Movie'

export const useSearchMovieStore = defineStore('searchMovie', () => {
  const searchMovies = ref<PopularMovie[]>([])
  const searchInput = ref('')
  const fiveElementsOfList = computed(() => searchMovies.value.slice(0, 5))
  const gettingUrl = (searchInput: string) => {
    return `${import.meta.env.VITE_BASE_URL}/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }
  const initSearchMovies = async (searchInput: string) => {
    try {
      const url = gettingUrl(searchInput)
      const res = await fetch(url, options)
      const json: PopularMovieResponse = await res.json()
      searchMovies.value = json.results
    } catch (err) {
      console.error('error:' + err)
    }
  }
  return { searchInput, searchMovies, fiveElementsOfList, initSearchMovies }
})
