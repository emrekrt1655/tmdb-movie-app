<script setup lang="ts">
import Search from '@/components/Search.vue'
import MovieList from '@/components/MovieList.vue'

import { useMovieTrendingStore } from '@/stores/movieTrending';
import { useUpcomingMovieStore } from '@/stores/upcomingMovies';
const trendingStore = useMovieTrendingStore()
const upcomingMoviesStore = useUpcomingMovieStore()
</script>

<template>
    <Search />
    <MovieList title="Trends in today" :trending="true" :trending-list="trendingStore.fiveElementsOfList" />
    <MovieList title="Upcoming Movies" :trending-list="upcomingMoviesStore.fiveElementsOfList" />
</template>
