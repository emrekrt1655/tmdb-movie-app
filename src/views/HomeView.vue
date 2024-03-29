<script setup lang="ts">
import Search from '@/components/Search.vue'
import MovieList from '@/components/MovieList.vue'

import { useMovieTrendingStore } from '@/stores/movieTrending';
import { useUpcomingMovieStore } from '@/stores/upcomingMovies';
import { useMoviePopularStore } from '@/stores/moviePopular';
const trendingStore = useMovieTrendingStore()
const upcomingMoviesStore = useUpcomingMovieStore()
const popularMovieStore = useMoviePopularStore()
</script>

<template>
    <Search />
    <MovieList title="Trends in today" :trending="true" :trending-list="trendingStore?.fiveElementsOfList"
        link="trending" />
    <MovieList title="Popular Movies" :trending-list="popularMovieStore?.fiveElementsOfList" link="trending" />
    <MovieList title="Upcoming Movies" :trending-list="upcomingMoviesStore?.fiveElementsOfList" link="trending" />
</template>
