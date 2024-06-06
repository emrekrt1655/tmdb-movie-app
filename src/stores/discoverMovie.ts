import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Genre } from '../types/Genre'
import type { Movies, MoviesInfo } from '@/types/Movie'
import { initMovieList } from '@/utils/initMovieLists'
import { fetchGenres } from '@/utils/discoverUtils'
import { yearList } from '@/utils/discoverUtils'
import type { Serie } from '@/types/Serie'
import { initSeriesList } from '@/utils/initSerieList'

export const useDiscoverMovieStore = defineStore('discoverMovies', () => {
  const genres = ref<Genre[]>([])
  const movies = ref<Movies[]>([])
  const series = ref<Serie[]>([])
  const currentPage = ref(1)
  const totalPages = ref(0)
  const moviesInfoList = ref<MoviesInfo[]>([])

  const initGenres = async (type: string) => {
    try {
      fetchGenres(genres, `https://api.themoviedb.org/3/genre/${type}/list?language=en`)
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

  const discoverSeries = async (genreId: number, yearInput: number, page: number) => {
    const givenUrl =
      genreId === 0 && yearInput === 0
        ? `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
        : `discover/tv?first_air_date_year=${yearInput}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`
    try {
      await initSeriesList(series, givenUrl, totalPages, currentPage)
    } catch (err) {
      console.error('error:' + err)
    }
  }

  return {
    initGenres,
    discoverMovies,
    discoverSeries,
    genres,
    movies,
    series,
    moviesInfoList,
    currentPage,
    totalPages,
    yearList
  }
})
