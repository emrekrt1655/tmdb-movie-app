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
  await movieTrendingStore.initTrendingMovies(active.value)
  await movieUpcomingStore.initUpcomingMovies()
})

import { ref } from 'vue'

const active = ref('day')

const onActiveChange = (value: string) => {
  active.value = value
  movieTrendingStore.initTrendingMovies(value)
}

</script>
<template>
  <Navbar />

  <div class="">

    <RouterView :active="active" @active-change="onActiveChange" />

  </div>
</template>