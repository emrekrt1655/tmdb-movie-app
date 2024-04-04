<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'

import { useMoviePopularStore } from '@/stores/moviePopular';
import { useMovieTrendingStore } from '@/stores/movieTrending';
import { onMounted } from 'vue';
import { useUpcomingMovieStore } from './stores/upcomingMovies';

const moviePopularStore = useMoviePopularStore()
const movieTrendingStore = useMovieTrendingStore()
const movieUpcomingStore = useUpcomingMovieStore()

onMounted(async () => {
  await moviePopularStore.initPopularMovies()
  await movieTrendingStore.initTrendingMovies(active.value, page.value)
  await movieUpcomingStore.initUpcomingMovies()
})

import { ref } from 'vue'

const active = ref('day')
const page = ref(1)

const onActiveorPageChange = (newValue: string, newPage: number) => {
  active.value = newValue
  page.value = newPage
  movieTrendingStore.initTrendingMovies(newValue, newPage)
}

</script>
<template>
  <Navbar />

  <div class="">

    <RouterView :active="active" :page="page" @active-change="onActiveorPageChange" @page-change="onActiveorPageChange" />

  </div>
</template>