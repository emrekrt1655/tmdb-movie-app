<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import { useMoviePopularStore } from '@/stores/moviePopular';
import { useMovieTrendingStore } from '@/stores/movieTrending';
import { onMounted } from 'vue';
import { useUpcomingMovieStore } from './stores/upcomingMovies';

const moviePopularStore = useMoviePopularStore()
const movieTrendingStore = useMovieTrendingStore()
const movieUpcomingStore = useUpcomingMovieStore()
const page = ref(1)

onMounted(async () => {
  await moviePopularStore.initPopularMovies(page.value)
  await movieTrendingStore.initTrendingMovies('day')
  await movieUpcomingStore.initUpcomingMovies(page.value)
})

</script>
<template>
  <Navbar :page="page" />
  <div>
    <RouterView active="day" :page="page" />
  </div>
</template>