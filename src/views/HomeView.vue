<script setup lang="ts">
import Search from '@/components/Search.vue'
import MovieList from '@/components/MovieList.vue'
const props = defineProps(['page'])
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
    <MovieList title="Popular Movies" :trending-list="popularMovieStore?.fiveElementsOfList" link="popular"
        :page="props.page" />
    <MovieList title="Upcoming Movies" :trending-list="upcomingMoviesStore?.fiveElementsOfList" link="upcoming"
        :page="props.page" />
</template>
