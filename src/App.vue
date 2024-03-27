<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'

import { useMoviePopularStore } from '@/stores/moviePopular';
import { useMovieTrendingStore } from '@/stores/movieTrending';
import { onMounted } from 'vue';

const moviePopularStore = useMoviePopularStore()
const movieTrendingStore = useMovieTrendingStore()

onMounted(async () => {
  await moviePopularStore.initPopularMovies()
  await movieTrendingStore.initTrendingMovies()
})

</script>
<template>
  <Navbar />

  <div class="">

    <RouterView />

  </div>
</template>