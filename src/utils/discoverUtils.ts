import type { Ref } from 'vue'

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

function generateYearList(startYear: number, numberOfYears: number): number[] {
  const years: number[] = []
  for (let i = 0; i < numberOfYears; i++) {
    years.push(startYear - i)
  }
  return years
}

const currentYear: number = new Date().getFullYear()

const numberOfYears: number = 10

export const yearList: number[] = generateYearList(currentYear, numberOfYears)
