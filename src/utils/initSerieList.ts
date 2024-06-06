import type { Serie, SerieResponse } from '@/types/Serie'
import type { Ref } from 'vue'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
  }
}

const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
const noImageUrl = import.meta.env.VITE_BASE_NO_IMAGE

export const initSeriesList = async (
  series: Ref<Serie[]>,
  givenUrl: string,
  totalPages?: Ref<number>,
  currentPage?: Ref<number>
) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}${givenUrl}`
    const res = await fetch(url, options)
    const json: SerieResponse = await res.json()
    series.value = []
    json.results.map((serie) => {
      serie = {
        ...serie,
        backdrop_path: serie.backdrop_path
          ? `${baseImgUrl}${serie.backdrop_path}`
          : `${noImageUrl}`,
        poster_path: serie.poster_path ? `${baseImgUrl}${serie.poster_path}` : `${noImageUrl}`
      }
      series.value.push(serie)
    })

    if (totalPages) {
      totalPages.value = json.total_pages
    }
    if (currentPage) {
      currentPage.value = json.page
    }
  } catch (err) {
    console.error('error:' + err)
  }
}
