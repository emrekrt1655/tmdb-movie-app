import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SearchResult } from '../types/Movie'

export const useSearchMovieStore = defineStore('searchMovie', () => {
  const searchMovies = ref<SearchResult[]>([])
  const searchInput = ref('')
  const fiveElementsOfList = computed(() => searchMovies.value.slice(0, 5))
  const url = computed(() => {
    return `${import.meta.env.VITE_BASE_URL}/search/keyword?query=${searchInput.value}&page=1`
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initSearchMovies = async () => {
    try {
      const res = await fetch(url.value, options)
      const json = await res.json()
      searchMovies.value = json.results.map((movie: SearchResult) => ({
        id: movie.id,
        name: movie.name.charAt(0).toUpperCase() + movie.name.slice(1)
      }))
    } catch (err) {
      console.error('error:' + err)
    }
  }
  return { searchInput, searchMovies, fiveElementsOfList, initSearchMovies }
})
