<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { ref } from 'vue'
import { useMovieTrendingStore } from '@/stores/movieTrending';

const trendingStore = useMovieTrendingStore()

const active = ref('today')
</script>

<template>
    <div class="w-full h-full mt-6 text-white">
        <h1 class="ml-6 mb-6 text-3xl">Trends</h1>
        <div class="ml-6 mb-6">
            <button @click="active = 'today'" :class="{ 'bg-red-700': active === 'today' }"
                class="p-0.5 mr-3 border border-white">Today</button>
            <button @click="active = 'week'" :class="{ 'bg-red-700': active === 'week' }"
                class="p-0.5 mr-3 border border-white">This Week</button>
        </div>
        <div class="ml-6">
            <div class="mb-3 w-1/3" v-for=" (movie, index) in trendingStore.trendingMovies">
                <MovieCard :movie="movie" :key="movie.id" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>

        </div>
    </div>
</template>
