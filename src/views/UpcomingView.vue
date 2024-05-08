<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useUpcomingMovieStore } from '@/stores/upcomingMovies';
import { useRoute } from 'vue-router';
const upcomingStore = useUpcomingMovieStore()
const emit = defineEmits(['page-change']);
const props = defineProps(['page'])
const route = useRoute()
const setPage = (value: number) => {
    emit('page-change', value)
}
</script>

<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Upcoming Movies</h1>
        <div class="ml-6 mb-6">
            <p class="text-red-600">From
                <strong class="date1">{{ upcomingStore.upcomingMoviesDate?.minimum && new
                    Date(upcomingStore.upcomingMoviesDate?.minimum).toLocaleDateString('en-US', {
                        weekday: 'long', year:
                            'numeric', month: 'long', day: 'numeric'
                    }) }}</strong> to
                <strong class="date">{{ upcomingStore.upcomingMoviesDate?.maximum && new
                    Date(upcomingStore.upcomingMoviesDate?.maximum).toLocaleDateString('en-US', {
                        weekday: 'long', year:
                            'numeric', month: 'long', day: 'numeric'
                    }) }}</strong>
            </p>
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for=" (movie, index) in upcomingStore.upcomingMovies">
                <MovieCard :movie="movie" :key="movie.id" :index="index + 1" :isName="true" class="mb-3" />
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
