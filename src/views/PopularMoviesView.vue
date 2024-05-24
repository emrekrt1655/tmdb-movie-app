<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Popular Movies</h1>
        <div class="ml-6 mb-6">
            <input v-model="filterText" placeholder="Search movies"
                class="text-black border border-gray-300 rounded-md  px-3 py-2">
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for="(movie, index) in filteredMovies" :key="movie.id">
                <MovieCard :movie="movie" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>
        </div>
        <Pagination v-if="popularStore.popularMovies.length > 0" :totalPages="popularStore.totalPages"
            :currentPage="popularStore.currentPage" />
    </div>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import Pagination from '@/components/Pagination.vue'
import router from '@/router';
import { useMoviePopularStore } from '@/stores/moviePopular';
import { ref, computed, watch } from 'vue';

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    await popularStore.initPopularMovies(+newValue)
    router.push({ params: { page: +newValue } });
})

const popularStore = useMoviePopularStore();
const filterText = ref('');
const filteredMovies = computed(() => {
    const filterLowerCase = filterText.value.toLowerCase();
    return popularStore.popularMovies.filter(movie => movie.title.toLowerCase().includes(filterLowerCase));
});
</script>
