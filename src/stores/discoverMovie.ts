import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from '../types/Genre'
import type { Movies, MoviesInfo } from '@/types/Movie'
import { initMovieList } from '@/utils/initMovieLists'
import { fetchGenres } from '@/utils/discoverUtils'
import { yearList } from '@/utils/discoverUtils'

export const useDiscoverMovieStore = defineStore('discoverMovies', () => {
  const genres = ref<Genre[]>([])
  const movies = ref<Movies[]>([])
  const yearsList = ref<number[]>(yearList)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const moviesInfoList = ref<MoviesInfo[]>([])

  const initGenres = async () => {
    try {
      fetchGenres(genres, 'https://api.themoviedb.org/3/genre/movie/list?language=en')
    } catch (err) {
      console.error('error:' + err)
    }
  }

  const discoverMovies = async (genreId: number, yearInput: number, page: number) => {
    const givenUrl =
      genreId === 0 && yearInput === 0
        ? `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
        : `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${yearInput}&sort_by=popularity.desc&with_genres=${genreId}`
    try {
      await initMovieList(movies, givenUrl, moviesInfoList, totalPages, currentPage)
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return {
    initGenres,
    discoverMovies,
    genres,
    movies,
    moviesInfoList,
    currentPage,
    totalPages,
    yearList
  }
})