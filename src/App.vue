<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'

import { useMoviePopularStore } from '@/stores/moviePopular';
import { useMovieTrendingStore } from '@/stores/movieTrending';
import { onMounted, watch } from 'vue';
import { useUpcomingMovieStore } from './stores/upcomingMovies';
import { useRouter } from 'vue-router';

const router = useRouter();

const moviePopularStore = useMoviePopularStore()
const movieTrendingStore = useMovieTrendingStore()
const movieUpcomingStore = useUpcomingMovieStore()

onMounted(async () => {
  await moviePopularStore.initPopularMovies(page.value)
  await movieTrendingStore.initTrendingMovies(active.value)
  await movieUpcomingStore.initUpcomingMovies(page.value)
})

import { ref } from 'vue'

const active = ref('day')
const page = ref(1)

const onActiveChange = (newValue: string) => {
  active.value = newValue
  movieTrendingStore.initTrendingMovies(newValue)
  router.push({ query: { time: newValue } });
}

const onPageChange = (newPage: number) => {
  page.value = newPage
  movieTrendingStore.initTrendingMovies(active.value)
  moviePopularStore.initPopularMovies(page.value)
  movieUpcomingStore.initUpcomingMovies(page.value)
  router.push({ params: { page: newPage } });
}

watch(() => router.currentRoute.value.params.page, (newValue) => {
  page.value = +newValue || 1
  onPageChange(page.value)
});

</script>
<template>
  <Navbar :page="page" />

  <div class="">

    <RouterView :active="active" :page="page" @active-change="onActiveChange" @page-change="onPageChange" />

  </div>
</template>