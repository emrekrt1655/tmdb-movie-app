import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { DetailedSerie, Season } from '@/types/Serie'

export const useDetailedSerie = defineStore('detailedSerie', () => {
  const detailedSerie = ref<DetailedSerie>()
  const isLoading = ref(true)
  const loadError = ref(false)
  const serieImage = ref('')
  const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
  const noImageUrl = import.meta.env.VITE_BASE_NO_IMAGE

  const seasons = computed(() => detailedSerie.value?.seasons)

  const fetchDetailedSerie = async (id: string | string[]) => {
    const url = `${import.meta.env.VITE_BASE_URL}/tv/${id}?language=en-US`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }

    try {
      const res = await fetch(url, options)

      const json: DetailedSerie = await res.json()
      detailedSerie.value = json

      serieImage.value = detailedSerie.value?.backdrop_path
        ? `${baseImgUrl}${detailedSerie.value.backdrop_path}`
        : `${noImageUrl}`

      isLoading.value = false
    } catch (error) {
      console.error('Error:', error)
      loadError.value = true
      isLoading.value = false
    }
  }

  return { detailedSerie, fetchDetailedSerie, serieImage, seasons }
})
