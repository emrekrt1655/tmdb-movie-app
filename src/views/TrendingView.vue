<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import router from '@/router';
import { useMovieTrendingStore } from '@/stores/movieTrending';
import { ref } from 'vue';
const trendingStore = useMovieTrendingStore()
const emit = defineEmits(['active-change', 'page-change']);
const active = ref('day')

const onActiveChange = (newValue: string) => {
    active.value = newValue
    trendingStore.initTrendingMovies(active.value)
    router.push({ query: { time: newValue } });
}
</script>

<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Trends</h1>
        <div class="ml-6 mb-6">
            <button @click="onActiveChange('day')" :class="{ 'bg-red-700 active': active === 'day' }"
                class="trend p-0.5 mr-3 border border-white">Today</button>
            <button @click="onActiveChange('week')" :class="{ 'bg-red-700 active': active === 'week' }"
                class="trend p-0.5 mr-3 border border-white">This Week</button>
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for=" (movie, index) in trendingStore.trendingMovies" :key="movie.id">
                <MovieCard :movie="movie" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>
        </div>
    </div>
</template>

