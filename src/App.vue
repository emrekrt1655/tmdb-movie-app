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
  await movieTrendingStore.initTrendingMovies()
  await movieUpcomingStore.initUpcomingMovies()
})

</script>
<template>
  <Navbar />

  <div class="">

    <RouterView />

  </div>
</template>