import type { Ref } from 'vue'

const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
  }
}

export const fetchGenres = async (genres: Ref, url: string) => {
  const res = await fetch(url, options)
  const json = await res.json()
  genres.value = json.genres
}
