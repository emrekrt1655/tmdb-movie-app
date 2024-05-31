import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { PopularMovie, MovieResponse } from '@/types/Movie'

export const useDetailedMovie = defineStore('detailedMovie', () => {
  const movie = ref<MovieResponse>()
  const similarMovies = ref<PopularMovie[]>([])
  const isLoading = ref(true)
  const loadError = ref(false)
  const movieImage = ref('')
  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
  const noImageUrl = import.meta.env.VITE_BASE_NO_IMAGE

  const fetchDetailedMovie = async (id: string | string[]) => {
    const url = `${import.meta.env.VITE_BASE_URL}/movie/${id}?language=en-US`
    const urlSimilar = `${import.meta.env.VITE_BASE_URL}/movie/${id}/similar?language=en-US&page=1`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }

    try {
      const [movieResponse, similarResponse] = await Promise.all([
        fetch(url, options),
        fetch(urlSimilar, options)
      ])

      if (!movieResponse.ok || !similarResponse.ok) {
        throw new Error('Failed to fetch movie data')
      }

      const [movieData, similarData] = await Promise.all([
        movieResponse.json(),
        similarResponse.json()
      ])

      movie.value = movieData
      similarMovies.value = similarData.results.slice(0, 2)
      console.log(!!movie.value?.backdrop_path, movie.value?.backdrop_path)
      movieImage.value = movie.value?.backdrop_path
        ? `${baseImgUrl}${movie.value.backdrop_path}`
        : `${noImageUrl}`

      isLoading.value = false
    } catch (error) {
      console.error('Error:', error)
      loadError.value = true
      isLoading.value = false
    }
  }

  return { movie, similarMovies, fetchDetailedMovie, movieImage }
})
