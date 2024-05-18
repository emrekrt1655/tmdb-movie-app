import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from '../types/Genre'
import type { PopularMovie, PopularMovieResponse, PopularMoviesInfo } from '@/types/Movie'

export const useGenreStore = defineStore('genres', () => {
  const genres = ref<Genre[]>([])
  const movies = ref<PopularMovie[]>([])
  const moviesInfoList = ref<PopularMoviesInfo[]>([])

  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
  const gettingUrlwithGenreId = (genreId: number, page: number) => {
    const url =
      genreId === 0
        ? `${import.meta.env.VITE_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
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
    try {
      const url = gettingUrlwithGenreId(genreId, page)
      const res = await fetch(url, options)
      const json: PopularMovieResponse = await res.json()
      movies.value = json.results
      const transformedData = json.results.map((movie) => ({
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        id: movie.id
      }))
      moviesInfoList.value = transformedData
    } catch (error) {
      console.log('error: ', error)
    }
  }
  return { initGenres, genreMoviesList, genres, movies, moviesInfoList }
})
