<template>
    <div class="w-full h-full mt-6 container mx-auto w-4/5">
        <h1 class="text-white text-3xl mb-6">Movies</h1>
        <div class="ml-6 mb-6">
            <select v-model="selectedGenre" class="text-black border border-gray-300 rounded-md px-3 py-2 w-1/5 mr-6">
                <option :value="0">All Genres</option>
                <option v-for="genre in genreStore.genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
            </select>
            <input v-model="searchInput" @input="searchMovie" placeholder="Search movies"
                class="text-black border border-gray-300 rounded-md w-1/5  px-3 py-2">
        </div>
        <div class="ml-6 w-full flex flex-row flex-wrap">
            <div class="mb-3 w-1/5"
                v-for="(movie, index) in searchInput.trim() ? searchMovieStore.searchMovies : genreStore.movies"
                :key="movie.id">
                <MovieCard :isMovies="true" :movie="movie" :index="index + 1" class="mb-3" />
            </div>
        </div>
        <Pagination :currentPage="genreStore.currentPage" :totalPages="genreStore.totalPages" />
    </div>
</template>
  
<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useGenreStore } from '@/stores/genres';
import { useSearchMovieStore } from '@/stores/search';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const genreStore = useGenreStore();
const searchMovieStore = useSearchMovieStore();
const selectedGenre = ref<number>(0)
const genrePage = ref<number>(1)
const pageSearch = ref<number>(1)
const searchInput = ref('')
const searchMovie = () => {
    searchMovieStore.initSearchMovies(searchInput.value, pageSearch.value)
};

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    genrePage.value = +newValue || 1
    await genreStore.genreMoviesList(selectedGenre.value, genrePage.value);
    router.push({ params: { page: genrePage.value } });
});

onMounted(async () => {
    await genreStore.initGenres();
    await genreStore.genreMoviesList(selectedGenre.value, genrePage.value)

});
watch(selectedGenre, async (newValue) => {
    selectedGenre.value = newValue
    await genreStore.genreMoviesList(selectedGenre.value, genrePage.value);
});
</script>
  