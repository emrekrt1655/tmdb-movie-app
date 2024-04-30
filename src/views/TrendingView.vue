<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { ref, defineEmits } from 'vue'
import { useMovieTrendingStore } from '@/stores/movieTrending';

const trendingStore = useMovieTrendingStore()
const emit = defineEmits(['active-change', 'page-change']);
const props = defineProps(['active', 'page'])


const setActive = (value: string) => {
    emit('active-change', value)
}
const setPage = (value: number) => {
    emit('page-change', value)
}

console.log(props.page)
</script>

<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Trends</h1>
        <div class="ml-6 mb-6">
            <button @click="setActive('day')" :class="{ 'bg-red-700 active': props.active === 'day' }"
                class="trend p-0.5 mr-3 border border-white">Today</button>
            <button @click="setActive('week')" :class="{ 'bg-red-700 active': props.active === 'week' }"
                class="trend p-0.5 mr-3 border border-white">This Week</button>
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for=" (movie, index) in trendingStore.trendingMovies" :key="movie.id">
                <MovieCard :movie="movie" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>
        </div>
        <div class="flex justify-center mt-6 w-3/5">
            <button @click="setPage(props.page - 1)" :disabled="props.page === 1"
                class="px-3 py-1 text-white mr-2">Before</button>
            <button v-for="pageNumber in 5" :key="pageNumber" @click="setPage(pageNumber)"
                :class="{ 'bg-red-700': pageNumber === props.page }" class="px-3 py-1 text-white mr-2">{{
                    pageNumber }}</button>
            <button @click="setPage(props.page + 1)" :disabled="props.page === 5"
                class="px-3 py-1  text-white mr-2">Next</button>
        </div>
    </div>
</template>

