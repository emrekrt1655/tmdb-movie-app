import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { MoviesResponse, Movies, MoviesInfo } from '../types/Movie'

export const useMoviePopularStore = defineStore('moviePopular', () => {
  const popularMovies = ref<Movies[]>([])
  const totalPages = ref<number>(0)
  const currentPage = ref<number>(1)
  const popularMoviesInfoList = ref<MoviesInfo[]>([])

  const fiveElementsOfList = computed(() => popularMovies.value.slice(0, 5))

  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
  const noImageUrl = import.meta.env.VITE_BASE_NO_IMAGE

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
      const json: MoviesResponse = await res.json()
      json.results.map((movie) => {
        movie = {
          ...movie,
          backdrop_path: movie.backdrop_path
            ? `${baseImgUrl}${movie.backdrop_path}`
            : `${noImageUrl}`,
          poster_path: movie.poster_path ? `${baseImgUrl}${movie.poster_path}` : `${noImageUrl}`
        }
        popularMovies.value.push(movie)
      })
      totalPages.value = json.total_pages
      currentPage.value = json.page
      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        poster_path: movie.poster_path ? `${baseImgUrl}${movie.poster_path}` : `${noImageUrl}`,
        backdrop_path: movie.backdrop_path
          ? `${baseImgUrl}${movie.backdrop_path}`
          : `${noImageUrl}`,
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
