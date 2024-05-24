<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useUpcomingMovieStore } from '@/stores/upcomingMovies';
import Pagination from '@/components/Pagination.vue'
const props = defineProps(['page'])
import router from '@/router';
import { watch } from 'vue';
const upcomingStore = useUpcomingMovieStore()

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    await upcomingStore.initUpcomingMovies(+newValue);
    router.push({ params: { page: +newValue } });
})


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
        <Pagination v-if="upcomingStore.upcomingMovies.length > 0" :totalPages="upcomingStore.totalPages"
            :currentPage="upcomingStore.currentPage" />
    </div>
</template>
