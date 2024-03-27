<script setup lang="ts">
import Search from '@/components/Search.vue'
import MovieList from '@/components/MovieList.vue'

import { useMovieTrendingStore } from '@/stores/movieTrending';
const trendingStore = useMovieTrendingStore()
</script>

<template>
    <Search />
    <MovieList title="Trends in today" :trending-list="trendingStore.fiveElementsOfList" />
</template>
