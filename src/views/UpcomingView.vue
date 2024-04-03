<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useUpcomingMovieStore } from '@/stores/upcomingMovies';

const upcomingStore = useUpcomingMovieStore()

const minimumDate = upcomingStore.upcomingMoviesDate?.minimum
const maximumDate = upcomingStore.upcomingMoviesDate?.maximum

const formattedMinimumDate = minimumDate && new Date(minimumDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formattedMaximumDate = maximumDate && new Date(maximumDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
</script>

<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Upcoming Movies</h1>
        <div class="ml-6 mb-6">
            <p class="text-red-600">From <strong>{{ formattedMinimumDate }}</strong> to <strong>{{ formattedMaximumDate
            }}</strong></p>
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for=" (movie, index) in upcomingStore.upcomingMovies">
                <MovieCard :movie="movie" :key="movie.id" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>

        </div>
    </div>
</template>
