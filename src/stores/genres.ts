import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from '../types/Genre'
import type { Movies, MoviesResponse, MoviesInfo } from '@/types/Movie'
import { initMovieList } from '@/utils/initMovieLists'

export const useGenreStore = defineStore('genres', () => {
  const genres = ref<Genre[]>([])
  const movies = ref<Movies[]>([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const moviesInfoList = ref<MoviesInfo[]>([])

  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
  const gettingUrlwithGenreId = (genreId: number, page: number) => {
    const url =
      genreId === 0
        ? `${import.meta.env.VITE_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
        : `${import.meta.env.VITE_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`

    return url
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  }

  const initGenres = async () => {
    try {
      const res = await fetch(url, options)
      const json = await res.json()
      genres.value = json.genres
    } catch (err) {
      console.error('error:' + err)
    }
  }

  const genreMoviesList = async (genreId: number, page: number) => {
    const givenUrl =
      genreId === 0
        ? `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
        : `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`
    await initMovieList(movies, givenUrl, moviesInfoList, totalPages, currentPage)
  }

  return { initGenres, genreMoviesList, genres, movies, moviesInfoList, currentPage, totalPages }
})
